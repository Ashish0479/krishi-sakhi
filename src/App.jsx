import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import FarmerDashboard from "./pages/dashboard2";
import Home from "./pages/Home";
import LearnMore from "./pages/learnMore";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<FarmerDashboard />} />
       <Route path="/learn-more" element={<LearnMore />} />
    </Routes>
  );
}
