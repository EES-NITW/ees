const express = require("express");
const router = express.Router();
const { pool } = require("./db");
const verifyToken = require("./verifyToken");

// GET all events with photos
router.get("/", verifyToken, async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT id, title, description, date::text AS date, venue, poster_url
      FROM events
      ORDER BY date DESC
    `);

    const photos = await pool.query(`
      SELECT event_id, img_url FROM event_photos
    `);

    // map photos to events
    const photoMap = {};
    photos.rows.forEach((p) => {
      if (!photoMap[p.event_id]) photoMap[p.event_id] = [];
      photoMap[p.event_id].push(p.img_url);
    });

    const result = events.rows.map((e) => ({
      ...e,
      photos: photoMap[e.id] || [],
    }));

    res.json(result);
  } catch (err) {
    console.error("Events fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;