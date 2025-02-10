const { Challenge, Vocab } = require("../models/challenge");

// @desc    Fetch all challenge
// @route   GET /api/challenge
// @access  Public
const getAllChallenges = async (req, res) => {
    try{
        const challenges = await Challenge.find();
        res.json(challenges);
    }catch(err){
        console.log("ERROR!!!", err)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc    Fetch all vocab
// @route   GET /api/challenge/:challengeId
// @access  Public
const getVocabChallenge = async (req, res) => {
    try{
        const { challengeId } = req.params;
        const query = await Vocab.find({ 'challenge': `${challengeId}` });
        res.json(query);
    }catch(err){
        console.log("ERROR!!!", err)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const uploadChallenge = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { name, content } = req.body;
      const img = `images/${req.file.filename}`
      console.log(req.file.filename)
      const newChallenge = new Challenge({ name, content, img});
      await newChallenge.save();

      res.status(200).json({ 
        message: "File uploaded successfully",
        challenge: newChallenge
      });
  
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

module.exports = { getAllChallenges, getVocabChallenge, uploadChallenge};