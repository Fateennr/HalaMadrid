"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      className="bg-blue-900 text-white py-6"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 Real Madrid Fan Page. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

