const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// User Registration
exports.register = async (req, res) => {
    try {
        let { name, email, password, address, bio, profilePicture } = req.body;
        email = email.toLowerCase().trim(); // Normalize email
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, message: "Email already exists" });

        user = new User({ name, email, password, address, bio, profilePicture });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ success: true, token, user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: process.env.NODE_ENV === "development" ? error.message : undefined 
        });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.json({ success: true, token, user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: process.env.NODE_ENV === "development" ? error.message : undefined 
        });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password").lean();
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: process.env.NODE_ENV === "development" ? error.message : undefined 
        });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, address, bio, profilePicture } = req.body;
        const updateData = {};
        
        if (name) updateData.name = name;
        if (address) updateData.address = address;
        if (bio) updateData.bio = bio;
        if (profilePicture) updateData.profilePicture = profilePicture;

        const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: process.env.NODE_ENV === "development" ? error.message : undefined 
        });
    }
};
