import { useEffect, useState } from "react";
import api from "../api/api";
import LoginCalendar from "../components/LoginCalendar";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/enrollments/me").then((res) => setEnrollments(res.data));
    api.get("/auth/me").then((res) => setUser(res.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] px-6 py-10 transition-colors duration-200">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold mb-1" style={{ color: "var(--color-text-dark)" }}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p style={{ color: "var(--color-text-light)" }}>Continue learning and maintain your streak!</p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {/* Calendar - left side */}
        <div className="lg:col-span-1">
          <LoginCalendar />
        </div>

        {/* Main content - right side */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>📚 My Courses</h2>

          {enrollments.length === 0 ? (
            <div className="card rounded-2xl p-12 text-center">
              <p className="text-lg mb-4" style={{ color: "var(--color-text-light)" }}>No courses enrolled yet</p>
              <a
                href="/courses"
                className="btn btn-primary inline-block"
              >
                Explore Courses
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((e) => (
                <div
                  key={e._id}
                  className="card rounded-2xl overflow-hidden group p-0"
                >
                  {/* Course Header */}
                  <div className="bg-gradient-to-r from-primary via-primary-light to-secondary h-28 group-hover:opacity-90 transition-opacity"></div>

                  {/* Course Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold mb-3 line-clamp-2" style={{ color: "var(--color-text-dark)" }}>
                      {e.courseId.title}
                    </h3>

                    <div className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-semibold" style={{ color: "var(--color-text-light)" }}>Progress</span>
                        <span className="text-xs font-bold text-secondary">{e.progressPercent}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${e.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {e.progressPercent === 100 ? (
                      <div className="text-center py-2 bg-success/10 dark:bg-success/20 rounded-lg">
                        <p className="text-success font-bold text-sm">✅ Completed!</p>
                      </div>
                    ) : (
                      <a
                        href={`/courses/${e.courseId.slug}`}
                        className="btn btn-primary block text-center w-full text-sm py-2"
                      >
                        Continue Learning
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
