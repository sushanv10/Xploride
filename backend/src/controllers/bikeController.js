const { createBike, updateBikeById, findBikeById, deleteBikeById, getAllBikes, getBikeByCategory } = require('../models/bikeModel');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');

// Create a new bike

exports.createBike = async (req, res) => {
    try {
        // upload image in cloudinary
        uploadToCloudinary (req, res, async (err) => {
            if(err){
                return res.status(400).json({message: err.message});
            }
    
            const { bikeName, brand, model, category, price, availability, description, weight, wheel, size } = req.body;
    
            // Validate Fields
            if (!bikeName || !brand || !model || !category || !price  || !description || !weight || !wheel || !size) {
                return res.status(400).json({ message: "All fields are required" });
            }

  
            // Get Image URL from Cloudinary
            const cloudinaryUrl = req.file.cloudinaryUrl;
    
            // Create a product
            const result = await createBike(
                bikeName,
                brand,
                model,
                category,
                price,
                availability,
                description,
                cloudinaryUrl,
                weight,
                wheel,
                size
            );
    
            // Response success message
            return res.status(201).json({
                message: "Bike created successfully",
                bike: {
                    bikeId: result.insertId,
                    bikeName,
                    brand,
                    model,
                    category, 
                    price, 
                    availability, 
                    description,
                    Image: cloudinaryUrl,
                    weight,
                    wheel,
                    size,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            })
        });
        
    } catch (error) {
        console.log("Error creating bike:", error)
        res.status(500).json({message: "Server Error"});
    }
};

// Update a bike
exports.updateBike = async (req, res) => {
    try {
        const bikeId = req.params.id;
        const { bikeName, brand, model, category, price, availability, description, weight, wheel, size } = req.body;

        if (!bikeName || !brand || !model || !category || !price || !description || !weight || !wheel || !size) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create the updatedBike object, replacing undefined values with null
        const updatedBike = {
            bikeName: bikeName || null, 
            brand: brand || null,
            model: model || null,
            category: category || null,
            price: price || null,
            availability: availability || null,
            description: description || null,
            weight: weight || null,
            wheel: wheel || null,
            size: size || null,
            bikeImage: req.file ? req.file.cloudinaryUrl : null 
        };

        // Update product in the database
        const result = await updateBikeById(bikeId, updatedBike);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Bike not found" });
        }

        // Success Response
        return res.status(200).json({
            message: "Bike updated successfully",
            bike: updatedBike
        });

    } catch (error) {
        console.log("Error updating bike:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


// Get a bike by ID
exports.getBikeById = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const bike = await findBikeById(bikeId);

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    return res.status(200).json({ bike });
  } catch (error) {
    console.error("Error retrieving bike:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.fetchBikeByCategory = async (req,res) => {
  try {
    const {category} = req.params ;
    const bikes = await getBikeByCategory(category);
    res.status(200).json({bikes})
  } catch (error) {
    console.log("Error fetching bike by category", error);
    res.status(500).json({success: false, error})
    
  }
}

// Delete a bike
exports.deleteBike = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const result = await deleteBikeById(bikeId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Bike not found" });
    }

    return res.status(200).json({ message: "Bike deleted successfully" });
  } catch (error) {
    console.error("Error deleting bike:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get all bikes
exports.fetchAllBikes = async (req, res) => {
  try {
    const bikes = await getAllBikes();

    if (bikes.length === 0) {
      return res.status(404).json({ message: "No bikes found" });
    }

    return res.status(200).json({ bikes });
  } catch (error) {
    console.error("Error retrieving bikes:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
