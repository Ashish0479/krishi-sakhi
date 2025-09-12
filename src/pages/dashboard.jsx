import { useState } from "react";
import {
  CloudRain,
  Camera,
  TrendingUp,
  Bell,
  MessageCircle,
  User,
  LogOut,
  Landmark,
  Menu,
  X,
} from "lucide-react";
import farmland from "../assets/farmland.jpg";

export default function FarmerDashboard() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex relative"
      style={{ backgroundImage: `url(${farmland})` }}
    >
      {/* Light Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white flex flex-col z-20 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          🌾 Krishi Sakhi
        </div>
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">📊 Dashboard</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">🌱 Crop Tracking</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">📸 Crop Health</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">📊 Mandi Prices</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">🏛 Govt Schemes</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">⏰ Reminders</a>
          <a href="#" className="block py-2 px-3 rounded-md hover:bg-green-700">💬 Chatbot</a>
        </nav>
        <div className="p-4 border-t border-green-700">
          <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-green-700">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 relative z-10">
        {/* Navbar */}
        <header className="bg-white/90 shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Farmer Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-200"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Notifications */}
            <button className="relative hidden md:block">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                2
              </span>
            </button>

            {/* Profile */}
            <div className="hidden md:flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md">
              <User className="w-6 h-6 text-gray-700" />
              <span className="font-medium">Ashish</span>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 space-y-6 overflow-y-auto flex-1 bg-white/90">
          {/* Alerts */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <CloudRain className="text-blue-500 w-8 h-8 mr-3" />
              <div>
                <h2 className="font-semibold">Weather Alert</h2>
                <p className="text-sm text-gray-600">
                  🌧 Rain expected tomorrow, avoid spraying pesticides.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <Bell className="text-yellow-500 w-8 h-8 mr-3" />
              <div>
                <h2 className="font-semibold">Reminder</h2>
                <p className="text-sm text-gray-600">Fertilizer application due in 2 days.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <TrendingUp className="text-green-500 w-8 h-8 mr-3" />
              <div>
                <h2 className="font-semibold">Market Update</h2>
                <p className="text-sm text-gray-600">Wheat selling ₹2300/qtl in Karnal mandi.</p>
              </div>
            </div>
          </section>

          {/* Crop Tracking */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">🌱 Crop Tracking</h2>
            <select
              className="border p-2 rounded-md mb-4"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option>Wheat</option>
              <option>Rice</option>
              <option>Maize</option>
              <option>Sugarcane</option>
            </select>
            <div className="bg-green-100 rounded-lg p-4">
              <p><strong>Crop:</strong> {selectedCrop}</p>
              <p><strong>Stage:</strong> Vegetative Growth</p>
              <p><strong>Next Action:</strong> Irrigation in 3 days</p>
            </div>
          </section>

          {/* Crop Health */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">📸 Crop Health Check</h2>
            <div className="flex items-center space-x-4">
              <Camera className="w-10 h-10 text-gray-500" />
              <input type="file" accept="image/*" className="border rounded p-2" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Upload a photo of your crop to check for diseases.
            </p>
          </section>

          {/* Mandi Prices */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">📊 Mandi Prices</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-3 py-2">Crop</th>
                  <th className="border px-3 py-2">Price (₹/qtl)</th>
                  <th className="border px-3 py-2">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">Wheat</td>
                  <td className="border px-3 py-2">2300</td>
                  <td className="border px-3 py-2">Karnal</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Rice</td>
                  <td className="border px-3 py-2">2800</td>
                  <td className="border px-3 py-2">Kurukshetra</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Govt Schemes */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Landmark className="w-6 h-6 mr-2 text-green-600" /> Govt Schemes
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>PM-KISAN:</strong> ₹6000/year direct income support.</li>
              <li><strong>Soil Health Card:</strong> Free soil testing for better fertilizer use.</li>
              <li><strong>Kisan Credit Card:</strong> Easy credit access for farmers.</li>
            </ul>
          </section>

          {/* AI Chatbot */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-green-600" /> Ask Krishi Sakhi
            </h2>
            <div className="border rounded-lg p-3 h-40 overflow-y-auto mb-3 bg-gray-50">
              <p className="text-sm text-gray-600"><strong>Farmer:</strong> Aaj irrigation karna hai kya?</p>
              <p className="text-sm text-green-700"><strong>AI:</strong> Nahi, kal barish hone wali hai. Abhi rok lo.</p>
            </div>
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full border rounded-md p-2"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
