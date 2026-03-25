const uploadProfilePic = (req, res, next) => {
    upload.single("profilePic")(req, res, (err) => {
        if (err) return res.render("auth", { ...require("./constant").REGISTER, responseError: err.message });
        next();
    });
};

module.exports = { uploadProfilePic };