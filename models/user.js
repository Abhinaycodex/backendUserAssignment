const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, // Normalize email
            trim: true
        },
        password: { type: String, required: true },
        address: { type: String, required: true },
        bio: { type: String },
        profilePicture: { type: String }
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare passwords
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Hide password in responses
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model("User", userSchema);
