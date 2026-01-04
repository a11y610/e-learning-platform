const express = require("express");
const router = express.Router();
const {
  enrollInCourse,
  getMyEnrollments,
  updateProgress
} = require("../controllers/enrollmentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/enroll", protect, enrollInCourse);
router.get("/me", protect, getMyEnrollments);
router.put("/:id/progress", protect, updateProgress);

module.exports = router;
