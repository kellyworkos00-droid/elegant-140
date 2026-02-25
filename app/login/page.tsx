"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0f3460] via-[#1a2342] to-[#0f3460] p-12 flex-col justify-center items-center min-h-screen relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#e94560]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-2xl opacity-20 scale-110"></div>
              <Image 
                src="/logo.png" 
                alt="Elegant Steel Hardware" 
                width={120} 
                height={120}
                priority
                className="relative rounded-2xl"
              />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">Elegant Steel</h1>
          <p className="text-blue-100 text-lg mb-8">Enterprise Resource Planning System</p>
          <p className="text-blue-200 leading-relaxed">
            Manage your steel hardware business with our comprehensive ERP solution. Track inventory, sales, customers, and more in one powerful platform.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image 
                src="/logo.png" 
                alt="Elegant Steel Hardware" 
                width={80} 
                height={80}
                priority
                className="rounded-xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Elegant Steel</h1>
            <p className="text-gray-600 text-sm mt-1">ERP System</p>
          </div>

          {/* Form Card */}
          <div className="bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 text-sm mb-8">Enter your credentials to access the dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kellyos.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0f3460] focus:ring-2 focus:ring-[#0f3460]/10 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0f3460] focus:ring-2 focus:ring-[#0f3460]/10 transition-all"
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
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#0f3460] cursor-pointer accent-[#0f3460]"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#0f3460] to-[#1a2342] hover:from-[#1a2342] hover:to-[#0f3460] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Demo Credentials</h3>
              
              {/* Admin Credential */}
              <button
                type="button"
                onClick={() => copyToClipboard("admin@kellyos.com / Admin@123", "admin")}
                className="w-full text-left p-4 mb-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-blue-900 uppercase">Administrator</p>
                    <p className="text-sm text-gray-800 font-mono mt-1">admin@kellyos.com</p>
                    <p className="text-xs text-gray-600 font-mono">Password: Admin@123</p>
                  </div>
                  {copiedCredential === "admin" ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Copy className="w-5 h-5 text-blue-600 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>

              {/* Owner Credential */}
              <button
                type="button"
                onClick={() => copyToClipboard("pkingori14@gmail.com / owner@2026", "owner")}
                className="w-full text-left p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-purple-900 uppercase">Business Owner</p>
                    <p className="text-sm text-gray-800 font-mono mt-1">pkingori14@gmail.com</p>
                    <p className="text-xs text-gray-600 font-mono">Password: owner@2026</p>
                  </div>
                  {copiedCredential === "owner" ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Copy className="w-5 h-5 text-purple-600 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">Click any credential to copy</p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Elegant Steel Hardware ERP © 2026
              </p>
              <p className="text-xs text-gray-500 mt-2">
                🔒 Your credentials are securely encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
