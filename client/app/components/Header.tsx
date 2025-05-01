"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation"

// Create a custom event name for auth state changes
const AUTH_STATE_CHANGE_EVENT = "authStateChange"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }

    // Listen for custom auth state change events
    const handleAuthChange = () => {
      checkAuth()
    }

    // attach listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthChange)
    // run once in case you start mid-page
    handleScroll()
    checkAuth()

    // Set up a storage event listener to update login state if it changes in another tab
    window.addEventListener("storage", (e) => {
      if (e.key === "token") {
        checkAuth()
      }
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event(AUTH_STATE_CHANGE_EVENT))
    
    router.push("/login")
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow bg-white ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/RealMadrid.png" alt="Real Madrid Logo" width={80} height={80} />
          <span className="ml-2 text-blue-900 text-2xl font-bold">HalaMadrid</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/news" className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium">
            News
          </Link>
          <Link
            href="/matches"
            className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
          >
            Matches
          </Link>
          <Link href="/squad" className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium">
            Squad
          </Link>
          <Link
            href="/achievements"
            className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
          >
            Achievements
          </Link>
          <Link
            href="/fan-zone"
            className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
          >
            Fan Zone
          </Link>

          <Link
            href="/hall-of-fame"
            className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
          >
            Hall of Fame
          </Link>

          {/* Conditional rendering based on authentication status */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-[#1E4C9A] px-4 py-2 rounded-lg font-medium border border-[#1E4C9A] hover:bg-[#1E4C9A] hover:text-white transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
