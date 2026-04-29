import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Briefcase, 
  IndianRupee, 
  AlignLeft, 
  Code2, 
  Send, 
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function JobForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    postProfile: "",
    postDesc: "",
    reqExperience: 0,
    salary: 0,
    techStackString: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      postProfile: formData.postProfile,
      postDesc: formData.postDesc,
      reqExperience: parseInt(formData.reqExperience),
      salary: parseInt(formData.salary),
      postTechStack: formData.techStackString.split(",").map(s => s.trim()).filter(s => s !== "")
    };

    try {
      await axios.post("http://localhost:8080/addjob", payload);
      alert("Job Posted!");
      navigate("/rhome");
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Compact Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="hover:bg-blue-700 p-1 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">New Job Post</h1>
          </div>
          <span className="text-xs bg-blue-500 px-3 py-1 rounded-full text-blue-50 font-medium">Recruiter Portal</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Job Profile</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required name="postProfile" value={formData.postProfile} onChange={handleChange}
                    placeholder="Software Engineer"
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Exp (Years)</label>
                  <input
                    required type="number" name="reqExperience" value={formData.reqExperience} onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Salary (LPA)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input
                      required type="number" name="salary" value={formData.salary} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1 text-nowrap">Tech Stack (comma separated)</label>
                <div className="relative">
                  <Code2 className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required name="techStackString" value={formData.techStackString} onChange={handleChange}
                    placeholder="Java, Spring, React..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Description */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Job Description</label>
              <div className="relative flex-grow">
                <AlignLeft className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  required name="postDesc" value={formData.postDesc} onChange={handleChange}
                  placeholder="Enter role details..."
                  className="w-full h-full min-h-[150px] pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end border-t pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2 transition-all transform active:scale-95
                ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100"}`}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} />}
              {loading ? "Posting..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}