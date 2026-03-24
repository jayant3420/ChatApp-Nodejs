const bcrypt = require("bcryptjs");
const UserModal = require("../modals/User");

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const file = req.file;

        // Checking for existing user
        const userRes = await UserModal.findOne({ email });
        console.log("user res ==>>", userRes);

        // Creating hash password
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create User
        const createUserRes = await UserModal.create({
            email,
            password: hashedPassword,
            profilePic: file ? file.filename : ""
        })

        console.log("created user res ==>>", createUserRes);
        console.log("created user id ==>>", createUserRes._id);

    } catch (err) {
        console.log("error in registration ==>>", err);
    } finally {
        res.redirect("/auth/register");
    }
}

module.exports = { register }