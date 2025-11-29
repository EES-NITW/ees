require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { pool } = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const allowed = process.env.ALLOWED_DOMAIN;

        // Reject if email domain doesn't match
        if (!email.endsWith(`@${allowed}`)) {
          return done(null, false, { message: "Use college email only" });
        }

        // Check if user exists
        let result = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        // If new user → insert
        if (result.rows.length === 0) {
          result = await pool.query(
            "INSERT INTO users (google_id, email, name) VALUES ($1,$2,$3) RETURNING *",
            [profile.id, email, profile.displayName]
          );
        }

        return done(null, result.rows[0]);
      } catch (err) {
        console.error("Auth Error:", err);
        done(err, null);
      }
    }
  )
);

module.exports = passport;
