const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../../uploads/images");

// storage to ../../uploads/images
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const imageUpload = multer({ storage: imageStorage });

module.exports = { imageUpload };