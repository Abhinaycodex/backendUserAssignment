const express = require("express");
const { register, login, getProfile, updateProfile } = require("../controller/userController");
const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
