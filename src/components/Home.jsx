import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-blue-600 uppercase bg-blue-100/60 backdrop-blur rounded-full"
          >
            Streamlining Careers
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Hire
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Flow
            </span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10">
            The intelligent workspace where your next career move finds you.
            Clean, fast, and built for the modern professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button
              onClick={() => navigate("/alljobs")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-300 hover:-translate-y-1 transition-all"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="px-8 py-4 bg-white/70 backdrop-blur-md text-slate-700 border border-white/40 font-bold rounded-2xl hover:bg-white transition-all"
            >
              Post a Listing
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full py-12 bg-white/40 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30">
            <StatItem label="Active Users" value="24k+" />
            <StatItem label="Tech Partners" value="180+" />
            <StatItem label="Daily Postings" value="1.2k" />
            <StatItem label="Success Rate" value="98%" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gradient-to-b from-white/50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="✨"
            title="Smart Matching"
            desc="Our algorithms align your unique skill set with the highest-paying opportunities."
          />
          <FeatureCard
            icon="🔒"
            title="Secure Apply"
            desc="Your data is encrypted. Apply to top-tier firms with total peace of mind."
          />
          <FeatureCard
            icon="📊"
            title="Flow Analytics"
            desc="Track every step of your application with real-time status updates."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-black mb-4 tracking-tighter">HireFlow</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Making the job market move at the speed of light.
              </p>
            </div>

            <FooterList title="Product" links={["Browse Jobs", "Companies", "Salaries", "Pricing"]} />
            <FooterList title="Company" links={["About Us", "Careers", "Blog", "Contact"]} />
            <FooterList title="Legal" links={["Privacy Policy", "Terms", "Cookies"]} />
          </div>

          <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2026 HireFlow</p>
            <div className="flex gap-6 text-slate-400">
              <span className="hover:text-blue-400 cursor-pointer">Twitter</span>
              <span className="hover:text-blue-400 cursor-pointer">LinkedIn</span>
              <span className="hover:text-blue-400 cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-3xl font-black text-slate-900">{value}</p>
    <p className="text-xs font-bold text-slate-500 uppercase mt-1">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-10 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/30 shadow-md hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300 group hover:-translate-y-2">
    <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-300">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FooterList = ({ title, links }) => (
  <div>
    <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-blue-400">{title}</h4>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link} className="text-slate-400 text-sm hover:text-white cursor-pointer">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

export default Home;