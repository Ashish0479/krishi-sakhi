import farmland from '../assets/farmland.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { useTranslation } from "react-i18next";

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.signup'), path: '/signUp' },
    { label: t('nav.login'), path: '/login' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
    { label: t('nav.premium'), path: '/premium' },
  ];

  return (
    <>
      <nav className="flex items-center justify-between h-16 px-6 font-mono shadow-md relative bg-gradient-to-r from-green-600 via-teal-600 to-green-700 text-white">
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          <p className="tracking-wide">Krishi-Sakhi</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-sm font-semibold px-20">
            {navItems.map((item) => (
              <li
                key={item.path}
                className="hover:text-yellow-300 cursor-pointer transition-colors"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-white text-green-700 rounded px-2 py-1 text-sm"
          >
            <option value="en">EN</option>
            <option value="ml">മലയാളം</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-white text-green-700 rounded px-2 py-1 text-sm"
          >
            <option value="en">EN</option>
            <option value="ml">ML</option>
          </select>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-16 right-4 w-48 bg-white text-green-800 shadow-lg rounded-lg p-4 md:hidden z-50"
            >
              <ul className="flex flex-col gap-4 text-sm font-bold">
                {navItems.map((item) => (
                  <li
                    key={item.path}
                    className="hover:text-green-600 cursor-pointer"
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <div
        className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center p-6"
        style={{ backgroundImage: `url(${farmland})` }}
      >
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-3xl text-center text-white">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-lg mb-8 leading-relaxed">{t('hero.desc')}</p>
          <div className="flex justify-center gap-6">
            <button className="px-6 py-3 rounded-full bg-white text-green-700 font-semibold hover:bg-green-100 transition" onClick={() => navigate('/login')}>
              {t('hero.getStarted')}
            </button>
            <button className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 transition font-semibold" onClick={() => navigate('/learn-more')}>
              {t('hero.learnMore')}
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 px-6 bg-white text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">{t('features.title')}</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 shadow-xl rounded-xl bg-green-50 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">{t('features.weather')}</h3>
            <p>Get accurate real-time weather insights tailored to your region.</p>
          </div>
          <div className="p-6 shadow-xl rounded-xl bg-green-50 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">{t('features.crop')}</h3>
            <p>AI-powered crop recommendations based on soil, climate, and season.</p>
          </div>
          <div className="p-6 shadow-xl rounded-xl bg-green-50 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">{t('features.analytics')}</h3>
            <p>Track your farm’s performance and get predictive insights.</p>
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div
        className="min-h-[70vh] bg-fixed bg-cover bg-center flex items-center justify-center p-10"
        style={{ backgroundImage: `url(${farmland})` }}
      >
        <div className="bg-black/50 text-white p-10 rounded-2xl max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">{t('mission.title')}</h2>
          <p className="text-lg leading-relaxed">{t('mission.desc')}</p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-20 px-6 bg-gray-50 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">{t('how.title')}</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">{t('how.step1')}</h3>
            <p>Create your profile and enter details about your crops and soil conditions.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">{t('how.step2')}</h3>
            <p>Receive AI-powered recommendations and alerts for farming activities.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">{t('how.step3')}</h3>
            <p>Use the recommendations to improve yield, save costs, and grow sustainably.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">{t('how.step4')}</h3>
            <p>Analyze your farm’s growth and get predictive analytics for future planning.</p>
          </div>
        </div>
      </div>

      {/* FINAL SECTION */}
      <div
        className="min-h-[60vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${farmland})` }}
      >
        <div className="bg-white/30 backdrop-blur-lg text-black p-10 rounded-2xl max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">{t('join.title')}</h2>
          <p className="text-lg leading-relaxed mb-6">{t('join.desc')}</p>
          <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition " onClick={() => navigate('/signUp')}>
            {t('join.btn')}
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Krishi-Sakhi. All rights reserved.</p>
      </footer>
    </>
  );
}
