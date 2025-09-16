import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { fetchWeather } from "../redux/slices/weatherSlice";
import { sendMessage } from "../redux/slices/chatbotSlice";
import { analyzeCropHealth, resetCropHealth } from "../redux/slices/cropHealthSlice";
import { fetchUserProfile } from "../redux/slices/profileSlice";
import ReactMarkdown from "react-markdown";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic, MicOff } from "lucide-react"; 

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
  Sprout,
  Search,
  ChevronDown,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import farmland from "../assets/farmland.jpg";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: TrendingUp },
  { key: "crop-tracking", label: "Crop Tracking", icon: Sprout },
  { key: "crop-health", label: "Crop Health", icon: Camera },
  { key: "mandi", label: "Mandi Prices", icon: TrendingUp },
  { key: "schemes", label: "Govt Schemes", icon: Landmark },
  { key: "reminders", label: "Reminders", icon: Bell },
  { key: "chatbot", label: "Chatbot", icon: MessageCircle },
  { key: "Community", label: "Community", icon: User },
];

export default function FarmerDashboard() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState("");
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [isManualWeatherInput, setIsManualWeatherInput] = useState(false);
  const [manualCity, setManualCity] = useState('');
  const weatherInfo = useSelector((state) => state.weather.data);
  const profile = useSelector((state) => state.profile.user);


  const { user } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({});


