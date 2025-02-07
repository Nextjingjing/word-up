const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

// Import router
const challengeRouter = require('./src/routes/challenge')

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
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
  res.send('API is running.')
})

app.use('/api/challenge', challengeRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})