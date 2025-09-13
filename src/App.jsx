import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import FarmerDashboard from "./pages/dashboard2";
import Home from "./pages/Home";
import LearnMore from "./pages/learnMore";
import { Routes, Route } from "react-router-dom";
import CommunityPage from "./pages/dashPages/Community";
import GetPremium from "./pages/home pages/premium";
//import AboutUs from "./pages/home pages/aboutUs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<FarmerDashboard />} />
       <Route path="/learn-more" element={<LearnMore />} />
       <Route path="/premium" element={<GetPremium />} />
        <Route path="/community" element={<CommunityPage />} />
         {/* <Route path="/about" element={<AboutUs />} /> */}

    </Routes>
  );
}
