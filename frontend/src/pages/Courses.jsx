import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [priceType, setPriceType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let url = "/courses";
    const params = [];

    if (difficulty) params.push(`difficulty=${difficulty}`);
    if (category) params.push(`category=${category}`);
    if (priceType === "free") params.push(`price=0`);
    if (priceType === "paid") params.push(`price_gt=0`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    api.get(url).then((res) => setCourses(res.data));
  }, [difficulty, category, priceType]);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to enroll");
      navigate("/login");
      return;
    }

    try {
      await api.post("/enrollments/enroll", { courseId });
      alert("Enrolled successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 rounded-2xl mb-12 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Learn Skills That Matter 🚀
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-blue-100">
          High-quality courses • Track progress • Learn at your pace
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="programming">Programming</option>
          <option value="web">Web Development</option>
          <option value="data">Data Science</option>
          <option value="design">Design</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          value={priceType}
          onChange={(e) => setPriceType(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <Link to={`/courses/${c.slug}`}>
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                  {c.title}
                </h3>
              </Link>

              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                {c.difficulty}
              </span>
            </div>

            <p className="text-gray-600 text-sm mt-2">
              {c.description}
            </p>

            <p className="mt-3 font-semibold text-gray-800">
              {c.price === 0 ? "Free" : `₹${c.price}`}
            </p>

            <button
              onClick={() => handleEnroll(c._id)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition"
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
