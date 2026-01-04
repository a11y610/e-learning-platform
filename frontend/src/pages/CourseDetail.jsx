import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/slug/${slug}`)
      .then((res) => setCourse(res.data))
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
      await api.post("/enrollments/enroll", { courseId: course._id });
      alert("Enrolled successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (!course) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {course.description}
        </p>

        <div className="flex gap-4 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {course.difficulty}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {course.price === 0 ? "Free" : `₹${course.price}`}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-3">Syllabus</h2>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          {course.lessons?.length > 0 ? (
            course.lessons.map((l, i) => (
              <li key={i}>{l.title}</li>
            ))
          ) : (
            <li>No lessons added yet</li>
          )}
        </ul>

        <button
          onClick={handleEnroll}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Enroll in Course
        </button>
      </div>
    </div>
  );
}
