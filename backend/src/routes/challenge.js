const express = require("express");
const { getAllChallenges, getVocabChallenge, getImageChallenge } = require("../controllers/challenge");
const multer = require("multer");

const router = express.Router();

// storage to uploads/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Routes
router.get("/", getAllChallenges);

router.get("/:challengeId", getVocabChallenge);

// router.post("/upload", upload.single("image"), getImageChallenge);

module.exports = router;
