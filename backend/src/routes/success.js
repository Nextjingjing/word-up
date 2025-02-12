const express = require("express");

// import controllers
const { addChallengeUser, listChallengeUser } = require("../controllers/success")

// Middlewares
const { authenticateJWT } = require("../middlewares/user")

const router = express.Router();

router.get("/", authenticateJWT, listChallengeUser)
router.post("/:challengeId", authenticateJWT, addChallengeUser);

module.exports = router;