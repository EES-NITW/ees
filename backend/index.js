require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { pool } = require("./routes/db.js");
const verifyToken = require("./routes/verifyToken.js");

require("./routes/auth.js"); // load strategy

const admin_router = require("./routes/admin");
const events_router = require("./routes/events");

const app = express();
app.use(express.json());

// allow cookies from frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/v1/admin", admin_router);
app.use("/api/v1/events", events_router);

//  auth paths 
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/placements", session: false }),
  (req, res) => {
    const user = req.user;

    // Create JWT
    const token = jwt.sign(
      { id: user.google_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true later while deploying **
      sameSite: "lax"
    });

    return res.redirect("http://localhost:5173/placements/dashboard");
  }
);


app.get("/api/v1/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/api/v1/companies", verifyToken, async (req, res) => {
  const result = await pool.query("SELECT * FROM companies");
  res.json(result.rows);
});

app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
