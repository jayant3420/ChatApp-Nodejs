const bcrypt = require("bcryptjs");
const UserModal = require("../modals/User");
const SessionModal = require("../modals/Session");
const constant = require("../config/constant");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const file = req.file;

        // Checking for existing user
        const userRes = await UserModal.findOne({ email });
        if (userRes) {
            return res.render("auth", { ...constant.REGISTER, responseError: "User Already Exists" });
        }

        // Creating hash password
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create User
        await UserModal.create({
            name,
            email,
            password: hashedPassword,
            profilePic: file ? file.filename : ""
        })

        res.redirect("/auth/login");
    } catch (err) {
        console.log("error in registration ==>>", err);
        res.render("auth", { ...constant.REGISTER, responseError: "Something went wrong. Please try again." });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in db or not
        const user = await UserModal.findOne({ email });
        if (!user) return res.render("auth", { ...constant.LOGIN, responseError: "User not found" });

        // Check user's password is correct or not
        const isPwdMatch = await bcrypt.compare(password, user.password);
        if (!isPwdMatch) return res.render("auth", { ...constant.LOGIN, responseError: "Wrong password" });

        const maxAge = Number(process.env.SESSION_MAX_AGE_MS);

        // Creating a new session
        const sessionRes = await SessionModal.create({
            userId: user._id,
            expiresAt: new Date(Date.now() + maxAge)
        })

        // Setting cookies
        res.cookie("chat_app_session", sessionRes?._id?.toString(), {
            httpOnly: true,
            maxAge
        })

        // redirecting
        res.redirect("/chat");

    } catch (error) {
        console.log("login error ===>>", error);
        res.render("auth", { ...constant.LOGIN, responseError: "Something went wrong. Please try again." });
    }
}

module.exports = { register, login }