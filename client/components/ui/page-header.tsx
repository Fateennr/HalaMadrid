import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string;
  accentText?: string;
  description?: string;
}

export function PageHeader({ title, accentText, description }: PageHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="inline-block"
        animate={{ 
          rotate: [0, 2, 0, -2, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          {title} {accentText && <span className="text-blue-600">{accentText}</span>}
        </h1>
      </motion.div>
      {description && (
        <p className="text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
      <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full my-8"></div>
    </motion.div>
  )
}
