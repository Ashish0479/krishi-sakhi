import farmland from "../assets/farmland.jpg";
import { useNavigate } from "react-router-dom";

export default function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div
        className="min-h-[70vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${farmland})` }}
      >
        <div className="bg-black/50 text-white p-10 rounded-2xl max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-4">Learn More About Krishi-Sakhi 🌱</h1>
          <p className="text-lg">
            Discover how technology and tradition unite to empower farmers with smart
            agricultural solutions.
          </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="py-20 px-6 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">What is Krishi-Sakhi?</h2>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed text-center">
          Krishi-Sakhi is an AI-powered agricultural assistant designed to help
          farmers make informed decisions about their crops. From weather updates
          to personalized crop recommendations, we bring smart technology to the
          heart of farming.
        </p>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features 🌾</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-xl font-semibold mb-3">🌦 Real-Time Weather</h3>
            <p>Get instant weather updates to plan your farming schedule wisely.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-xl font-semibold mb-3">🌱 Crop Guidance</h3>
            <p>Receive AI-based recommendations on what to grow and when.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-xl font-semibold mb-3">📊 Analytics Dashboard</h3>
            <p>Track farm performance with smart analytics and predictive insights.</p>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div
        className="min-h-[60vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${farmland})` }}
      >
        <div className="bg-green-800/70 text-white p-10 rounded-2xl max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission 🌍</h2>
          <p className="text-lg leading-relaxed">
            At Krishi-Sakhi, our mission is to empower farmers with the right
            tools, data, and knowledge to enhance productivity, reduce risks,
            and improve sustainability in agriculture.
          </p>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <div className="py-20 px-6 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Why Farmers Love Us ❤️</h2>
        <ul className="max-w-4xl mx-auto text-lg space-y-4 list-disc list-inside">
          <li>Easy-to-use platform, even for first-time smartphone users.</li>
          <li>Affordable solutions tailored for small and marginal farmers.</li>
          <li>AI-driven insights for better crop planning and risk reduction.</li>
          <li>Community-driven knowledge sharing.</li>
        </ul>
      </div>

      {/* CTA SECTION */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming? 🚜</h2>
        <p className="text-lg mb-8">
          Join Krishi-Sakhi today and take the first step toward smarter farming.
        </p>
        <button
          className="px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-green-100 transition"
          onClick={() => navigate("/signUp")}
        >
          Get Started
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-green-700 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Krishi-Sakhi. All rights reserved.</p>
      </footer>
    </div>
  );
}
