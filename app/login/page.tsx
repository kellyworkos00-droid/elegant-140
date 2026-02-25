"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2, Eye, EyeOff, Copy, Check, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCredential, setCopiedCredential] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCredential(id);
    setTimeout(() => setCopiedCredential(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-center">
          {/* Left Side - Branding (Hidden on mobile) */}
          <div className="hidden md:flex flex-col justify-center pl-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 w-fit">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">Elegant Steel</span>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
                  Powerful ERP System
                </h2>
                <p className="text-lg text-gray-600">
                  Manage your steel business with advanced tools, real-time analytics, and seamless integration.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                {[
                  "Real-time inventory management",
                  "Comprehensive sales & invoicing",
                  "Advanced analytics & reports",
                  "Multi-user access control"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center md:text-left mb-8">
              <div className="flex md:hidden justify-center mb-6">
                <Image 
                  src="/logo.png" 
                  alt="Elegant Steel" 
                  width={56} 
                  height={56}
                  priority
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue to your dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kellyos.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Password
                  </label>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 cursor-pointer accent-blue-600 focus:ring-blue-500 focus:ring-2 transition-colors"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium text-gray-700">Keep me signed in</span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transform"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Demo Accounts</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Credential Cards */}
            <div className="space-y-3">
              {/* Admin Card */}
              <button
                type="button"
                onClick={() => copyToClipboard("admin@kellyos.com / Admin@123", "admin")}
                className="w-full p-4 text-left bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">Admin Account</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">admin@kellyos.com</p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">Admin@123</p>
                  </div>
                  {copiedCredential === "admin" ? (
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Copy className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
              </button>

              {/* Owner Card */}
              <button
                type="button"
                onClick={() => copyToClipboard("pkingori14@gmail.com / owner@2026", "owner")}
                className="w-full p-4 text-left bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-2 border-indigo-200 rounded-lg hover:shadow-md hover:border-indigo-400 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>
                      <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Owner Account</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">pkingori14@gmail.com</p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">owner@2026</p>
                  </div>
                  {copiedCredential === "owner" ? (
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Copy className="w-5 h-5 text-indigo-600" />
                    </div>
                  )}
                </div>
              </button>

              <p className="text-xs text-center text-gray-500 pt-2">Click to copy credentials</p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                🔒 Secure Login • SSL Encrypted • © 2026 Elegant Steel Hardware
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
