import { useEffect, useState } from "react";
import api from "../api/api";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    difficulty: "beginner",
    price: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    api.get("/auth/courses").then((res) => setCourses(res.data));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/courses", form);
      alert("Course created successfully!");
      setForm({
        title: "",
        slug: "",
        description: "",
        category: "",
        difficulty: "beginner",
        price: 0,
      });
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/auth/courses/${id}`);
      alert("Course deleted successfully!");
      fetchCourses();
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-secondary-light/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-secondary-dark text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">⚙️ Admin Dashboard</h1>
          <p className="text-neutral-100">Manage courses and platform content</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Create Course Section */}
          <div className="card mb-12">
            <h2 className="text-2xl font-bold text-primary mb-8">Create New Course</h2>

            <form onSubmit={handleCreate} className="space-y-6">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., React Mastery"
                    required
                    className="w-full"
                  />
                </div>

                {/* Slug */}
                <div className="form-group">
                  <label className="form-label">Slug (URL-friendly)</label>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="e.g., react-mastery"
                    required
                    className="w-full"
                  />
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g., Web Development"
                    className="w-full"
                  />
                </div>

                {/* Difficulty */}
                <div className="form-group">
                  <label className="form-label">Difficulty Level</label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="w-full"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Price */}
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0 for free"
                    min="0"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Course description..."
                  className="w-full"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full md:w-auto"
              >
                {loading ? "Creating..." : "+ Create Course"}
              </button>
            </form>
          </div>

          {/* Courses List */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">Manage Courses</h2>

            {courses.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-2xl text-neutral-600 mb-2">📚 No Courses Yet</p>
                <p className="text-text-light">Create your first course above</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course._id} className="card">
                    {/* Course Header */}
                    <div className="mb-4 pb-4 border-b border-neutral-200">
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-text-light">{course.slug}</p>
                    </div>

                    {/* Course Info */}
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-xs text-text-light uppercase font-semibold tracking-wide">
                          Category
                        </p>
                        <p className="text-sm text-primary font-semibold">
                          {course.category || "—"}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <p className="text-xs text-text-light uppercase font-semibold tracking-wide">
                            Difficulty
                          </p>
                          <span className="badge badge-primary text-xs mt-1">
                            {course.difficulty}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-text-light uppercase font-semibold tracking-wide">
                            Price
                          </p>
                          <p className="text-sm font-bold text-primary">
                            {course.price === 0 ? "Free" : `₹${course.price}`}
                          </p>
                        </div>
                      </div>

                      {course.description && (
                        <div>
                          <p className="text-xs text-text-light uppercase font-semibold tracking-wide mb-1">
                            Description
                          </p>
                          <p className="text-sm text-text-light line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-danger w-full text-sm"
                    >
                      Delete Course
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
