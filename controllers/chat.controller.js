const UserModal = require("../modals/User");
const { getUserShortName, getRandomColor } = require("../utils/common");

const getChatPage = async (req, res) => {
    try {
        const getAllUsersExceptLogedInUser = await UserModal.find({ _id: { $ne: req.user._id } }).lean();
        res.render("chat", {
            users: getAllUsersExceptLogedInUser,
            getUserShortName,
            getRandomColor
        });
    } catch (err) {
        console.log("error in getChatPage ==>>", err);
        res.redirect("/chat");
    }
}

module.exports = { getChatPage };



