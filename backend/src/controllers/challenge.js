const { Challenge, Vocab } = require("../models/challenge");
const deleteFile = require("../utils/deleteFile");
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
    const { name, content } = req.body;
    let updatedFields = { name, content };

    const challenge = await Challenge.findById(req.params.challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (req.file) {
      const newImg = `images/${req.file.filename}`;
      updatedFields.img = newImg;

      if (challenge.img) {
        const oldImagePath = path.join(__dirname, "..", "..", "uploads", challenge.img);
        try {
          await deleteFile(oldImagePath);
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.challengeId,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    res.json({ message: "Challenge updated successfully", updatedChallenge });

  } catch (error) {
    console.error("Error updating challenge:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete challenge by id
// @route   Delete /api/challenge/:challengeID
// @access  Admin
const deleteChallenge = async (req, res) => {
  try {
    const deletedChallenge = await Challenge.findByIdAndDelete(req.params.challengeId);

    if (!deletedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (deletedChallenge.img) {
      // ✅ Construct absolute path
      const imagePath = path.join(__dirname, "..", "..", "uploads", deletedChallenge.img);

      try {
        await deleteFile(imagePath); // ✅ Use utility function
      } catch (err) {
        console.error("❌ Error deleting challenge image:", err);
      }
    }

    res.json({ message: "✅ Challenge deleted successfully" });

  } catch (error) {
    console.error("❌ Error deleting challenge:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    add vocab for challenge by id
// @route   Delete /api/challenge/:challengeID
// @access  Admin
const addVocab = async (req, res) => {
  try{
    const challengeId = req.params.challengeId
    const {english, thai} = req.body
    if(!challengeId){
      return(res.status(400).json({massage: "There is no challenge id param or Invalid body request"}))
  };
    const selectedChallenge = await Challenge.findById(challengeId);
    if(!selectedChallenge){
      return(res.status(404).json({massage: "No Challenge for this id"}))
    }
    const newVocab = new Vocab({english: english, thai: thai, challenge: selectedChallenge._id});
    await newVocab.save();
    res.status(201).json({ message: "Vocab added successfully", vocab: newVocab });

  }catch(err){
    console.log("Error! ",err)
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  };

};

module.exports = { getAllChallenges, 
  getVocabChallenge, 
  uploadChallenge, 
  patchChallenge, 
  deleteChallenge,
  addVocab
 };
