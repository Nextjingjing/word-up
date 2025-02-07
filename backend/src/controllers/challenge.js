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
}

module.exports = { getAllChallenges, getVocabChallenge };