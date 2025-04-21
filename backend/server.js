const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes= require('./src/routes/authRoutes.js');
const productRoutes = require('./src/routes/productRoutes.js');
const categoryRoutes = require('./src/routes/categoryRoutes.js');
const bikeRoutes = require("./src/routes/bikeRoutes.js");
const rentalRoutes = require("./src/routes/rentalRoutes.js");
const tourRoutes = require("./src/routes/tourRoutes.js");
const tourImageRoutes = require("./src/routes/tourImageRoutes.js");
const tourItineraryRoutes = require("./src/routes/tourItineraryRoutes.js");
const cookieParser = require('cookie-parser');
const rateLimiter = require('./src/utils/ratelimeter.js')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

// Enable CORS for specific origin
const allowedOrigins = ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, 
    allowedHeaders: "Content-Type, Authorization"
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/bikesRental/", rentalRoutes)
app.use("/api/tour", tourRoutes);
app.use("/api/tour-images", tourImageRoutes);
app.use("/api/tour-itinerary", tourItineraryRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
