// import multer, cloudinary, and cloudinaryStorage
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuring Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// CloudinaryStorage for storing images in different folders based on field names
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = "app"; // Default folder for general service image

    // Check the field name to set the correct folder
    if (file.fieldname.startsWith("description[imageDescription]")) {
      folderName = "app/imageDescription"; // Folder for images in imageDescription
    } else if (file.fieldname === "image") {
      folderName = "app"; // General service image goes to the 'app' folder
    }

    return {
      folder: folderName, // Cloudinary folder based on the field
      allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional resizing
    };
  },
});

// Multer configuration for handling file uploads with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
