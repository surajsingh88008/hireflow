import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    userGmail: "",
    userPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text();

      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        setError(data);
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      <Navbar />

      <div className="flex justify-center items-center pt-20">

        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSignup}>

            <input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="email"
              name="userGmail"
              placeholder="Email"
              value={formData.userGmail}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              value={formData.userPassword}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>

          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;