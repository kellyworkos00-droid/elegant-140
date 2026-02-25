"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2, ArrowRight, Eye, EyeOff, Copy, Check } from "lucide-react";

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

      // Save token
      localStorage.setItem("token", data.token);

      toast.success("Login successful! Redirecting...");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm animate-fadeIn">
          {/* Header with gradient bar */}
          <div className="h-1 bg-gradient-to-r from-[#0f3460] via-[#e94560] to-[#1a2342]"></div>

          <div className="p-8">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f3460] to-[#e94560] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  <Image 
                    src="/logo.png" 
                    alt="Elegant Steel Hardware" 
                    width={80} 
                    height={80}
                    priority
                    className="relative rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0f3460] to-[#1a2342] bg-clip-text text-transparent mb-2">
                Elegant Steel
              </h1>
              <p className="text-gray-600 text-sm font-medium">Enterprise Resource Planning System</p>
              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full w-fit mx-auto">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                System Online
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0f3460] transition-colors" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kellyos.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0f3460] focus:ring-2 focus:ring-[#0f3460]/10 focus:bg-white transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Use your registered email address</p>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0f3460] transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0f3460] focus:ring-2 focus:ring-[#0f3460]/10 focus:bg-white transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter your secure password</p>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded-md border-2 border-gray-300 text-[#0f3460] focus:ring-[#0f3460]/20 cursor-pointer accent-[#0f3460]" 
                    disabled={isLoading}
                  />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-[#0f3460] hover:text-[#e94560] font-semibold transition-colors duration-200 relative group">
                  Forgot password?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e94560] group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0f3460] to-[#1a2342] hover:from-[#1a2342] hover:to-[#0f3460] text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transform mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-600 font-medium">Demo Credentials</span>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="space-y-3">
              {/* Admin Credential */}
              <div 
                className="group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => copyToClipboard("admin@kellyos.com / Admin@123", "admin")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Administrator</p>
                    <p className="text-sm text-gray-800 font-mono mt-1 truncate">admin@kellyos.com</p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">Password: Admin@123</p>
                  </div>
                  <div className="flex-shrink-0">
                    {copiedCredential === "admin" ? (
                      <Check className="w-5 h-5 text-green-600 animate-pulse" />
                    ) : (
                      <Copy className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Credential */}
              <div 
                className="group cursor-pointer bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-lg border-2 border-violet-200 hover:border-violet-400 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => copyToClipboard("pkingori14@gmail.com / owner@2026", "owner")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-violet-900 uppercase tracking-wider">Business Owner</p>
                    <p className="text-sm text-gray-800 font-mono mt-1 truncate">pkingori14@gmail.com</p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">Password: owner@2026</p>
                  </div>
                  <div className="flex-shrink-0">
                    {copiedCredential === "owner" ? (
                      <Check className="w-5 h-5 text-green-600 animate-pulse" />
                    ) : (
                      <Copy className="w-5 h-5 text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mt-3 px-2">Click any credential to copy to clipboard</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-center">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 font-medium">Elegant Steel Hardware ERP © 2026</p>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 text-center">
          <p>🔒 Your credentials are securely encrypted and never stored in browser history</p>
        </div>
      </div>
    </div>
  );
}
