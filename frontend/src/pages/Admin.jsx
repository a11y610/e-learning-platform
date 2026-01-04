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

  const fetchCourses = () => {
    api.get("/courses").then((res) => setCourses(res.data));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses", form);
      alert("Course created");
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
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`);
      alert("Course deleted");
      fetchCourses();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Admin Panel
      </h2>

      {/* Create Course */}
      <form
        onSubmit={handleCreate}
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-12"
      >
        <h3 className="text-xl font-semibold mb-4">
          Create New Course
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
            required
          />

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (unique)"
            className="border p-2 rounded"
            required
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
          />

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full mt-4"
        />

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Create Course
        </button>
      </form>

      {/* Course List */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h4 className="font-semibold text-lg">{c.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {c.category} • {c.difficulty}
            </p>
            <p className="text-sm mt-2">
              {c.price === 0 ? "Free" : `₹${c.price}`}
            </p>

            <button
              onClick={() => handleDelete(c._id)}
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
