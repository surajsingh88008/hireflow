import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle, Edit3, Users, LogOut, LayoutDashboard } from "lucide-react"; // Using Lucide icons for a premium feel

export function RecruiterHome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auth Guard: If no recruiter email found, redirect to login
    const user = localStorage.getItem("recruiterMail");
    if (!user) {
      navigate("/rhome");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("recruiterMail");
    navigate("/login");
  };

  const navItems = [
    { title: "Create Job", path: "/addjob", icon: <PlusCircle className="w-6 h-6 mb-2 text-blue-600" />, desc: "Post a new vacancy for candidates" },
    { title: "Edit Job", path: "/editjob", icon: <Edit3 className="w-6 h-6 mb-2 text-indigo-600" />, desc: "Modify your existing job listings" },
    { title: "View Applicants", path: "/applicants", icon: <Users className="w-6 h-6 mb-2 text-purple-600" />, desc: "Track and manage job applications" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                Hire<span className="text-blue-600">Sync</span>
              </span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm text-gray-500 font-medium italic">
                {localStorage.getItem("recruiterMail")}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-full border border-gray-200 transition-all duration-200 font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Manage your recruitment pipeline and active listings.</p>
        </header>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-4 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  {item.desc}
                </p>
              </div>
              {/* Subtle accent bar at the bottom */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default RecruiterHome;