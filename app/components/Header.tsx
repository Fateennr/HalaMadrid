"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState,useEffect } from "react"

export default function Header() {

  const [isScrolled, setIsScrolled] = useState(false);


  useEffect( () => {
    const handleScroll = () => {
      if( window.scrollY > 0){
        setIsScrolled(true);
      }
      else{
        setIsScrolled(false);
      }

      window.addEventListener( "scroll", handleScroll)

      return () => {
        window.removeEventListener( "scroll", handleScroll)
      }
    }
  }, [])

  return (
    <motion.header
      className="bg-white shadow-md fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-900 text-2xl font-bold">
            <Image src = "RealMadrid.png" alt="Real Madrid Logo" width={80} height={80} />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/news" className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium">
              News
            </Link>
            <Link
              href="/matches"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
            >
              Matches
            </Link>
            <Link
              href="/squad"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
            >
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
              href="/media"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
            >
              Media
            </Link>
            <Link
              href="/hall-of-fame"
              className="text-gray-700 hover:text-blue-900 transition-colors duration-300 font-medium"
            >
              Hall of Fame
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

