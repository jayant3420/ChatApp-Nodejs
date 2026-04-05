const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roomKey: {
        type: String,
        required: true,
        unique: true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
}, { timestamps: true });

// fetch all rooms of a user sorted by latest message
roomSchema.index({ participants: 1, lastMessageAt: -1 });

// fetch group rooms quickly
roomSchema.index({ isGroup: 1 });

module.exports = mongoose.model("Room", roomSchema);
