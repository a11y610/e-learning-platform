import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    api.get("/enrollments/me").then((res) => setEnrollments(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        My Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrollments.map((e) => (
          <div
            key={e._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {e.courseId.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Progress: {e.progressPercent}%
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${e.progressPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
