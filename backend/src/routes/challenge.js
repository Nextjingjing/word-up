const express = require('express');
const { Challenge, Vocab } = require("../models/challenge");
const { getAllChallenges } = require("../controllers/challenge")

const router = express.Router();

router.get('/', getAllChallenges);

module.exports = router;