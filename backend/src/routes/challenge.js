const express = require("express");
const { getAllChallenges, getVocabChallenge, uploadChallenge } = require("../controllers/challenge");
const { authenticateJWT, adminAuthenticateJWT } = require('../middlewares/user')
const { imageUpload } = require('../middlewares/upload') 

const router = express.Router();

// Routes
router.get("/", getAllChallenges);

router.get("/:challengeId", getVocabChallenge);

router.post("/upload", adminAuthenticateJWT, imageUpload.single("file"), uploadChallenge);

module.exports = router;
