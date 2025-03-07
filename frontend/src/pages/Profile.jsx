import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="min-h-screen font-inter" style={{ background: "linear-gradient(to bottom, #f8f4f1, #ffffff)" }}>
      {/* Header with back navigation */}
      <header className="py-6 px-8 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-pink-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-700 ml-4">My Profile</h1>
      </header>

      {/* Profile content container */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* Profile card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
        >
          {/* Profile header with cover and avatar */}
          <div className="h-40 bg-gradient-to-r from-pink-100 to-pink-200 relative">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="ml-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-700">Alex Johnson</h2>
                <p className="text-gray-500">Member since 2023</p>
              </div>
            </div>
          </div>

          {/* Profile tabs */}
          <div className="pt-20 px-8">
            <div className="flex border-b border-gray-200">
              <button 
                className={`pb-4 px-4 font-medium text-sm transition-colors ${activeTab === "details" ? "border-b-2 border-pink-400 text-pink-500" : "text-gray-400 hover:text-gray-600"}`}
                onClick={() => setActiveTab("details")}
              >
                Personal Details
              </button>
              <button 
                className={`pb-4 px-4 font-medium text-sm transition-colors ${activeTab === "sessions" ? "border-b-2 border-pink-400 text-pink-500" : "text-gray-400 hover:text-gray-600"}`}
                onClick={() => setActiveTab("sessions")}
              >
                Therapy Sessions
              </button>
              <button 
                className={`pb-4 px-4 font-medium text-sm transition-colors ${activeTab === "journal" ? "border-b-2 border-pink-400 text-pink-500" : "text-gray-400 hover:text-gray-600"}`}
                onClick={() => setActiveTab("journal")}
              >
                Journal
              </button>
            </div>

            {/* Tab contents */}
            <div className="py-8">
              {activeTab === "details" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-700">Alex Johnson</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-700">alex.johnson@example.com</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                      <p className="text-gray-700">(555) 123-4567</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                      <p className="text-gray-700">May 15, 1988</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Therapy Goals</label>
                    <p className="text-gray-700">Manage anxiety, improve work-life balance, develop coping mechanisms for stress</p>
                  </div>
                  
                  <button className="mt-4 px-6 py-2 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-lg transition flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </button>
                </motion.div>
              )}

              {activeTab === "sessions" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-700">Upcoming Sessions</h3>
                    <button className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-lg transition text-sm">
                      Book New Session
                    </button>
                  </div>
                  
                  {/* Session cards */}
                  <div className="space-y-3">
                    <div className="p-4 bg-cream-50 rounded-lg border border-gray-100">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-pink-500 font-medium">Dr. Sarah Williams</p>
                          <p className="text-gray-700">Anxiety Management</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            May 10, 2023
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            2:00 PM - 3:00 PM
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="px-3 py-1 bg-white text-pink-500 border border-pink-200 rounded text-sm hover:bg-pink-50 transition">
                            Reschedule
                          </button>
                          <button className="px-3 py-1 bg-white text-gray-500 border border-gray-200 rounded text-sm hover:bg-gray-50 transition">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-700 mt-8">Past Sessions</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-600 font-medium">Dr. Sarah Williams</p>
                          <p className="text-gray-600">Initial Consultation</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            April 26, 2023
                          </div>
                        </div>
                        <button className="px-3 py-1 h-8 bg-white text-gray-500 border border-gray-200 rounded text-sm hover:bg-gray-50 transition">
                          View Notes
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "journal" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-700">Journal Entries</h3>
                    <button className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-lg transition text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      New Entry
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-700">Reflecting on Progress</h4>
                          <p className="text-gray-500 text-sm mt-1">May 5, 2023</p>
                        </div>
                        <div className="bg-pink-50 text-pink-500 px-2 py-1 rounded text-xs">
                          Positive
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3 line-clamp-3">
                        Today was a good day. I practiced the mindfulness techniques Dr. Williams suggested, and I found myself feeling much more grounded throughout the workday. The breathing exercises really help when I feel overwhelmed...
                      </p>
                      <button className="mt-3 text-pink-500 text-sm font-medium hover:text-pink-600 transition">
                        Read more
                      </button>
                    </div>
                    
                    <div className="p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-700">Challenging Day</h4>
                          <p className="text-gray-500 text-sm mt-1">April 28, 2023</p>
                        </div>
                        <div className="bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs">
                          Neutral
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3 line-clamp-3">
                        I had a difficult conversation with a coworker today. I tried to use the communication strategies we discussed in our last session. While the conversation was still challenging, I feel I handled it better than I would have before...
                      </p>
                      <button className="mt-3 text-pink-500 text-sm font-medium hover:text-pink-600 transition">
                        Read more
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Additional profile sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Mood Tracker</h3>
            <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Placeholder for mood chart */}
              <p className="text-gray-400">Mood trends visualization</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600 hover:text-pink-500 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Anxiety Management Guide
              </li>
              <li className="flex items-center text-gray-600 hover:text-pink-500 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Guided Meditation Videos
              </li>
              <li className="flex items-center text-gray-600 hover:text-pink-500 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Weekly Mindfulness Calendar
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
