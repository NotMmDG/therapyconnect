import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import bgGif1 from "../assets/background1.gif";
import bgGif2 from "../assets/background2.gif";
import therapyAnimation1 from "../assets/therapy-animation1.json";
import therapyAnimation2 from "../assets/therapy-animation2.json";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="text-white font-inter">
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center px-4 sm:px-8"
        style={{ backgroundImage: `url(${bgGif1})` }}
      >
        {/* Navigation Bar */}
        <nav className="absolute top-5 left-5 flex items-center gap-4">
          <Link to="/profile">
            <img
              src={avatar}
              alt="User Avatar"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white shadow-lg cursor-pointer"
            />
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setTimeout(() => setMenuOpen(false), 200)}
          >
            <button className="h-10 w-10 text-white hover:text-gray-300 transition">
              ☰
            </button>
            {menuOpen && (
              <motion.div
                className="absolute top-12 left-0 bg-indigo-700 text-white shadow-lg rounded-md py-2 w-40 sm:w-48"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-500">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-indigo-500">Settings</Link>
                <Link to="/auth" className="block px-4 py-2 hover:bg-red-500">Login</Link>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Content */}
        <motion.div
          className="p-6 sm:p-10 bg-indigo-700 bg-opacity-90 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-6 max-w-full md:max-w-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-40 md:w-56 lg:w-64">
            <Player autoplay loop src={therapyAnimation1} />
          </div>
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Welcome to <span className="text-blue-300">TherapyConnect</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mt-2">
              Your trusted platform for online therapy. Connect with experienced therapists anytime, anywhere.
            </p>
            <button
              className="mt-6 px-6 py-3 bg-blue-400 text-white rounded-lg shadow-lg hover:bg-blue-500 transition"
              onClick={() =>
                document
                  .getElementById("booking-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started ↓
            </button>
          </div>
        </motion.div>
      </div>

      {/* Booking Section */}
      <div
        id="booking-section"
        className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center px-4 sm:px-8"
        style={{ backgroundImage: `url(${bgGif2})` }}
      >
        <motion.div
          className="p-6 sm:p-10 bg-indigo-800 bg-opacity-90 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-6 max-w-full md:max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-40 md:w-56 lg:w-64">
            <Player autoplay loop src={therapyAnimation2} />
          </div>
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">Book a Time for Therapy</h2>
            <p className="text-base sm:text-lg text-gray-200 mt-2">
              Schedule an online session with a certified therapist today.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
              Book Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
