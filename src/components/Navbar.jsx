import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail")
  );

  const userInitial = userEmail
    ? userEmail.charAt(0).toUpperCase()
    : "";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    setUserEmail(null); // 🔥 update UI
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-blue-100">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          HireFlow
        </h1>

        {/* Nav Links */}
        <div className="flex items-center gap-6">

          <button
            className="text-gray-700 font-medium hover:text-blue-600 transition"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          {userEmail ? (
            // ✅ Logged in UI
            <div className="flex items-center gap-4">

              {/* 🔵 User Icon */}
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">
                {userInitial}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>

            </div>
          ) : (
            // ❌ Not logged in
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;