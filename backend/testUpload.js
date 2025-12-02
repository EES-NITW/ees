// import your Cloudinary config
const cloudinary = require('./config/cloudinary');
const { pool } = require('./routes/db');
const imagePath = './testImg/microsoft.png'; // well get image through a form later using multer

async function uploadImage() {
    try {
        console.log("Uploading to Cloudinary...");

        //  upload the image
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'companies' // companies images in one folder, use separate folders for each type of images
        });

        // extract the URL
        const imageUrl = result.secure_url;
        const imageName = "Microsoft"; // name for companies table // later we will get this from form 

        console.log("------------------------------------------");
        console.log("Upload Successful!");
        console.log("Image URL:", imageUrl);
        console.log("------------------------------------------");

        //  DATABASE STEP
        await saveToDatabase(imageName, imageUrl);

    } catch (error) {
        console.error("Error uploading:", error);
    } finally {
        console.log("Closing connection...");
        process.exit();
    }
}

//  database fn
async function saveToDatabase(name, url) {
    await pool.query("INSERT INTO companies (name, img_url) VALUES ($1,$2)", [name, url]);
}

// Run the function
uploadImage();