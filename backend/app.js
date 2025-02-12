const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { authenticateJWT, adminAuthenticateJWT } = require('./src/middlewares/user')
const errorHandler = require("./src/middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");

dotenv.config();

// Import router
const challengeRouter = require('./src/routes/challenge')
const userRouter = require('./src/routes/user')
const successRouter = require('./src/routes/success')

const app = express()

// Port
const port = process.env.PORT;

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
  res.send('API is running.')
})

app.use('/api/challenge', challengeRouter);

app.use('/api/user', userRouter);

app.use('/api/success', successRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
