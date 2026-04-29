import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Loader2, ArrowLeft, Link as LinkIcon, CheckCircle2 } from "lucide-react"; 

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resumeLink: "", // Now a string for the link
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/job/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const applicationData = {
      jobId: parseInt(id),
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      userExperience: parseInt(formData.experience),
      resumeLink: formData.resumeLink, // Sending the link string directly
      appliedTime: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:8080/applicantdata", applicationData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Success! Your application has been sent.");
      setIsModalOpen(false);
      setFormData({ name: "", email: "", phone: "", experience: "", resumeLink: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Jobs
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-slate-100">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {job.postProfile}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-slate-500 flex-wrap">
  
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold">
                {job.reqExperience}+ Years Exp
              </span>

              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                💰 ₹ {job.salary}
              </span>

              <span className="flex items-center gap-1">Full-time</span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{job.postDesc}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Required Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {job.postTechStack?.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <div className="pt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-95"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Application Form</h2>
              <p className="text-slate-500 text-sm mt-1">Applying for {job.postProfile}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Resume Link (Google Drive/Dropbox)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input
                    required
                    type="url"
                    name="resumeLink"
                    placeholder="https://drive.google.com/..."
                    value={formData.resumeLink}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Experience (Years)</label>
                  <input
                    required
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" size={18}/> : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;