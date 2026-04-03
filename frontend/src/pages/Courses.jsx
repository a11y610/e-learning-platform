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
    <div className="min-h-screen bg-[var(--color-bg-light)] transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-secondary-dark text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-white">
            Learn Skills That Matter
          </h1>
          <p className="text-xl text-neutral-100 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive courses designed by industry experts. Learn at your own pace with our flexible, professional curriculum.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="card rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-text-dark)" }}>Filter Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full"
                >
                  <option value="">All Categories</option>
                  <option value="programming">Programming</option>
                  <option value="web">Web Development</option>
                  <option value="data">Data Science</option>
                  <option value="design">Design</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="form-label">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="form-label">Price Type</label>
                <select
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value)}
                  className="w-full"
                >
                  <option value="">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {courses.length === 0 ? (
            <div className="card rounded-xl p-12 text-center">
              <p className="text-2xl mb-2" style={{ color: "var(--color-text-dark)" }}>📚 No courses found</p>
              <p style={{ color: "var(--color-text-light)" }}>Try adjusting your filters or browse all courses</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm" style={{ color: "var(--color-text-light)" }}>
                Found {courses.length} course{courses.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {courses.map((c) => (
                  <div
                    key={c._id}
                    className="card hover:shadow-xl group overflow-hidden p-0"
                  >
                    {/* Course Header */}
                    <div className="h-36 bg-gradient-to-br from-secondary to-secondary-dark group-hover:from-secondary-dark group-hover:to-secondary transition-all">
                      <div className="h-full flex items-end justify-start p-5">
                        <span className="badge badge-primary capitalize">{c.difficulty}</span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-5">
                      <Link to={`/courses/${c.slug}`}>
                        <h3 className="text-base font-bold mb-2 hover:text-secondary transition-colors" style={{ color: "var(--color-text-dark)" }}>
                          {c.title}
                        </h3>
                      </Link>

                      <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--color-text-light)" }}>
                        {c.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xl font-bold text-secondary">
                          {c.price === 0 ? "Free" : `₹${c.price}`}
                        </p>
                        <span className="text-xs px-2.5 py-1 rounded-full capitalize" style={{ backgroundColor: "var(--color-border)", color: "var(--color-text-light)" }}>
                          {c.category}
                        </span>
                      </div>

                      <button
                        onClick={() => handleEnroll(c._id)}
                        className="btn btn-secondary w-full text-sm py-2"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}