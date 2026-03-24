const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authController = require("../controllers/auth.controller");

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

router.route("/register")
    .get((req, res) => res.render("auth", {
        title: "Register",
        buttonText: "Register",
        formAction: "/auth/register",
        linkText: "Login",
        linkUrl: "/auth/login"
    }))
    .post(upload.single("profilePic"), authController.register);

router.route("/login")
    .get((req, res) => res.render("auth", {
        title: "Login",
        buttonText: "Login",
        formAction: "/auth/login",
        linkText: "Register",
        linkUrl: "/auth/register"
    }))
    .post((req, res) => {

    })


module.exports = router;
