const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// POST /api/enroll
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.body;

  const alreadyEnrolled = await Enrollment.findOne({
    userId: req.user._id,
    courseId
  });

  if (alreadyEnrolled) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  const enrollment = await Enrollment.create({
    userId: req.user._id,
    courseId
  });

  res.status(201).json(enrollment);
};

// GET /api/enrollments/me
exports.getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({
    userId: req.user._id
  }).populate("courseId");

  res.json(enrollments);
};

// PUT /api/enrollments/:id/progress
exports.updateProgress = async (req, res) => {
  const { lessonId, completed } = req.body;

  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  enrollment.progress.set(lessonId, completed);

  const total = enrollment.progress.size;
  const done = Array.from(enrollment.progress.values()).filter(Boolean).length;

  enrollment.progressPercent = total === 0 ? 0 : Math.round((done / total) * 100);

  if (enrollment.progressPercent === 100) {
    enrollment.completedAt = new Date();
  }

  await enrollment.save();
  res.json(enrollment);
};
