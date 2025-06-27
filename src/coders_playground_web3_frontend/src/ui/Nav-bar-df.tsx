import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import  Title  from "../components/title-comp"  
import { PricingComp } from "../components/pricing-comp"
import { InstructionComp } from "../components/instruction-comp"
import { useNavigate } from 'react-router-dom'
import ProfileComp from '../components/profile-comp'

const Navbar_df = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showPricing, setShowPricing] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add any logout cleanup logic here
    navigate('/dashboard'); // Adjust the route as needed
  };

  return (
    <div className="flex justify-center w-full py-8 px-6">
      <div className="flex items-center justify-between px-10 py-5 bg-white rounded-full shadow-lg w-full max-w-4xl relative z-10" style={{ minHeight: '90px' }}>
        <div className="flex items-center"> 
          <Title />
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {["Home", "Current Score", "Leaderboard", "Pricing", "Instructions"].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href="#"
                  className="text-lg text-gray-900 hover:text-gray-600 transition-colors font-medium"
                  onClick={
                    item === "Pricing"
                      ? (e) => {
                          e.preventDefault();
                          setShowPricing(true);
                        }
                    : item === "Instructions"
                      ? (e) => {
                          e.preventDefault();
                          setShowInstructions(true);
                          setShowPricing(false);
                        }
                    : undefined
                  }
                >
                  {item}
                </a>
              </motion.div>
            ))}
            {/* Profile Icon and Logout Button */}
            <div className="flex items-center space-x-2 ml-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Profile"
                  onClick={() => setShowProfile(true)}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M16 20v-2a4 4 0 0 0-8 0v2"/></svg>
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </motion.div>
            </div>
          </nav>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-gray-900" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {["Home", "Current Score", "Leaderboard", "Pricing", "Instructions"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a
                    href="#"
                    className="text-lg text-gray-900 font-medium"
                    onClick={
                      item === "Pricing"
                        ? (e) => {
                            e.preventDefault();
                            setShowPricing(true);
                            toggleMenu();
                          }
                        : item === "Instructions"
                          ? (e) => {
                              e.preventDefault();
                              setShowInstructions(true);
                              setShowPricing(false);
                              toggleMenu();
                            }
                        : toggleMenu
                    }
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
              {/* Profile Icon and Logout Button for Mobile */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Profile"
                  onClick={() => setShowProfile(true)}
                >
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M16 20v-2a4 4 0 0 0-8 0v2"/></svg>
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for PricingComp */}
      {showPricing && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-0 max-w-5xl w-full mx-4 overflow-y-auto max-h-[95vh]">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold z-10"
        onClick={() => setShowPricing(false)}
        aria-label="Close pricing modal"
      >
        &times;
      </button>
      <div className="p-0">
        <PricingComp />
      </div>
    </div>
  </div>
)}

      {/* Modal for Instructions (Full Screen) */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-3xl font-bold z-10"
            onClick={() => setShowInstructions(false)}
            aria-label="Close instructions modal"
          >
            &times;
          </button>
          <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
            <InstructionComp />
          </div>
        </div>
      )}

      {/* Modal for ProfileComp */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-0 max-w-2xl w-full mx-4 overflow-y-auto max-h-[95vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold z-10"
              onClick={() => setShowProfile(false)}
              aria-label="Close profile modal"
            >
              &times;
            </button>
            <div className="p-0">
              <ProfileComp />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export { Navbar_df }