const SessionModal = require("../modals/Session");

const authMiddleware = async (req, res, next) => {
    try {
        // checking the session cookie is present or not
        const sessionId = req.cookies["chat_app_session"];
        if(!sessionId) return res.redirect("/auth/login");

        // checking the session is valid or not
        const session = await SessionModal.findById(sessionId).populate("userId");
        if(!session) return res.redirect("/auth/login");

        // Checking if session is expired or not
        if(session.expiresAt < new Date()) {
            await SessionModal.findByIdAndDelete(sessionId);
            res.clearCookie("chat_app_session");
            return res.redirect("/auth/login");
        }

        const maxAge = Number(process.env.SESSION_MAX_AGE_MS);
        const newExpiresAt = new Date(Date.now() + maxAge);

        // Slide both the DB session and cookie on every request
        await SessionModal.findByIdAndUpdate(sessionId, { expiresAt: newExpiresAt });
        res.cookie("chat_app_session", sessionId, { httpOnly: true, maxAge });

        req.user = session.userId;
        next();

    } catch (error) {
        console.log("auth middleware error ==>>", error);
        res.redirect("/auth/login");
    }
}

module.exports = authMiddleware;