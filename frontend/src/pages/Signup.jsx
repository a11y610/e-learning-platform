import { useState } from "react";
import api from "../api/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/signup", form);
    localStorage.setItem("token", res.data.token);
    alert("Signup successful");
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-80"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Signup
      </button>
    </form>
  </div>
);

}