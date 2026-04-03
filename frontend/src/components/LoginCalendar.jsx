import { useState, useEffect } from "react";
import api from "../api/api";

export default function LoginCalendar() {
  const [user, setUser] = useState(null);
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    api.get("/auth/me").then((res) => setUser(res.data)).catch(() => {});
  }, []);

  if (!user) return null;

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateLogged = (day) => {
    if (!user.loginDates) return false;
    return user.loginDates.some((loginDate) => {
      const d = new Date(loginDate);
      return (
        d.getDate() === day &&
        d.getMonth() === month.getMonth() &&
        d.getFullYear() === month.getFullYear()
      );
    });
  };

  const daysInMonth = getDaysInMonth(month);
  const firstDay = getFirstDayOfMonth(month);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = month.toLocaleString("default", { month: "long", year: "numeric" });

  const handlePrevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🔥 Login Streak</h3>
        <p className="text-4xl font-extrabold text-orange-500">{user.streak || 0}</p>
        <p className="text-sm text-gray-600">days in a row</p>
      </div>

      {/* Calendar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            ←
          </button>
          <h4 className="font-semibold text-gray-800">{monthName}</h4>
          <button
            onClick={handleNextMonth}
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            →
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition ${
                day === null
                  ? ""
                  : isDateLogged(day)
                  ? "bg-green-500 text-white font-bold shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center">
        ✅ Green days = Login tracked
      </p>
    </div>
  );
}
