const ImageModel = require('../models/tourImageModel');
const { uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');

exports.addImage = async (req, res) => {
    try {
        uploadToCloudinary(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const { tour_id } = req.body;

            // Validate tour_id
            if (!tour_id) {
                return res.status(400).json({ message: "Tour ID is required" });
            }

            // Get the Cloudinary URL from req.file
            const cloudinaryUrl = req.file.cloudinaryUrl;

            // Save the image URL to DB
            const result = await ImageModel.addTourImage(tour_id, cloudinaryUrl);

            res.status(201).json({
                message: "Image uploaded and saved successfully",
                image: {
                    id: result.insertId,
                    tour_id,
                    image_url: cloudinaryUrl
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to add image", error: err });
    }
};

exports.getImages = async (req, res) => {
    try {
        const images = await ImageModel.getImagesByTourId(req.params.tour_id);
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch images", error: err });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        await ImageModel.deleteImageById(req.params.id);
        res.json({ message: "Image deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete image", error: err });
    }
};
