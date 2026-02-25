"use client";

import { useEffect, useState } from "react";
import { Bell, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { JWTPayload } from "@/lib/auth-types";

export default function Header() {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // Get user from localStorage token (decoded)
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode JWT without verification (client-side)
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch {
        console.error("Failed to decode token");
      }
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#1a2342] to-[#0f3460] border-b border-[#e94560]/20 px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3 flex-1">
        <Image 
          src="/logo.png" 
          alt="Elegant Steel Hardware" 
          width={44} 
          height={44}
          priority
          className="rounded-lg"
        />
        <div>
          <h1 className="text-xl font-bold text-white">Elegant Steel Hardware</h1>
          <p className="text-xs text-gray-400">Enterprise Resource Planning System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-300 hover:bg-[#e94560]/20 rounded-lg transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#e94560] rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-[#e94560]/20 rounded-lg transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#e94560] to-[#e94560]/80 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {/* Profile Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0f3460] rounded-lg shadow-xl border border-[#e94560]/20 py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a2342]"
              >
                Profile Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a2342]"
              >
                Change Password
              </a>
              <hr className="my-2 border-[#e94560]/20" />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="block w-full text-left px-4 py-2 text-sm text-[#e94560] hover:bg-[#1a2342]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
