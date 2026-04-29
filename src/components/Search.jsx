import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import { Loader2, Briefcase } from "lucide-react";

const Search = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initial Fetch
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query = "", sortBy = "") => {
    setLoading(true);
    try {
      let url = "";

      // Search by title
      if (query && query.trim() !== "") {
        url = `http://localhost:8080/findjob/${query}`;
      }
      // Sort by salary
      else if (sortBy === "salary") {
        url = "http://localhost:8080/findjob/salary";
      }
      // Sort by experience
      else if (sortBy === "experience") {
        url = "http://localhost:8080/findjob/exp";
      }
      // all jobs
      else {
        url = "http://localhost:8080/alljobs";
      }

      const response = await axios.get(url);
      setPost(response.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setPost([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Explore Opportunities
          </h1>
          <p className="text-slate-500 mt-2">
            Find your next role in tech
          </p>
        </div>

        <SearchBar onSearch={fetchJobs} />

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {post.length > 0 ? (
              post.map((p) => (
                <div
                  key={p.postId}
                  className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Briefcase size={24} />
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {p.postProfile}
                  </h2>

                  <p className="text-slate-500 mt-3 line-clamp-2 text-sm leading-relaxed">
                    {p.postDesc}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Exp: {p.reqExperience} Years
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Salary: {p.salary} 
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.postTechStack?.map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full mt-8 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md"
                    onClick={() => navigate(`/jobdetail/${p.postId}`)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400 text-lg">
                  No jobs found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;