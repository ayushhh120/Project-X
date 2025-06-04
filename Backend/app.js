const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Basic route to test the server
app.get('/', (req, res)=>{
    res.send("hello world")
});

// Import and use user routes
app.use('/users', userRoutes);





module.exports = app;