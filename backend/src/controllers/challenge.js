const { Challenge, Vocab } = require("../models/challenge");


// @desc    Fetch all Challenge
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

module.exports = { getAllChallenges };