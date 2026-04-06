const UserModal = require("../modals/User");
const RoomModal = require("../modals/Room");
const { getUserShortName, getRandomColor } = require("../utils/common");
const crypto = require("crypto");

const getChatPage = async (req, res) => {
    try {
        const allUserExceptLoggedIn = await UserModal.find({ _id: { $ne: req.user._id } }).lean();

        let userChatLists = await RoomModal.find({ participants: req.user._id}).sort({lastMessageAt: -1, createdAt: -1}).populate("participants", "name email profilePic");

        // Filter participants
        userChatLists = userChatLists?.map((room) => {
            const chatUsers = room?.participants?.filter((user) => {
                return user?._id?.toString() !== req.user._id.toString();
            })
            room.participants = chatUsers;
            return room;
        })

        res.render("chat", {
            users: allUserExceptLoggedIn,
            chatList: userChatLists,
            getUserShortName,
            getRandomColor
        });
    } catch (err) {
        console.log("error in getChatPage ==>>", err);
        res.redirect("/chat");
    }
}

const createRoomKey = (userIds) => {
    const sortedIds = userIds.sort();
    return crypto.createHash("sha256").update(sortedIds.join("-")).digest("hex");
}

const isChatExist = async (roomKey) => {
    try {
        const chat = await RoomModal.find({ roomKey });
        return chat.length > 0;
    } catch(err) {
        console.log("error in isChatExist ==>>", err);
    }

}

const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        if(!participants || !Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({ error: "Participants are required" });
        }

        const chatParticipants = [...participants, req.user._id.toString()];
        const roomKey = createRoomKey(chatParticipants);

        if(await isChatExist(roomKey)) {
            return res.status(400).json({ error: "Chat already exists" });
        }

        await RoomModal.create({
            roomKey,
            participants: chatParticipants,
            isGroup: chatParticipants.length > 2
        });

        res.json({ message: "Chat created successfully", ok: true });
    } catch(err) {
        console.log("error in createChat ==>>", err);
        res.status(500).json({ error: "Failed to create chat" });
    }
}

module.exports = { getChatPage, createChat };



