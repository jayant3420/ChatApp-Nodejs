const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const constant = require("../config/constant");
const { uploadProfilePic } = require("../middlewares/uploadProfilePic");

router.route("/register")
    .get((_req, res) => res.render("auth", constant.REGISTER))
    .post(uploadProfilePic, authController.register);

router.route("/login")
    .get((_req, res) => res.render("auth", constant.LOGIN))
    .post(authController.login);


module.exports = router;
