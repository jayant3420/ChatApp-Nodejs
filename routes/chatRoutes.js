const express = require("express");
const router = express.Router();

router.route("/")
    .get((_req, res) => res.render("chat"))


module.exports = router;
