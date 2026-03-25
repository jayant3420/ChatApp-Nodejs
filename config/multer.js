const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (_req, file, cb) => {
        const uniqueName = path.basename(file.originalname, path.extname(file.originalname)) + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp/;
        const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
        isValid ? cb(null, true) : cb(new Error("Only images are allowed"));
    },
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});



module.exports = upload;
