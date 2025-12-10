require("dotenv").config();
const express = require("express");
const events_router = express.Router();

const { pool } = require("./db");
const verifyToken = require("./verifyToken");
const verifyAdmin = require("./verifyAdmin");

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// helper for logs
async function addLog(action) {
  try {
    await pool.query("INSERT INTO logs (action) VALUES ($1)", [action]);
  } catch (e) {
    console.error("Log insert error:", e);
  }
}

// underscore folder naming 
function eventTitleToFolder(title) {
  return title
    .trim()
    .replace(/\s+/g, "_")        // spaces to  _
    .replace(/[^a-zA-Z0-9_]/g, "") // remove weird chars
    .replace(/_+/g, "_");
}

//  PUBLIC: GET ALL EVENTS 
events_router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, date, venue, poster_url
       FROM events
       ORDER BY date DESC`
    );
    res.json({ 
      events: result.rows
    });
  } catch (err) {
    console.error("Get Events Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ADMIN: ADD NEW EVENT 
// expects: title, description, date, venue, poster(file)
// route: POST /api/v1/events/add
events_router.post(
  "/add",
  verifyToken,
  verifyAdmin,
  upload.single("poster"),
  async (req, res) => {
    try {
      const { title, description, date, venue } = req.body;
      const file = req.file;

      if (!title || !description || !date || !venue || !file) {
        return res.status(400).json({
          error: "Title, description, date, venue and poster image are required",
        });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "events/posters" },
        async (err, result) => {
          if (err) {
            console.error("Cloudinary Poster Upload Error:", err);
            return res.status(500).json({ error: "Poster upload failed" });
          }

          const posterUrl = result.secure_url;

          await pool.query(
            `INSERT INTO events (title, description, date, venue, poster_url)
             VALUES ($1, $2, $3, $4, $5)`,
            [title, description, date, venue, posterUrl]
          );

          await addLog(`Added event: ${title}`);

          return res.json({ message: "Event added successfully" });
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    } catch (err) {
      console.error("Add Event Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//  ADMIN: ADD PHOTOS TO EVENT 
// expects: title (string), photos[] (files)
// route: POST /api/v1/events/add-photos
events_router.post(
  "/add-photos",
  verifyToken,
  verifyAdmin,
  upload.array("photos"),
  async (req, res) => {
    try {
      const { title } = req.body;
      const files = req.files || [];

      if (!title || files.length === 0) {
        return res
          .status(400)
          .json({ error: "Event title and at least one photo are required" });
      }

      // find event by title
      const evRes = await pool.query(
        "SELECT id FROM events WHERE LOWER(title) = LOWER($1)",
        [title]
      );

      if (evRes.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Event with this title does not exist" });
      }

      const eventId = evRes.rows[0].id;
      const folderName = eventTitleToFolder(title);

      // helper to upload one file
      const uploadOne = (file) =>
        new Promise((resolve, reject) => {
          const up = cloudinary.uploader.upload_stream(
            { folder: `events/gallery/${folderName}` },
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(up);
        });

      const urls = [];
      for (const file of files) {
        const url = await uploadOne(file);
        urls.push(url);
      }

      // insert into event_photos
      for (const url of urls) {
        await pool.query(
          "INSERT INTO event_photos (event_id, img_url) VALUES ($1, $2)",
          [eventId, url]
        );
      }

      await addLog(`Added ${urls.length} photos to event: ${title}`);

      return res.json({
        message: `Added ${urls.length} photos successfully`,
      });
    } catch (err) {
      console.error("Add Photos Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//  ADMIN: DELETE EVENT 
// expects: title (string) in body
// route: DELETE /api/v1/events/delete
events_router.delete("/delete", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Event title is required" });
    }

    // find event
    const evRes = await pool.query(
      "SELECT id, poster_url FROM events WHERE LOWER(title) = LOWER($1)",
      [title]
    );

    if (evRes.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Event with this title does not exist" });
    }

    const event = evRes.rows[0];

    // delete poster from cloudinary (if exists)
    if (event.poster_url) {
      try {
        const parts = event.poster_url.split("/");
        const file = parts[parts.length - 1]; // name.ext
        const public_id = "events/posters/" + file.split(".")[0];
        await cloudinary.uploader.destroy(public_id);
      } catch (e) {
        console.error("Poster delete error:", e);
      }
    }

    // delete gallery photos from cloudinary
    const photosRes = await pool.query(
      "SELECT img_url FROM event_photos WHERE event_id = $1",
      [event.id]
    );

    for (const row of photosRes.rows) {
      if (!row.img_url) continue;
      try {
        const parts = row.img_url.split("/");
        const file = parts[parts.length - 1];
        // folder events/gallery/<folder> already in url, so just strip extension
        const beforeFile = row.img_url.substring(
          0,
          row.img_url.lastIndexOf("/")
        );
        const folderPath = beforeFile
          .split("/events/")[1]
          .replace(/\.[^/.]+$/, "");
        // but easier , assume standard: events/gallery/Folder/name.ext
        const public_id =
          "events/gallery/" +
          file.split(".")[0]; // this might not include folder; safer to ignore folder in destroy
        await cloudinary.uploader.destroy(public_id);
      } catch (e) {
        console.error("Photo delete error:", e);
      }
    }

    // delete event (will cascade delete event_photos rows)
    await pool.query("DELETE FROM events WHERE id = $1", [event.id]);

    await addLog(`Deleted event: ${title}`);

    return res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete Event Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = events_router;
