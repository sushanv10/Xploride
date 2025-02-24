const express = require('express');
const cors = require('cors');
const {connectDB} = require('./src/config/db.js');
require('dotenv').config();
const authRoutes= require('./src/routes/authRoutes.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
