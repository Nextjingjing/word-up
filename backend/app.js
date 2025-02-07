const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { authenticateJWT } = require('./src/middlewares/user')
const errorHandler = require("./src/middlewares/errorHandler");
const cookieParser = require("cookie-parser");

dotenv.config();

// Import router
const challengeRouter = require('./src/routes/challenge')
const userRouter = require('./src/routes/user')

const app = express()

// Port
const port = process.env.PORT;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


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

app.get('/test/protect', authenticateJWT, (req,res) =>{
  res.send("testing pass")
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
