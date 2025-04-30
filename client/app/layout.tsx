import type React from "react"
import "./globals.css"
import { Lexend } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

const lexend = Lexend({ subsets: ['latin'] });

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
          <body>
            <Header />
            <div className="h-14" />
              {children}
            <Footer />
          </body>
    </html>
  )
}
