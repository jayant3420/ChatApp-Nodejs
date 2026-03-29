const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String
    },
    admin: {
        type: String
    },
    roomKey: {
        type: String,
        required: true,
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    lastMessage: {type: String},
    lastMessageAt: {type: Date},
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
