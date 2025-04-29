"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create account");
      }

      router.push("/login"); // Redirect to login after successful signup
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
          Join the <span className="text-[#febe10]">Madridistas</span>
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febe10]"
              placeholder="Enter your email"
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
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febe10]"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#febe10] text-[#0b1c3d] py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-[#febe10] hover:underline">Log in</a>
        </p>
      </motion.div>
    </div>
  );
}