"use client"

import { useState } from "react"
import { Menu, X, User, LogOut } from "lucide-react"
import Title from "../components/title-comp"
import { PricingComp } from "../components/pricing-comp"
import { InstructionComp } from "../components/instruction-comp"
import { useNavigate, useParams } from 'react-router-dom'
import ProfileComp from '../components/profile-comp'

const navigationLinks = [
  { name: "Home", href: "#" },
  { name: "Current Score", href: "#" },
  { name: "Leaderboard", href: "#" },
  { name: "Pricing", href: "#pricing" },
  { name: "Instructions", href: "#instructions" },
  { name: "Propose Question", href: "#" },
]

export default function Navbar_df() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPricing, setShowPricing] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate();
  const { walletId } = useParams();

  const handleLogout = () => {
    navigate('/dashboard')
  }

  // Helper for nav click
  const handleNavClick = (name: string) => {
    if (name === "Pricing") setShowPricing(true)
    else if (name === "Instructions") setShowInstructions(true)
    else if (name === "Profile") setShowProfile(true)
    // else: do nothing or navigate
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Title />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => {
                  if (["Pricing", "Instructions"].includes(link.name)) {
                    e.preventDefault();
                    handleNavClick(link.name);
                  }
                }}
                className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors px-2 py-1 relative group"
              >
                {link.name}
                <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
            ))}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={() => setShowProfile(true)}
              aria-label="Profile"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => {
                  if (["Pricing", "Instructions"].includes(link.name)) {
                    e.preventDefault();
                    handleNavClick(link.name);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="block px-3 py-2 text-base font-medium rounded-md text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            {/* Profile button for mobile */}
            <button
              className="w-full flex items-center justify-start px-3 py-2 mt-2 text-base font-medium rounded-md text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              onClick={() => { setShowProfile(true); setIsMobileMenuOpen(false); }}
            >
              <User className="w-5 h-5 mr-2 text-gray-600" />
              Profile
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 flex items-center px-5 space-x-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showPricing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-white rounded-2xl shadow-lg p-0 max-w-5xl w-full mx-4 overflow-y-auto max-h-[95vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-2xl font-bold z-10"
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
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold z-10"
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
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowProfile(false)}>
          <div
            className="relative bg-white rounded-2xl shadow-lg p-0 max-w-2xl w-full mx-4 overflow-y-auto max-h-[95vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-0">
              <ProfileComp walletId={walletId || ""} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}