"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Medal, Crown, Award } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    { title: "La Liga Titles", count: 35, icon: <Trophy />, description: "Most titles in Spanish league history" },
    { title: "Champions League", count: 14, icon: <Star />, description: "Most European Cup/UCL trophies ever" },
    { title: "FIFA Club World Cup", count: 5, icon: <Crown />, description: "Most in competition history" },
    { title: "UEFA Super Cup", count: 5, icon: <Medal />, description: "Record holders with Barcelona & Milan" },
    { title: "Copa del Rey", count: 20, icon: <Trophy />, description: "Second most in Spanish football" },
    { title: "Spanish Super Cup", count: 12, icon: <Award />, description: "Most titles in competition history" },
    { title: "Intercontinental Cup", count: 3, icon: <Crown />, description: "Tied for most wins with AC Milan" },
    { title: "European Cup Winners' Cup", count: 0, icon: <Trophy />, description: "Never won this trophy" },
    { title: "UEFA Cup/Europa League", count: 2, icon: <Medal />, description: "Won in 1985 and 1986" }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 lg:p-24">
      <div className="max-w-7xl mx-auto">
        {/* Header section with animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Real Madrid CF
            </h1>
          </motion.div>
          <h2 className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">Historical Achievements</h2>
          <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Founded in 1902, Real Madrid Club de Fútbol has established itself as the most successful football club in European and world football history.
          </p>
        </motion.div>

        {/* Trophy counter */}
        <motion.div
          className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 rounded-xl shadow-lg mb-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-medium mb-2">Total Major Trophies</h3>
          <motion.div 
            className="text-6xl md:text-7xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            96
          </motion.div>
        </motion.div>

        {/* Achievements grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 ${
                achievement.count === 0 ? 'bg-gray-100 border border-gray-200' : 'bg-white border border-gray-200'
              }`}
              variants={item}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{achievement.title}</h2>
                  <div className={`${achievement.count > 0 ? 'text-blue-500' : 'text-gray-400'}`}>
                    {achievement.icon}
                  </div>
                </div>
                
                <motion.p 
                  className={`text-5xl font-bold mb-3 ${achievement.count > 0 ? 'text-blue-600' : 'text-gray-400'}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  {achievement.count}
                </motion.p>
                
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              
              {/* Trophy bar visualization */}
              {achievement.count > 0 && (
                <div className="h-3 bg-gray-200 w-full">
                  <motion.div 
                    className={`h-full ${
                      achievement.count >= 30 ? 'bg-blue-600' : 
                      achievement.count >= 15 ? 'bg-blue-500' : 
                      achievement.count >= 10 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.count / 35) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Notable records section */}
        <motion.div
          className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Notable Records</h3>
          <ul className="space-y-4">
            <motion.li 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Star className="text-gold-500 mt-1 flex-shrink-0 text-yellow-500" size={20} />
              <span className="text-gray-700">Only club to win three consecutive Champions League titles in the modern era (2016-2018)</span>
            </motion.li>
            <motion.li 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <Star className="text-gold-500 mt-1 flex-shrink-0 text-yellow-500" size={20} />
              <span className="text-gray-700">Five consecutive European Cup/Champions League titles (1956-1960)</span>
            </motion.li>
            <motion.li 
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Star className="text-gold-500 mt-1 flex-shrink-0 text-yellow-500" size={20} />
              <span className="text-gray-700">Named FIFA Club of the 20th Century</span>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}