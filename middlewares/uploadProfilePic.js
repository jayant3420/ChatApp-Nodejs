const upload = require("../config/multer");
const constant = require("../config/constant");

const uploadProfilePic = (req, res, next) => {
    try {
        upload.single("profilePic")(req, res, (err) => {
            if (err) return res.render("auth", { ...constant.REGISTER, responseError: err.message });
            next();
        });
    } catch(error) {
        console.log("error in upload profile pic middleware ==>>", error);
    }
};

module.exports = { uploadProfilePic };