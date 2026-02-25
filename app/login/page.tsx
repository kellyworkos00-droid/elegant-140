"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2, Eye, EyeOff, Copy, Check } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Left Panel - Branding */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#0f3460] to-[#1a2342] rounded-l-2xl shadow-2xl">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Image 
                    src="/logo.png" 
                    alt="Elegant Steel" 
                    width={40} 
                    height={40}
                    priority
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Elegant Steel</h1>
                  <p className="text-blue-200 text-sm font-medium">ERP System</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                    Professional Steel Hardware Management
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Streamline your operations with our comprehensive Enterprise Resource Planning solution.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: "📊", title: "Real-time Analytics", desc: "Track inventory, sales, and operations" },
                    { icon: "🔒", title: "Enterprise Security", desc: "Bank-level encryption and access control" },
                    { icon: "⚡", title: "Lightning Fast", desc: "Optimized for performance" },
                    { icon: "👥", title: "Team Collaboration", desc: "Multi-user access management" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                      <div>
                        <p className="text-white font-semibold">{feature.title}</p>
                        <p className="text-blue-100 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-blue-200 text-sm">
                © 2026 Elegant Steel Hardware. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="bg-white p-8 lg:p-12 rounded-r-2xl shadow-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Image 
                src="/logo.png" 
                alt="Elegant Steel" 
                width={48} 
                height={48}
                priority
                className="rounded-lg mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900">Elegant Steel</h1>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h2>
              <p className="text-gray-600 font-medium">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kellyos.com"
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-[#0f3460] focus:ring-2 focus:ring-[#0f3460]/10 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Password
                  </label>
                  <a href="#" className="text-xs text-[#0f3460] hover:text-[#1a2342] font-semibold">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-[#0f3460] focus:ring-2 focus:ring-[#0f3460]/10 transition-all"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#0f3460] cursor-pointer accent-[#0f3460]"
                  disabled={isLoading}
                />
                <span className="text-sm font-medium text-gray-700">Keep me signed in</span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-2.5 px-4 mt-8 bg-gradient-to-r from-[#0f3460] to-[#1a2342] hover:from-[#1a2342] hover:to-[#0f3460] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
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
            <div className="my-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Demo Accounts</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Demo Credentials */}
            <div className="space-y-3">
              {/* Admin */}
              <button
                type="button"
                onClick={() => copyToClipboard("admin@kellyos.com / Admin@123", "admin")}
                className="w-full p-3 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Admin</p>
                    <p className="text-sm font-medium text-gray-800 truncate">admin@kellyos.com</p>
                    <p className="text-xs text-gray-600 font-mono">Admin@123</p>
                  </div>
                  {copiedCredential === "admin" ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Copy className="w-5 h-5 text-blue-600 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>

              {/* Owner */}
              <button
                type="button"
                onClick={() => copyToClipboard("pkingori14@gmail.com / owner@2026", "owner")}
                className="w-full p-3 text-left bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Owner</p>
                    <p className="text-sm font-medium text-gray-800 truncate">pkingori14@gmail.com</p>
                    <p className="text-xs text-gray-600 font-mono">owner@2026</p>
                  </div>
                  {copiedCredential === "owner" ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Copy className="w-5 h-5 text-indigo-600 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>

              <p className="text-xs text-center text-gray-500 pt-2">Click to copy credentials</p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                🔒 Secure Login • SSL Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
