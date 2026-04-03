import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/auth/courses/slug/${slug}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => navigate("/"));
  }, [slug, navigate]);

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to enroll");
      navigate("/login");
      return;
    }

    try {
      await api.post("/auth/enrollments/enroll", { courseId: course._id });
      alert("Enrolled successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner spinner-lg mx-auto mb-4"></div>
          <p className="text-text-light">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-neutral-600 mb-4">Course not found</p>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-secondary-light/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="badge bg-white text-primary font-bold px-4 py-2">
              {course.difficulty}
            </span>
            <span className="badge bg-white text-primary font-bold px-4 py-2">
              {course.category}
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-4 leading-tight">
            {course.title}
          </h1>

          <p className="text-xl text-neutral-100 max-w-2xl">
            {course.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Overview Card */}
              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Course Overview
                </h2>
                <p className="text-text-light leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-base border border-neutral-200">
                    <p className="text-xs text-text-light font-semibold uppercase tracking-wide mb-1">
                      Difficulty
                    </p>
                    <p className="text-lg font-bold text-primary capitalize">
                      {course.difficulty}
                    </p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-base border border-neutral-200">
                    <p className="text-xs text-text-light font-semibold uppercase tracking-wide mb-1">
                      Category
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {course.category || "General"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Syllabus Card */}
              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  📚 Course Syllabus
                </h2>

                {course.lessons && course.lessons.length > 0 ? (
                  <div className="space-y-3">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-neutral-50 rounded-base border border-neutral-200 hover:border-secondary transition"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">
                            {lesson.title}
                          </h3>
                          {lesson.description && (
                            <p className="text-sm text-text-light mt-1">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-light">No lessons added yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              {/* Enrollment Card */}
              <div className="card sticky top-24">
                {/* Price */}
                <div className="mb-8">
                  <p className="text-sm text-text-light uppercase font-semibold tracking-wide mb-2">
                    Price
                  </p>
                  <div className="text-4xl font-bold text-primary">
                    {course.price === 0 ? (
                      <span>Free</span>
                    ) : (
                      <span>₹{course.price}</span>
                    )}
                  </div>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary w-full mb-3 text-lg"
                >
                  📝 Enroll Now
                </button>

                {/* Info Box */}
                <div className="text-xs text-text-light text-center">
                  <p>Start learning today! Access course materials immediately after enrollment.</p>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-neutral-200"></div>

                {/* Course Info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-text-light uppercase font-semibold tracking-wide mb-2">
                      Difficulty Level
                    </p>
                    <p className="text-base font-semibold text-primary capitalize">
                      {course.difficulty}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-text-light uppercase font-semibold tracking-wide mb-2">
                      Category
                    </p>
                    <p className="text-base font-semibold text-primary">
                      {course.category || "General"}
                    </p>
                  </div>

                  {course.lessons && course.lessons.length > 0 && (
                    <div>
                      <p className="text-xs text-text-light uppercase font-semibold tracking-wide mb-2">
                        Lessons
                      </p>
                      <p className="text-base font-semibold text-primary">
                        {course.lessons.length} lessons
                      </p>
                    </div>
                  )}
                </div>

                {/* Share Buttons */}
                <div className="mt-6 pt-6 border-t border-neutral-200 space-y-2">
                  <p className="text-xs text-text-light text-center mb-3">
                    Share this course
                  </p>
                  <button className="w-full btn btn-ghost text-sm">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
