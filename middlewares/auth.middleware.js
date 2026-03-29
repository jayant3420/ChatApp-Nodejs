const SessionModal = require("../modals/Session");

const authMiddleware = async (req, res, next) => {
    try {
        const sessionId = req.cookies["chat_app_session"];
        if (!sessionId) return res.redirect("/auth/login");

        const session = await SessionModal.findById(sessionId).populate("userId");
        if (!session) return res.redirect("/auth/login");

        req.user = session.userId;
        next();
    } catch (error) {
        console.log("auth middleware error ==>>", error);
        res.redirect("/auth/login");
    }
}

module.exports = authMiddleware;