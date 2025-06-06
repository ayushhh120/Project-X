const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');



// Connect to the database
connectDB();

// middleware to enable CORS 
app.use(cors());

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

// Import and use captain routes
app.use('/captains', captainRoutes);





module.exports = app;