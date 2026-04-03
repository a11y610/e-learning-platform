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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-10">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">Continue learning and maintain your streak!</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {/* Calendar - left side */}
        <div className="lg:col-span-1">
          <LoginCalendar />
        </div>

        {/* Main content - right side */}
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">📚 My Courses</h2>

          {enrollments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No courses enrolled yet</p>
              <a
                href="/courses"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Explore Courses
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((e) => (
                <div
                  key={e._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Course Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 group-hover:from-blue-600 group-hover:to-purple-600 transition"></div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2">
                      {e.courseId.title}
                    </h3>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-blue-600">{e.progressPercent}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${e.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {e.progressPercent === 100 ? (
                      <div className="text-center py-2 bg-green-100 rounded-lg">
                        <p className="text-green-700 font-bold text-sm">✅ Completed!</p>
                      </div>
                    ) : (
                      <a
                        href={`/courses/${e.courseId.slug}`}
                        className="block text-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm mt-2"
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
