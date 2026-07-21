import React, { useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/signin", form);
      if (res.data.success) {
        navigate(res.data.redirectTo);
      }
      setMessage(res.data.message || "Signin successful");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white text-center px-8 my-6 py-6 max-w-md mx-auto rounded-xl shadow-2xl">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="mb-4">Log in to your account.</p>

      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="w-3/4 mb-2">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`border p-2 w-full rounded-lg focus:outline-none hover:border-green-500`}
            required
          />
        </div>

        {/* Password */}
        <div className="w-3/4 mb-2">
          <div className="relative w-full">
            <input
              type={!showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className={`border p-2 w-full pr-10 rounded-lg focus:outline-none hover:border-green-500`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {message && (
          <p
            className={`mt-2 text-sm font-medium ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="bg-blue-500 text-white p-2 my-4 w-3/4 rounded-lg flex items-center justify-center "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-4">
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
