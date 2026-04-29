import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import JobDetail from "./components/Jobdetail";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import AdminLogin from "./components/Admin";
import RecruiterHome from "./components/RecuriterHome";
import JobForm from "./components/JobForm";
import EditJob from "./components/EditJob";
import Applicants from "./components/Applicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/alljobs" element={<Search />} />
        <Route path="/jobdetail/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/rHome" element={<RecruiterHome/>}/>
        <Route path="/addjob" element={<JobForm/>}/>
        <Route path="/editjob" element={<EditJob/>}/>
        <Route path="/applicants" element={<Applicants></Applicants>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;