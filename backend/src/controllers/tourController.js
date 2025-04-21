const tourModel = require('../models/tourModel');
const { uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');


// Create
exports.createTour = async (req, res) => {
  try {

     // upload image in cloudinary
    uploadToCloudinary (req, res, async (err) => {
        if(err){
            return res.status(400).json({message: err.message});
        }
        const { price, duration, distance, difficulty, tour_code, next_departure, category, tourName, bike_hire_cost, description } = req.body;

        if (!price || !duration || !distance || !difficulty || !tour_code || !next_departure || !category || !tourName || !bike_hire_cost || !description) {
        return res.status(400).json({ message: "All fields are required" });
        }

        // Get Image URL from Cloudinary
        const cloudinaryUrl = req.file.cloudinaryUrl;

        const result = await tourModel.createBikeTour(
        price,
        duration,
        distance,
        difficulty,
        tour_code,
        next_departure,
        category,
        tourName,
        bike_hire_cost,
        description,
        cloudinaryUrl,
        );

        res.status(201).json({
            success: true,
            message: "Tour created", 
            tour: {
                tour_id: result.insertId,
                price,
                duration,
                distance,
                difficulty,
                tour_code,
                next_departure,
                category,
                tourName,
                bike_hire_cost,
                description,
                tourImage: cloudinaryUrl,
            } 
        });
    });

  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// Get all tours
exports.getAllTours = async (_, res) => {
    try {
        const tour = await tourModel.getAllBikeTours();

        if(tour.length === 0){
            return res.status(404).json({message: "No tour found"});
        }

        return res.status(200).json({tour});
    } catch (error) {
        console.log("Error retrieving tour:", error);
        return res.status(500).json({message: "Server Error"});
    }
};

// Get one tour
exports.getTourById = async (req, res) => {
  try {
    const tour = await tourModel.findBikeTourById(req.params.id);
    if(tour.length === 0){
            return res.status(404).json({message: "No tour found"});
    }
    res.json(tour[0]);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// Update
exports.updateTour = async (req, res) => {
  try {
    const {
      price,
      duration,
      distance,
      difficulty,
      tour_code,
      next_departure,
      category,
      tourName,
      bike_hire_cost,
      description,
    } = req.body;

    // Validation
    if (
      !price ||
      !duration ||
      !distance ||
      !difficulty ||
      !tour_code ||
      !next_departure ||
      !category ||
      !tourName ||
      !bike_hire_cost ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedData = {
      price,
      duration,
      distance,
      difficulty,
      tour_code,
      next_departure,
      category,
      tourName,
      bike_hire_cost,
      description,
    };

    // ✅ Only add Image if defined
    if (req.file && req.file.cloudinaryUrl) {
      updatedData.Image = req.file.cloudinaryUrl;
    }

    // ✅ Remove any undefined values just in case
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) {
        delete updatedData[key];
      }
    });

    const result = await tourModel.updateBikeTourById(req.params.id, updatedData);

    res.json({
      success: true,
      message: "Tour updated successfully",
      tour: {
        id: req.params.id,
        ...updatedData,
      },
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};




// Delete
exports.deleteTour = async (req, res) => {
  try {
    const result = await tourModel.deleteBikeTourById(req.params.id);
    res.json({ success: true, message: "Tour deleted", data: result });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
