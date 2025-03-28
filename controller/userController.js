const User = require("../models/User");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, address, bio, profilePicture } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        user = new User({ name, email, password, address, bio, profilePicture });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, address, bio, profilePicture } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, address, bio, profilePicture }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
