const { Challenge, Vocab } = require("../models/challenge");
const fs = require("fs");
const path = require("path");

// @desc    Fetch all challenge
// @route   GET /api/challenge
// @access  Public
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    console.log("ERROR!!!", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Fetch all vocab
// @route   GET /api/challenge/:challengeId
// @access  Public
const getVocabChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const query = await Vocab.find({ challenge: `${challengeId}` });
    res.json(query);
  } catch (err) {
    console.log("ERROR!!!", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Upload challenge
// @route   POST /api/challenge
// @access  Admin
const uploadChallenge = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { name, content } = req.body;
    const img = `images/${req.file.filename}`;
    console.log(req.file.filename);
    const newChallenge = new Challenge({ name, content, img });
    await newChallenge.save();

    res.status(200).json({
      message: "File uploaded successfully",
      challenge: newChallenge,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Patch challenge by id
// @route   PATCH /api/challenge/:challengeID
// @access  Admin
const patchChallenge = async (req, res) => {
  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.challengeId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.json(updatedChallenge);
  } catch (error) {
    console.error("Error updating challenge:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const deletedChallenge = await Challenge.findByIdAndDelete(req.params.challengeId);

    if (!deletedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (deletedChallenge.img) {
      // Resolve the absolute path correctly
      const imagePath = path.join(__dirname, "..", "..", "uploads", deletedChallenge.img);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        } else {
          console.log(`Image deleted: ${deletedChallenge.img}`);
        }
      });
    }

    res.json({ message: "Challenge deleted successfully" });

  } catch (error) {
    console.error("Error deleting challenge:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllChallenges, getVocabChallenge, uploadChallenge, patchChallenge, deleteChallenge };
