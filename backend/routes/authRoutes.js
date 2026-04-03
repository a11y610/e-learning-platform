const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, verifyOTP, resetPassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

// Test protected route
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
