require("dotenv").config();
const express = require("express");
const placements_router = express.Router();

const { pool } = require("./db");
const verifyToken = require("./verifyToken");
const verifyAdmin = require("./verifyAdmin");

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// helper: insert log
async function addLog(action) {
  try {
    await pool.query("INSERT INTO logs (action) VALUES ($1)", [action]);
  } catch (e) {
    console.error("Log insert error (placements):", e);
  }
}

//  HELPERS 
function getPublicIdFromUrl(url, folder) {
  if (!url) return null;
  try {
    const parts = url.split("/");
    const file = parts[parts.length - 1]; // e.g. logo.png
    const nameWithoutExt = file.split(".")[0];
    return `${folder}/${nameWithoutExt}`;
  } catch {
    return null;
  }
}

//  GET COMPANIES LIST 
// GET /api/v1/placements/companies
placements_router.get("/companies", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, img_url FROM companies ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get companies error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  GET STUDENTS LIST 
// GET /api/v1/placements/students
placements_router.get("/students", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, roll_no, linkedin FROM students ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get students error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ADD COMPANY 
// POST /api/v1/placements/companies/add
// body: name, file: logo
placements_router.post(
  "/companies/add",
  verifyToken,
  verifyAdmin,
  upload.single("logo"),
  async (req, res) => {
    try {
      const { name } = req.body;
      const file = req.file;

      if (!name || !file) {
        return res
          .status(400)
          .json({ error: "Company name and logo image are required" });
      }

      // check if company already exists
      const exists = await pool.query(
        "SELECT id FROM companies WHERE name = $1",
        [name]
      );
      if (exists.rows.length > 0) {
        return res.status(400).json({ error: "Company already exists" });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "companies" },
        async (err, result) => {
          if (err) {
            console.error("Cloudinary company logo upload error:", err);
            return res.status(500).json({ error: "Logo upload failed" });
          }

          const imgUrl = result.secure_url;

          await pool.query(
            "INSERT INTO companies (name, img_url) VALUES ($1, $2)",
            [name, imgUrl]
          );

          await addLog(`Added company: ${name}`);

          return res.json({ message: "Company added" });
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    } catch (err) {
      console.error("Add company error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//  REMOVE COMPANY 
// DELETE /api/v1/placements/companies/remove
// body: { company_id }
placements_router.delete(
  "/companies/remove",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { company_id } = req.body;

      if (!company_id) {
        return res.status(400).json({ error: "Company id is required" });
      }

      const compRes = await pool.query(
        "SELECT id, name, img_url FROM companies WHERE id = $1",
        [company_id]
      );

      if (compRes.rows.length === 0) {
        return res.status(404).json({ error: "Company not found" });
      }

      const company = compRes.rows[0];

      // delete logo from cloudinary
      const publicId = getPublicIdFromUrl(company.img_url, "companies");
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.error("Company logo delete error:", e);
        }
      }

      // delete from DB (offers will cascade delete)
      await pool.query("DELETE FROM companies WHERE id = $1", [company.id]);

      await addLog(`Removed company: ${company.name}`);

      return res.json({ message: "Company removed" });
    } catch (err) {
      console.error("Remove company error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//  ADD STUDENT 
// POST /api/v1/placements/students/add
// body: { roll_no, name, linkedin }
placements_router.post(
  "/students/add",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { roll_no, name, linkedin } = req.body;

      if (!roll_no || !name) {
        return res
          .status(400)
          .json({ error: "Roll number and name are required" });
      }

      // check duplicate roll_no
      const exists = await pool.query(
        "SELECT id FROM students WHERE roll_no = $1",
        [roll_no]
      );
      if (exists.rows.length > 0) {
        return res.status(400).json({ error: "Student with this roll no already exists" });
      }

      await pool.query(
        "INSERT INTO students (roll_no, name, linkedin) VALUES ($1, $2, $3)",
        [roll_no, name, linkedin || null]
      );

      await addLog(`Added student: ${name} (${roll_no})`);

      return res.json({ message: "Student added" });
    } catch (err) {
      console.error("Add student error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//  REMOVE STUDENT 
// DELETE /api/v1/placements/students/remove
// body: { student_id }
placements_router.delete(
  "/students/remove",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { student_id } = req.body;

      if (!student_id) {
        return res.status(400).json({ error: "Student id is required" });
      }

      const stuRes = await pool.query(
        "SELECT id, name, roll_no FROM students WHERE id = $1",
        [student_id]
      );

      if (stuRes.rows.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      const student = stuRes.rows[0];

      await pool.query("DELETE FROM students WHERE id = $1", [student.id]);

      await addLog(`Removed student: ${student.name} (${student.roll_no})`);

      return res.json({ message: "Student removed" });
    } catch (err) {
      console.error("Remove student error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//  ADD OFFER 
// POST /api/v1/placements/offers/add
// body: { company_id, student_id, type, role, offer_date, experience }
placements_router.post("/offers/add", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { company_id, student_id, type, role, offer_date, experience } =
      req.body;

    if (!company_id || !student_id || !type || !role || !offer_date) {
      return res.status(400).json({
        error: "Company, student, type, role and offer date are required",
      });
    }

    if (type !== "Internship" && type !== "Placement") {
      return res.status(400).json({ error: "Invalid offer type" });
    }

    // verify company & student exist
    const comp = await pool.query("SELECT name FROM companies WHERE id = $1", [
      company_id,
    ]);
    if (comp.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    const stu = await pool.query(
      "SELECT name, roll_no FROM students WHERE id = $1",
      [student_id]
    );
    if (stu.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    try {
      await pool.query(
        `INSERT INTO offers (company_id, student_id, type, role, offer_date, experience)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          company_id,
          student_id,
          type,
          role,
          offer_date,
          experience || null,
        ]
      );
    } catch (e) {
      // handle unique constraint
      console.error("Offer insert error:", e);
      return res
        .status(400)
        .json({ error: "This offer already exists for this student & company & role & type" });
    }

    await addLog(
      `Added ${type} offer: ${stu.rows[0].roll_no} at ${comp.rows[0].name}`
    );

    return res.json({ message: "Offer added" });
  } catch (err) {
    console.error("Add offer error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  REMOVE OFFER 
// DELETE /api/v1/placements/offers/remove
// body: { company_id, student_id }
placements_router.delete(
  "/offers/remove",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { company_id, student_id } = req.body;

      if (!company_id || !student_id) {
        return res
          .status(400)
          .json({ error: "Company and student are required" });
      }

      const offerRes = await pool.query(
        "SELECT id FROM offers WHERE company_id = $1 AND student_id = $2",
        [company_id, student_id]
      );

      if (offerRes.rows.length === 0) {
        return res.status(404).json({
          error: "No offer exists for this student in this company",
        });
      }

      await pool.query(
        "DELETE FROM offers WHERE company_id = $1 AND student_id = $2",
        [company_id, student_id]
      );

      await addLog(
        `Removed offers between company_id=${company_id} and student_id=${student_id}`
      );

      return res.json({ message: "Offer removed" });
    } catch (err) {
      console.error("Remove offer error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = placements_router;