//speech






  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

   if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }



  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  async function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  }

  const chatbotResponse = useSelector((state) => state.chatbot.messages.slice(-1)[0]?.aiReply || '');
  const { loading: chatbotLoading } = useSelector((state) => state.chatbot);
  const [inputText, setInputText] = useState('');

  const cityMain = navigator.geolocation.getCurrentPosition((pos) => {
    dispatch(fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }));
  },
    (error) => {
      console.error('Geolocation failed, falling back to default:', error);
      dispatch(fetchWeather({ cityMain: "munnar,kerala" }));
    });

  const handleChatSubmit = () => {
    if (inputText.trim()) {
      dispatch(sendMessage({ message: inputText, image: null, weatherInfo, profile, city: cityMain }));
      setInputText('');
      resetTranscript();

    }
  };

   
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState("English");

  const { loading, cropHealthReport, error } = useSelector((state) => state.cropHealth);

  const handleCropHealthSubmit = (e) => {
    e.preventDefault();
    if (image) {
      dispatch(analyzeCropHealth({ imageFile: image, language }));
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const mandiSparkline = useMemo(
    () => [20, 28, 24, 30, 34, 31, 36, 40, 37, 42, 45],
    []
  );

  const { data: weather, loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather);

  useEffect(() => {
    if (!manualCity) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }));
        },
        (error) => {
          console.error('Geolocation failed, falling back to default:', error);
          dispatch(fetchWeather({ city: "munnar,kerala" }));
        }
      );
    }
  }, [dispatch, manualCity]);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex relative"
      style={{ backgroundImage: `url(${farmland})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 pointer-events-none" />

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-green-700/95 text-white flex flex-col z-30 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-6 h-16 flex items-center justify-between border-b border-white/10">
          <div className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            🌾 <span>Krishi Sakhi</span>
          </div>

          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => {
                  key === "chatbot" ? setChatbotOpen(true) : console.log("Navigate:", key);
                  key === "Community" ? navigate("/community") : null;
                  setActive(key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition
                ${isActive ? "bg-white/15 ring-1 ring-white/20" : "hover:bg-white/10"}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col ml-0 md:ml-72 relative z-10">
        <header className="h-16 px-4 md:px-6 flex items-center justify-between bg-white/90 shadow-sm">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-green-800">
              Farmer Dashboard
            </h1>

            <div className="hidden lg:flex items-center gap-2 ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search crops, tasks, prices…"
                  className="pl-9 pr-3 py-2 w-[280px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="relative" ref={notifRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNotifOpen((o) => !o);
                  setProfileOpen(false);
                }}
                className="relative p-2 rounded-md hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
                  3
                </span>
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">Notifications</p>
                    </div>
                    <ul className="max-h-72 overflow-auto">
                      <li className="px-4 py-3 hover:bg-gray-50 text-sm">
                        🌧 Rain expected tomorrow. Avoid spraying pesticides.
                      </li>
                      <li className="px-4 py-3 hover:bg-gray-50 text-sm">
                        ⏰ Fertilizer application due in 2 days.
                      </li>
                      <li className="px-4 py-3 hover:bg-gray-50 text-sm">
                        📈 Wheat @ ₹2300/qtl in Karnal.
                      </li>
                    </ul>
                    <div className="px-4 py-2 border-t">
                      <button className="text-green-700 text-sm font-medium hover:underline">
                        View all
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen((o) => !o);
                  setNotifOpen(false);
                }}
                className="ml-1 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 text-white grid place-items-center">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold">{formData.name}</span>
                  <span className="text-xs text-gray-500">{formData.email}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
                  >
                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2" onClick={() => navigate("/profile")}>
                      <User className="w-4 h-4" /> View Profile
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <div className="border-t" />
                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-red-600 flex items-center gap-2" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <HoverCard>
              <div className="p-4">
                <div className="flex items-center bg-white p-4 rounded-lg shadow">
                  <CloudRain className="text-blue-500 w-8 h-8 mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold">Weather Alert</h2>
                      <button
                        onClick={() => setIsManualWeatherInput(!isManualWeatherInput)}
                        className="text-gray-500 hover:text-green-600 transition"
                        aria-label="Set custom city"
                      >
                        <Search size={16} />
                      </button>
                    </div>

                    {isManualWeatherInput ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={manualCity}
                          onChange={(e) => setManualCity(e.target.value)}
                          placeholder="Enter city name..."
                          className="border rounded-md text-sm px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && manualCity) {
                              dispatch(fetchWeather({ city: manualCity }));
                              setIsManualWeatherInput(false);
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            if (manualCity) {
                              dispatch(fetchWeather({ city: manualCity }));
                              setIsManualWeatherInput(false);
                            }
                          }}
                          className="bg-green-600 text-white text-sm px-3 py-1 rounded-md hover:bg-green-700 transition"
                        >
                          Set
                        </button>
                      </div>
                    ) : weatherLoading ? (
                      <p className="text-sm text-gray-600">Loading weather...</p>
                    ) : weatherError ? (
                      <p className="text-sm text-red-500">Error: {weatherError}</p>
                    ) : weather ? (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{weather.city}</span>
                        <br />
                        🌡 {weather.temp}°C — {weather.condition} ({weather.description})
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">No data available</p>
                    )}
                  </div>
                </div>
              </div>
            </HoverCard>

            <HoverCard>
              <div className="flex items-center">
                <Bell className="text-yellow-500 w-8 h-8 mr-3" />
                <div>
                  <h2 className="font-semibold">Reminder</h2>
                  <p className="text-sm text-gray-600">
                    Fertilizer application due in 2 days.
                  </p>
                </div>
              </div>
            </HoverCard>

            <HoverCard>
              <div className="flex items-center">
                <TrendingUp className="text-green-600 w-8 h-8 mr-3" />
                <div>
                  <h2 className="font-semibold">Market Update</h2>
                  <p className="text-sm text-gray-600">
                    Wheat selling ₹2300/qtl in Karnal mandi.
                  </p>
                </div>
              </div>
            </HoverCard>
          </section>

          <section className="bg-white/95 rounded-2xl shadow-sm border border-black/5 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold">🌱 Crop Tracking</h2>
              <div className="flex gap-2">
                <select
                  className="border rounded-lg px-3 py-2"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                >
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Maize</option>
                  <option>Sugarcane</option>
                </select>
                <button className="px-3 py-2 rounded-lg border hover:bg-gray-50">
                  Add Activity
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <MiniStat title="Stage" value="Vegetative Growth" />
              <MiniStat title="Next Action" value="Irrigation in 3 days" />
              <MiniStat title="Health Score" value="87%" accent="green" />
            </div>
            <div className="mt-5">
              <Sparkline data={mandiSparkline} label={`${selectedCrop} (last 10d)`} />
            </div>
          </section>

          <section className="bg-white/95 rounded-2xl shadow-sm border border-black/5 p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">📸 Crop Health Check</h2>

            <form
              onSubmit={handleCropHealthSubmit}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-10 h-10 text-gray-600" />
                <label className="border-2 border-dashed rounded-xl px-4 py-6 text-center text-gray-600 cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="text-sm">
                    <strong>Upload</strong> or drag image here
                    <div className="text-xs text-gray-500">
                      Detect diseases & get treatment
                    </div>
                  </div>
                </label>
              </div>
              {image && (
                <p className="text-sm text-green-700 font-medium">
                  ✅ Uploaded: {image.name}
                </p>
              )}


              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="English">English</option>
                <option value="Malayalam">Malayalam</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Photo"}
              </button>
            </form>

            {cropHealthReport && (
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 prose prose-sm max-w-none">
                <ReactMarkdown>{cropHealthReport}</ReactMarkdown>
              </div>
            )}

            {error && <p className="mt-4 text-red-600 font-medium">❌ {error}</p>}
          </section>

          <section className="bg-white/95 rounded-2xl shadow-sm border border-black/5 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold">📊 Mandi Prices</h2>
              <div className="flex gap-2">
                <select className="border rounded-lg px-3 py-2">
                  <option>Karnal</option>
                  <option>Kurukshetra</option>
                  <option>Hisar</option>
                </select>
                <select className="border rounded-lg px-3 py-2">
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Maize</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-green-50 text-left text-sm">
                    <th className="border px-3 py-2">Crop</th>
                    <th className="border px-3 py-2">Price (₹/qtl)</th>
                    <th className="border px-3 py-2">Location</th>
                    <th className="border px-3 py-2">Trend</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="hover:bg-gray-50">
                    <td className="border px-3 py-2">Wheat</td>
                    <td className="border px-3 py-2">2300</td>
                    <td className="border px-3 py-2">Karnal</td>
                    <td className="border px-3 py-2">
                      <TrendBadge up />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border px-3 py-2">Rice</td>
                    <td className="border px-3 py-2">2800</td>
                    <td className="border px-3 py-2">Kurukshetra</td>
                    <td className="border px-3 py-2">
                      <TrendBadge />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white/95 rounded-2xl shadow-sm border border-black/5 p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Landmark className="w-6 h-6 mr-2 text-green-600" /> Govt Schemes
            </h2>
            <ul className="space-y-3">
              <SchemeItem
                title="PM-KISAN"
                desc="₹6000/year direct income support."
              />
              <SchemeItem
                title="Soil Health Card"
                desc="Free soil testing for better fertilizer use."
              />
              <SchemeItem
                title="Kisan Credit Card"
                desc="Easy credit access for farmers."
              />
            </ul>
          </section>

          <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
              {chatbotOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="w-80 h-96 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2 bg-green-600 text-white">
                    <span className="font-semibold">🌾 Krishi Sakhi</span>
                    <button onClick={() => setChatbotOpen(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto bg-gray-50 text-sm space-y-2">
                    <div>
                      <p>
                        <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs mr-2">Krishi AI</span>
                        {chatbotResponse}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 border-t flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={listening ? SpeechRecognition.stopListening : () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}
                      className={`p-2 rounded-full border ${listening ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'} mr-1`}
                      title={listening ? 'Stop Listening' : 'Start Voice Input'}
                    >
                      {listening ? <Mic className="w-5 h-5 text-green-600 animate-pulse" /> : <MicOff className="w-5 h-5 text-gray-500" />}
                    </button>
                    <input
                      type="text"
                      placeholder="Type or speak your question..."
                      className="flex-1 border rounded-lg p-2 text-sm"
                      value={inputText || transcript}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleChatSubmit();
                        }
                      }}
                    />
                    <button
                      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                      onClick={handleChatSubmit}
                      disabled={chatbotLoading}
                    >
                      {chatbotLoading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative">
              <button
                onClick={() => setChatbotOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 shadow-xl text-white font-semibold hover:from-green-700 hover:to-green-600 transition transform hover:scale-105 animate-bounce relative overflow-hidden"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="hidden sm:block">Ask Krishi AI</span>
                <span className="absolute top-1 left-3 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                <span className="absolute bottom-2 right-4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></span>
                <span className="absolute top-3 right-6 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function HoverCard({ children }) {
  return (
    <motion.div
      initial={{ y: 2, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white/95 p-4 rounded-2xl shadow-sm border border-black/5"
    >
      {children}
    </motion.div>
  );
}

function MiniStat({ title, value, accent = "slate" }) {
  const accentMap = {
    green: "text-green-700 bg-green-50",
    slate: "text-slate-700 bg-slate-50",
  };
  return (
    <div className={`rounded-xl p-4 ${accentMap[accent]} border`}>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function TrendBadge({ up = true }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
    >
      {up ? "▲ Up" : "▼ Down"}
    </span>
  );
}

function SchemeItem({ title, desc }) {
  return (
    <li className="flex items-start justify-between gap-3 p-4 rounded-xl border hover:bg-gray-50">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
      <button className="px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-100">
        Apply
      </button>
    </li>
  );
}

function Sparkline({ data = [], label = "" }) {
  const w = 320;
  const h = 70;
  const pad = 6;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data
    .map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (data.length - 1 || 1);
      const y =
        h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-xs text-gray-500">sparkline</span>
      </div>
      <svg width={w} height={h} className="rounded-md bg-gradient-to-b from-white to-gray-50 border">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className="text-green-600"
        />
      </svg>
    </div>
  );
}