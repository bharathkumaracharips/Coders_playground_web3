import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import DemoOne from "../components/title-comp"  
import { LoginUI } from "../components/login-comp"
import { PricingComp } from "../components/pricing-comp"
import { InstructionComp } from "../components/instruction-comp"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showPricing, setShowPricing] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-3xl relative z-10">
        <div className="flex items-center"> 
          <DemoOne />
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Pricing", "Instructions"].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <a
                  href="#"
                  className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium"
                  onClick={
                    item === "Pricing"
                      ? (e) => {
                          e.preventDefault();
                          setShowPricing(true);
                          setShowLogin(false);
                          setShowInstructions(false);
                        }
                    : item === "Instructions"
                      ? (e) => {
                          e.preventDefault();
                          setShowInstructions(true);
                          setShowLogin(false);
                          setShowPricing(false);
                        }
                    : undefined
                  }
                >
                  {item}
                </a>
              </motion.div>
            ))}
          </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={() => setShowLogin(true)}
            className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </motion.div>

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
              {["Home", "Pricing", "Instructions"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a
                    href="#"
                    className="text-base text-gray-900 font-medium"
                    onClick={
                      item === "Pricing"
                        ? (e) => {
                            e.preventDefault();
                            setShowPricing(true);
                            setShowLogin(false);
                            setShowInstructions(false);
                            toggleMenu();
                          }
                        : item === "Instructions"
                          ? (e) => {
                              e.preventDefault();
                              setShowInstructions(true);
                              setShowLogin(false);
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <button
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors "
                  onClick={() => { setShowLogin(true); toggleMenu(); }}
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Login06 */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-0 max-w-md w-full mx-4">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold z-10"
              onClick={() => setShowLogin(false)}
              aria-label="Close login modal"
            >
              &times;
            </button>
            <div className="p-0">
              <LoginUI />
            </div>
          </div>
        </div>
      )}

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
    </div>
  )
}


export { Navbar }