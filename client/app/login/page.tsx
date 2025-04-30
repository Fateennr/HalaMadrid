"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // if (!res.ok) {
      //   throw new Error("Invalid username or password");
      // }

      const { token } = await res.json();
      localStorage.setItem("token", token); // Store token in localStorage
      router.push("/fan-zone"); // Redirect to Fan Zone
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c3d] to-[#1a1a1a] flex items-center justify-center text-white">
      <motion.div
        className="bg-white bg-opacity-10 p-8 rounded-xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back, <span className="text-[#febe10]">Madridista</span>
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febe10]"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febe10]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#febe10] text-[#0b1c3d] py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account? <a href="/register" className="text-[#febe10] hover:underline">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}