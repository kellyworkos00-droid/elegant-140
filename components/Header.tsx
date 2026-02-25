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
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
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
          <h1 className="text-xl font-bold text-gray-900">Elegant Steel Hardware</h1>
          <p className="text-xs text-gray-500">Enterprise Resource Planning System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#e94560] rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#0f3460] to-[#e94560] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {/* Profile Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </a>
              <hr className="my-2" />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
