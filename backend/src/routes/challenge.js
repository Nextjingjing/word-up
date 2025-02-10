const express = require("express");
const {
  getAllChallenges,
  getVocabChallenge,
  uploadChallenge,
  patchChallenge,
  deleteChallenge
} = require("../controllers/challenge");
const { adminAuthenticateJWT } = require("../middlewares/user");
const { imageUpload } = require("../middlewares/upload");

const router = express.Router();

// Routes
router.get("/", getAllChallenges);

router.get("/:challengeId", getVocabChallenge);

router.post(
  "/upload",
  adminAuthenticateJWT,
  imageUpload.single("file"),
  uploadChallenge
);

router.patch("/:challengeId", adminAuthenticateJWT, patchChallenge);

router.delete("/:challengeId", adminAuthenticateJWT, deleteChallenge);

module.exports = router;
