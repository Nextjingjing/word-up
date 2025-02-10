const { User } = require("../models/user");
const generateToken = require("../utils/generateToken");

// @desc    Login
// @route   POST /api/user/login
// @access  Public
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        console.log("ERROR!!!", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc    Register
// @route   POST /api/user/register
// @access  Public
const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = generateToken(newUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        console.log("ERROR!!!", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @desc    Logout
// @route   POST /api/user/logout
// @access  Public
const userLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    res.status(200).json({ message: "Logout successful" })
};

module.exports = { userLogin, userRegister, userLogout }
