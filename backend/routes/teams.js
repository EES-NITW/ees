require("dotenv").config();
const express = require("express");
const teams_router = express.Router();

const { pool } = require("./db");              // adjust if your db.js path differs
const verifyToken = require("./verifyToken");
const verifyAdmin = require("./verifyAdmin");

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Multer: store file in memory
const upload = multer({ storage: multer.memoryStorage() });


// helper: insert log
async function addLog(action) {
    try {
        await pool.query("INSERT INTO logs (action) VALUES ($1)", [action]);
    } catch (e) {
        console.error("Log insert error:", e);
    }
}

//  ADD MEMBER 
teams_router.post(
    "/add",
    verifyToken,
    verifyAdmin,
    upload.single("image"),
    async (req, res) => {
        try {
            const { name, roll_no, linkedin, team } = req.body;

            if (!name || !roll_no || !team || !req.file) {
                return res
                    .status(400)
                    .json({ error: "Name, roll no, team and image are required" });
            }

            // upload image to cloudinary (members folder)
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "members" },
                async (err, result) => {
                    if (err) {
                        console.error("Cloudinary Upload Error:", err);
                        return res.status(500).json({ error: "Image upload failed" });
                    }

                    const imgUrl = result.secure_url;

                    await pool.query(
                        `INSERT INTO members (name, roll_no, linkedin, team, img_url)
             VALUES ($1, $2, $3, $4, $5)`,
                        [name, roll_no, linkedin || null, team, imgUrl]
                    );

                    await addLog(`Added new member: ${name} (${roll_no})`);

                    return res.json({ message: "Member added successfully" });
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        } catch (err) {
            console.error("Add Member Error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
);

//  DELETE MEMBER 
teams_router.delete("/delete", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { name, roll_no } = req.body;

        if (!name || !roll_no) {
            return res.status(400).json({ error: "Name and roll no are required" });
        }

        const memberRes = await pool.query(
            `SELECT * FROM members 
       WHERE LOWER(name) = LOWER($1) AND roll_no = $2`,
            [name, roll_no]
        );

        if (memberRes.rows.length === 0) {
            return res.status(404).json({ error: "Member does not exist" });
        }

        const member = memberRes.rows[0];

        // delete image from cloudinary (if exists)
        if (member.img_url) {
            const parts = member.img_url.split("/");
            const file = parts[parts.length - 1];          // something.jpg
            const public_id = "members/" + file.split(".")[0];

            try {
                await cloudinary.uploader.destroy(public_id);
            } catch (e) {
                console.error("Cloudinary delete error:", e);
                // don't block DB delete on this, continue
            }
        }

        await pool.query(`DELETE FROM members WHERE id = $1`, [member.id]);
        await addLog(`Deleted member: ${member.name} (${member.roll_no})`);

        return res.json({ message: "Member deleted successfully" });
    } catch (err) {
        console.error("Delete Member Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//  DELETE ALL MEMBERS 
teams_router.delete("/delete-all", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: "Action denied" });
        }

        const result = await pool.query("SELECT img_url FROM members");

        for (const row of result.rows) {
            if (!row.img_url) continue;

            const parts = row.img_url.split("/");
            const file = parts[parts.length - 1];
            const public_id = "members/" + file.split(".")[0];

            try {
                await cloudinary.uploader.destroy(public_id);
            } catch (e) {
                console.error("Cloudinary delete error:", e);
            }
        }

        await pool.query("DELETE FROM members");
        await addLog("Deleted all members");

        return res.json({ message: "All members deleted successfully" });
    } catch (err) {
        console.error("Delete All Members Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

teams_router.get("/members",async (req,res)=>{  
  
    const response=await pool.query("SELECT * FROM members ORDER BY team, name");
    res.send({ 
        results: response.rows,
        message: "Members fetched successfully"
    })
})
module.exports = teams_router;
