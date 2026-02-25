"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)' }}>
      <div className="flex rounded-lg overflow-hidden shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">
        {/* Login Form Section */}
        <div className="w-[350px] bg-white p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-center my-4">
            <Image 
              src="/logo.png" 
              alt="Elegant Steel" 
              width={50} 
              height={50}
              priority
              className="rounded-lg mb-3"
            />
            <h2 className="font-bold text-[15px] leading-[21px] text-center text-[#2B2B2F] mb-2.5">
              Sign In to Your Account
            </h2>
            <p className="max-w-[80%] mx-auto font-semibold text-[10px] leading-[14px] text-center text-[#5F5D6B]">
              Access your Elegant Steel ERP system to manage operations efficiently.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="w-full relative flex flex-col gap-1.5">
              <Mail 
                className="w-5 h-5 absolute z-10 left-3 bottom-2.5 text-[#141B34]" 
                strokeWidth={1.5}
              />
              <input
                id="email_field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@mail.com"
                className="w-full h-10 pl-10 pr-3 rounded-[7px] outline-none border border-[#e5e5e5] transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)] focus:border-transparent focus:shadow-[0px_0px_0px_2px_#115DFC]"
                style={{ 
                  filter: 'drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5))' 
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="w-full relative flex flex-col gap-1.5">
              <Lock 
                className="w-5 h-5 absolute z-10 left-3 bottom-2.5 text-[#141B34]" 
                strokeWidth={1.5}
              />
              <input
                id="password_field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-10 pl-10 pr-3 rounded-[7px] outline-none border border-[#e5e5e5] transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)] focus:border-transparent focus:shadow-[0px_0px_0px_2px_#115DFC]"
                style={{ 
                  filter: 'drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5))' 
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="flex flex-row justify-center items-center gap-2.5 w-full h-9 rounded-[5px] border-0 font-semibold text-xs leading-[15px] text-white transition-all duration-[0.6s] ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:scale-[1.01] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ 
                background: isLoading ? '#6b7280' : 'linear-gradient(180deg, #4480FF 0%, #115DFC 50%, #0550ED 100%)',
                boxShadow: '0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5)'
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Testimonial Section */}
        <div 
          className="w-[250px] flex flex-col items-center justify-center gap-5 p-5 rounded-r-lg"
          style={{ 
            background: 'linear-gradient(358.31deg, #fff -24.13%, hsla(0,0%,100%,0) 338.58%), linear-gradient(89.84deg, rgba(230,36,174,.15) .34%, rgba(94,58,255,.15) 16.96%, rgba(10,136,255,.15) 34.66%, rgba(75,191,80,.15) 50.12%, rgba(137,206,0,.15) 66.22%, rgba(239,183,0,.15) 82%, rgba(246,73,0,.15) 99.9%)' 
          }}
        >
          <p className="text-[#4d4c6d] text-[11px] text-center font-semibold">
            "I've been using this ERP system for managing our steel hardware business and it's incredibly efficient! The interface is intuitive and saves us hours of work daily."
          </p>
          
          <div className="w-[50px] h-[50px] rounded-full bg-[#00000011] flex items-center justify-center overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="User" 
              width={45} 
              height={45}
              className="rounded-full object-cover"
            />
          </div>
          
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[#4d4c6d] text-[11px] text-center font-semibold">
              Kelly Workos
            </span>
            <span className="text-[#8d8ca1] text-[10px] text-center font-semibold">
              Operations Manager
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
