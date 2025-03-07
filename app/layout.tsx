import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });


const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Real Madrid Fan Page",
  description: "The ultimate destination for Real Madrid fans",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lexend.className} text-gray-800`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

