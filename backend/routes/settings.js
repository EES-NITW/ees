require("dotenv").config();
const express = require("express");
const settings_router = express.Router();

const { pool } = require("./db");
const verifyToken = require("./verifyToken");
const verifyAdmin = require("./verifyAdmin");

const ADMIN_SETTINGS_PASSWORD = process.env.ADMIN_SETTINGS_PASSWORD;

// helper: insert log
async function addLog(action) {
  try {
    await pool.query("INSERT INTO logs (action) VALUES ($1)", [action]);
  } catch (e) {
    console.error("Log insert error (settings):", e);
  }
}

//  GET CURRENT ADMINS 
// GET /api/v1/settings/admins
settings_router.get("/admins", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE role = 'admin' ORDER BY name"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get admins error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  MAKE ADMIN 
// POST /api/v1/settings/make-admin
// body: { password, email }
settings_router.post("/make-admin", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ error: "Password and email are required" });
    }

    if (password !== ADMIN_SETTINGS_PASSWORD) {
      return res.status(401).json({ error: "Action denied: Incorrect password" });
    }

    const userRes = await pool.query(
      "SELECT id, email, role, name FROM users WHERE email = $1",
      [email]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const user = userRes.rows[0];

    if (user.role === "admin") {
      return res.status(400).json({ error: "User is already an admin" });
    }

    await pool.query("UPDATE users SET role = 'admin' WHERE id = $1", [
      user.id,
    ]);

    await addLog(`Made admin: ${user.email}`);

    return res.json({ message: `${user.email} is now an admin` });
  } catch (err) {
    console.error("Make admin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  REMOVE ADMIN 
// POST /api/v1/settings/remove-admin
// body: { password, email }
settings_router.post("/remove-admin", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ error: "Password and email are required" });
    }

    if (password !== ADMIN_SETTINGS_PASSWORD) {
      return res.status(401).json({ error: "Action denied: Incorrect password" });
    }

    // get all admins
    const adminsRes = await pool.query(
      "SELECT id, email, name FROM users WHERE role = 'admin'"
    );
    const admins = adminsRes.rows;

    if (admins.length === 0) {
      return res.status(400).json({ error: "No admins found in system" });
    }

    const target = admins.find((a) => a.email === email);

    if (!target) {
      return res.status(404).json({ error: "Admin user not found" });
    }

    if (admins.length === 1 && admins[0].email === email) {
      return res
        .status(400)
        .json({ error: "Cannot remove the last admin" });
    }

    await pool.query("UPDATE users SET role = 'student' WHERE id = $1", [
      target.id,
    ]);

    await addLog(`Removed admin: ${target.email}`);

    return res.json({ message: `${target.email} is no longer an admin` });
  } catch (err) {
    console.error("Remove admin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = settings_router;
