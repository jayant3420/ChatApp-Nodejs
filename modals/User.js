const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, maxlength: 254 },
    password: { type: String, required: true, minlength: 60, maxlength: 60 },
    profilePic: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
