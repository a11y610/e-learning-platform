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

  const monthName = month.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
  };

  return (
    <div className="card sticky top-24">
      {/* Streak Display */}
      <div className="text-center mb-8 pb-6 border-b border-neutral-200">
        <div className="text-5xl mb-3">🔥</div>
        <h3 className="text-2xl font-bold text-primary mb-2">Login Streak</h3>
        <div className="text-5xl font-extrabold text-warning mb-2">
          {user.streak || 0}
        </div>
        <p className="text-sm text-text-light">
          {user.streak === 1 ? "day in a row" : "days in a row"}
        </p>
      </div>

      {/* Calendar */}
      <div>
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="flex items-center justify-center w-8 h-8 rounded-base bg-neutral-100 hover:bg-secondary hover:text-white transition font-bold text-primary"
            aria-label="Previous month"
          >
            ←
          </button>
          <h4 className="font-bold text-primary text-center flex-1">
            {monthName}
          </h4>
          <button
            onClick={handleNextMonth}
            className="flex items-center justify-center w-8 h-8 rounded-base bg-neutral-100 hover:bg-secondary hover:text-white transition font-bold text-primary"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1.5 mb-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-text-light uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center text-xs font-semibold rounded-base transition-all ${
                day === null
                  ? "bg-transparent"
                  : isDateLogged(day)
                  ? "bg-success text-white shadow-md font-bold"
                  : "bg-neutral-100 text-text-light hover:bg-neutral-200"
              }`}
              title={
                day && isDateLogged(day)
                  ? `Logged in on ${day} ${monthName.split(" ")[0]}`
                  : ""
              }
            >
              {day && day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <div className="flex items-center gap-2 text-xs text-text-light">
          <div className="w-3 h-3 rounded-sm bg-success"></div>
          <span>Days you logged in</span>
        </div>
      </div>

      {/* Motivational Message */}
      {user.streak === 0 ? (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-base text-center">
          <p className="text-xs text-primary font-semibold">
            🎯 Come back tomorrow to start your streak!
          </p>
        </div>
      ) : user.streak < 7 ? (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-base text-center">
          <p className="text-xs text-warning font-semibold">
            🚀 Great job! Keep it up!
          </p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-base text-center">
          <p className="text-xs text-success font-semibold">
            ⭐ Amazing streak! Don't break it!
          </p>
        </div>
      )}
    </div>
  );
}
