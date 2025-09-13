import React from "react";
import { ChevronDown } from "lucide-react";
import farmland from "../../assets/farmland.jpg";
import { useNavigate } from "react-router-dom";

export default function GetPremium() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${farmland})` }}
    >
      {/* Gradient overlay for parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-10 h-16 px-6 flex items-center justify-between bg-green-600 text-white shadow-md">
        <div className="text-2xl font-extrabold flex items-center gap-2">
          🌾 <span onClick={() => navigate("/")}>Krishi-Sakhi</span>
        </div>
        
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/95 rounded-2xl shadow-2xl p-10 max-w-3xl w-full text-center backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-green-700 mb-6">Unlock Premium Features</h1>
          <p className="text-gray-700 text-lg mb-8">
            Supercharge your farming journey with advanced tools, personalized insights, and early access to new features!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-green-50 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-2">🔓 Full Crop Insights</h2>
              <p className="text-gray-700">Get detailed growth patterns, weather forecasts, and irrigation schedules.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-2">🚀 Faster AI Suggestions</h2>
              <p className="text-gray-700">Receive smart crop management tips in real-time.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-2">🎯 Progress Tracking</h2>
              <p className="text-gray-700">Monitor crop health, stage progress, and productivity reports.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-2">🎁 Early Feature Access</h2>
              <p className="text-gray-700">Be the first to try new AI tools and platform updates.</p>
            </div>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Upgrade to Premium - ₹199/month
          </button>

          <p className="text-sm text-gray-500 mt-4">Cancel anytime. 7-day money-back guarantee.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-green-700/95 text-white p-6 text-center">
        <p>🌾 Krishi Sakhi &copy; 2025. All Rights Reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
