import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Briefcase, 
  IndianRupee, 
  AlignLeft, 
  Code2, 
  Save, 
  ArrowLeft, 
  Edit3, 
  Search,
  Loader2,
  X
} from "lucide-react";

export default function EditJob() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  //  Fetch all jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/alljobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setFetching(false);
    }
  };

  //  Handle input changes for the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob(prev => ({ ...prev, [name]: value }));
  };

  //  Handle the @PutMapping call
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload (Convert tech stack string back to List for Spring Boot)
    const payload = {
      ...selectedJob,
      reqExperience: parseInt(selectedJob.reqExperience),
      salary: parseInt(selectedJob.salary),
      postTechStack: Array.isArray(selectedJob.postTechStack) 
        ? selectedJob.postTechStack 
        : selectedJob.postTechStack.split(",").map(s => s.trim()).filter(s => s !== "")
    };

    try {
      const response = await axios.put("http://localhost:8080/jobpost", payload);
      if (response.data === "successfull") {
        alert("Job Updated Successfully!");
        setSelectedJob(null);
        fetchJobs(); // Refresh the list
      } else {
        alert("Update failed: " + response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating job.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Listings</h1>
            <p className="text-gray-500">Select a job to modify details</p>
          </div>
          <button 
            onClick={() => navigate("/rhome")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>

        {!selectedJob ? (
          /* --- JOB SELECTION GRID --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div 
                key={job.postId}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Briefcase size={20} />
                  </div>
                  <button 
                    onClick={() => setSelectedJob({
                      ...job, 
                      postTechStack: job.postTechStack.join(", ") //  string for editing
                    })}
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                </div>
                <h3 className="font-bold text-gray-800 text-lg truncate">{job.postProfile}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.postDesc}</p>
                <div className="flex gap-4 text-xs font-semibold text-gray-400">
                  <span>{job.reqExperience} Yrs Exp</span>
                  <span>₹{job.salary} LPA</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ---  EDIT FORM --- */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <Edit3 size={20} />
                <h2 className="font-bold">Editing: {selectedJob.postProfile}</h2>
              </div>
              <button onClick={() => setSelectedJob(null)} className="hover:bg-blue-700 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Job Profile</label>
                    <input
                      required name="postProfile" value={selectedJob.postProfile} onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Experience</label>
                      <input
                        required type="number" name="reqExperience" value={selectedJob.reqExperience} onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Salary (LPA)</label>
                      <input
                        required type="number" name="salary" value={selectedJob.salary} onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tech Stack</label>
                    <input
                      required name="postTechStack" value={selectedJob.postTechStack} onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                  <textarea
                    required name="postDesc" value={selectedJob.postDesc} onChange={handleChange}
                    className="w-full flex-grow min-h-[150px] p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                <button 
                  type="button" onClick={() => setSelectedJob(null)}
                  className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {loading ? "Saving..." : "Update Details"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}