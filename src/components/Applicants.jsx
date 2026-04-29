import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Users, 
  Briefcase, 
  Mail, 
  Phone, 
  ExternalLink, 
  Calendar, 
  ArrowLeft, 
  Search,
  ChevronRight,
  FileText,
  Loader2
} from "lucide-react";

export default function Applicants() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingJobs, setFetchingJobs] = useState(true);

  // 1 Fetch all jobs initially
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/alljobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setFetchingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  // 2 Fetch applicants for a specific job ID
  const viewApplicants = async (job) => {
    setSelectedJob(job);
    setLoading(true);
    try {
      // Using your @PostMapping("findrecord/{id}")
      const response = await axios.post(`http://localhost:8080/findrecord/${job.postId}`);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingJobs) {
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
            <h1 className="text-2xl font-bold text-gray-800">Application Manager</h1>
            <p className="text-gray-500">Track candidates across your active listings</p>
          </div>
          <button 
            onClick={() => navigate("/rhome")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: JOB LIST  */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-1">Active Roles</h2>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {jobs.map((job) => (
                <div 
                  key={job.postId}
                  onClick={() => viewApplicants(job)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedJob?.postId === job.postId 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100" 
                    : "bg-white border-gray-100 hover:border-blue-300 text-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold truncate">{job.postProfile}</p>
                      <p className={`text-xs ${selectedJob?.postId === job.postId ? "text-blue-100" : "text-gray-400"}`}>
                        ID: #{job.postId}
                      </p>
                    </div>
                    <ChevronRight size={18} opacity={0.5} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: APPLICANTS TABLE  */}
          <div className="lg:col-span-8">
            {!selectedJob ? (
              <div className="bg-white h-[60vh] rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 text-center p-10">
                <Search size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Select a job from the left to view applicants</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                  <h2 className="font-bold text-gray-800 flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    Applicants for {selectedJob.postProfile}
                  </h2>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    {applicants.length} Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
                  ) : applicants.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                          <th className="px-6 py-4">Candidate</th>
                          <th className="px-6 py-4">Experience</th>
                          <th className="px-6 py-4">Applied On</th>
                          <th className="px-6 py-4">Resume</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {applicants.map((app) => (
                          <tr key={app.applicationId} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-gray-800">{app.userName}</p>
                              <div className="flex flex-col gap-1 mt-1">
                                <span className="flex items-center gap-1 text-xs text-gray-500"><Mail size={12} /> {app.userEmail}</span>
                                <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={12} /> {app.userPhone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">
                                {app.userExperience} Years
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-gray-500">
                               {new Date(app.appliedTime).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <a 
                                href={app.resumeLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold text-xs"
                              >
                                <FileText size={14} /> View <ExternalLink size={12} />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-20 text-center text-gray-400 italic">No applications found for this role yet.</div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}