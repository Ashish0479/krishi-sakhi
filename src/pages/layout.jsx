import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
//import logo from '../assets/logo.png'; // apna Krishi-Sakhi ka logo dalna

function LayoutKrishiSakhi({ children }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Sign Up', path: '/signup' },
    { label: 'Login', path: '/login' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between h-16 px-6 text-green-900 font-sans shadow-md relative bg-gradient-to-r from-green-300 via-teal-400 to-green-600">
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-xl font-bold cursor-pointer text-white"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="logo" className="h-12 w-auto drop-shadow-md" />
          <p className="tracking-wide">Krishi-Sakhi</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex gap-8 text-sm font-semibold text-white px-10">
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
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
              className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-lg p-4 md:hidden z-50"
            >
              <ul className="flex flex-col gap-4 text-sm font-bold text-green-800">
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

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        <div className="mt-8 border-t border-gray-300 bg-gradient-to-r from-green-300 via-teal-400 to-green-600 pt-4 text-center text-white text-sm">
          © {new Date().getFullYear()} Krishi-Sakhi 🌱 | Empowering Farmers with AI
        </div>
      </footer>
    </>
  );
}

export default LayoutKrishiSakhi;
