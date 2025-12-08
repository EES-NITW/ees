const express = require('express');

const admin_router = express.Router();
const { pool } = require("./db");
const verifyToken = require("./verifyToken");
const verifyAdmin = require("./verifyAdmin");

admin_router.get("/dashboard", verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Total members
    const membersResult = await pool.query(
      "SELECT COUNT(*)::int AS total_members FROM members"
    );

    // Events this year
    const eventsResult = await pool.query(
      `SELECT COUNT(*)::int AS events_this_year 
       FROM events 
       WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)`
    );

    // Total companies
    const companiesResult = await pool.query(
      "SELECT COUNT(*)::int AS total_companies FROM companies"
    );

    // Total students
    const studentsResult = await pool.query(
      "SELECT COUNT(*)::int AS total_students FROM students"
    );

    // Last 10 logs
    const logsResult = await pool.query(
      `SELECT action, created_at 
       FROM logs 
       ORDER BY created_at DESC 
       LIMIT 10`
    );

    res.json({
      totalMembers: membersResult.rows[0].total_members,
      eventsThisYear: eventsResult.rows[0].events_this_year,
      totalCompanies: companiesResult.rows[0].total_companies,
      totalStudents: studentsResult.rows[0].total_students,
      logs: logsResult.rows,
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = admin_router; 