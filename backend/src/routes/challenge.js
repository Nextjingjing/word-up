const express = require('express');
const { Challenge, Vocab } = require("../models/challenge");
const { getAllChallenges, getVocabChallenge } = require("../controllers/challenge")

const router = express.Router();

router.get('/', getAllChallenges);

router.get('/:challengeId', getVocabChallenge);

module.exports = router;