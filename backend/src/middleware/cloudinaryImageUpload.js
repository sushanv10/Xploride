// middlewares/cloudinaryUpload.js
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');  // For generating unique filenames

// Function to sanitize file names 
const sanitizeFileName = (imageName) => {
  return imageName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_\-\.]/g, "");
};

// Define the file filter for Cloudinary upload (allowed file types)
const filter = (req, file, next) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    next(null, true);
  } else {
    next(new Error("Only .jpeg, .jpg, .png, .gif, .webp formats allowed!"));
  }
};


const filename = (_, file, next) => {
  const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
  const sanitizedFileName = `${sanitizeFileName(file.originalname.split('.')[0])}-${uuidv4()}${ext}`;
  next(null, sanitizedFileName);
};

// Multer instance that processes the file and uploads it to Cloudinary
const cloudinaryStorage = multer.memoryStorage();  // Use memoryStorage to store image temporarily in memory

// Middleware for file upload (using multer)
const cloudinaryUpload = multer({
  storage: cloudinaryStorage,
  fileFilter: filter,
}).single('productImage'); // Single file upload, expecting the field name 'image' in the request

// Function to upload image to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
   console.log('Uploaded file:', req.file);
  if (!req.file) {
    return next(new Error("No file uploaded"));
  }

  try {
    // Upload file to Cloudinary using the buffer from memory storage
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'xploride/images', 
        public_id: req.file.filename,  // Assign a unique name for the image
        resource_type: 'auto',  // Automatically detect the file type (image, video, etc.)
      },
      (error, result) => {
        if (error) {
          return next(error);
        }
        // Add the Cloudinary URL to the request for further use in the controller
        req.file.cloudinaryUrl = result.secure_url;
        next();  // Proceed to the next middleware (controller)
      }
    );

    uploadStream.end(req.file.buffer);  // Stream the file buffer to Cloudinary

  } catch (error) {
    next(error);
  }
};

module.exports = {
  cloudinaryUpload,   // Export the file upload middleware
  uploadToCloudinary  // Export the Cloudinary upload function
};
