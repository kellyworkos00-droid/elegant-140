"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Warehouse,
  FileText,
  TrendingUp,
  DollarSign,
  Briefcase,
  ChevronRight,
  Home,
  User,
  Bell,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "blue",
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
    color: "purple",
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
    color: "indigo",
    submenu: [
      { label: "Products", href: "/dashboard/inventory", icon: Package },
      { label: "Stock Levels", href: "/dashboard/inventory/stock", icon: Warehouse },
      { label: "Stock Movements", href: "/dashboard/inventory/movements", icon: TrendingUp },
    ],
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    color: "green",
    submenu: [
      { label: "Invoices", href: "/dashboard/sales/invoices", icon: FileText },
      { label: "Sales Orders", href: "/dashboard/sales/orders", icon: TrendingUp },
      { label: "Quotes", href: "/dashboard/sales/quotes", icon: FileText },
    ],
  },
  {
    label: "POS",
    href: "/dashboard/pos",
    icon: ShoppingCart,
    color: "orange",
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    color: "pink",
  },
  {
    label: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Warehouse,
    color: "teal",
  },
  {
    label: "Purchases",
    href: "/dashboard/purchases",
    icon: Package,
    color: "cyan",
  },
  {
    label: "Accounting",
    href: "/dashboard/accounting",
    icon: DollarSign,
    color: "emerald",
    submenu: [
      { label: "Chart of Accounts", href: "/dashboard/accounting/chart", icon: BarChart3 },
      { label: "Ledger", href: "/dashboard/accounting/ledger", icon: FileText },
      { label: "Reports", href: "/dashboard/accounting/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    color: "violet",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "gray",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { logout } = useAuth();

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section with Gradient */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-50"></div>
                <Image 
                  src="/logo.png" 
                  alt="Elegant Steel Hardware" 
                  width={50} 
                  height={50}
                  priority
                  className="rounded-xl relative z-10 shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Elegant Steel
                </h1>
                <p className="text-xs text-gray-400 font-medium">ERP System</p>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative z-10 shadow-lg">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 z-20"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Admin User</p>
                  <p className="text-xs text-gray-400\">admin@kellyos.com</p>
                </div>
                <Bell size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent\">
            {menuItems.map((item) => (
              <div key={item.label}>
                <div
                  className={`group relative ${
                    isActive(item.href) && !item.submenu
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50"
                      : "hover:bg-white/5"
                  } rounded-xl transition-all duration-200 ${item.submenu ? "cursor-pointer" : ""}`}
                  onClick={() => item.submenu && toggleSubmenu(item.label)}
                >
                  {isActive(item.href) && !item.submenu && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}
                  
                  <Link
                    href={!item.submenu ? item.href : "#"}
                    className="flex items-center justify-between px-4 py-3"
                    onClick={(e) => item.submenu && e.preventDefault()}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isActive(item.href) && !item.submenu
                          ? "bg-white/20"
                          : "bg-white/5 group-hover:bg-white/10"
                      } transition-all`}>
                        <item.icon size={18} />
                      </div>
                      <span className={`text-sm font-medium ${
                        isActive(item.href) && !item.submenu
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {item.submenu && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-all duration-200 ${
                          expandedMenu === item.label ? "rotate-180 text-blue-400" : "group-hover:text-white"
                        }`}
                      />
                    )}
                  </Link>
                </div>

                {/* Submenu */}
                {item.submenu && expandedMenu === item.label && (
                  <div className="ml-6 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          pathname === subitem.href
                            ? "bg-blue-600/30 text-white border-l-2 border-blue-400"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-gray-600"
                        }`}
                      >
                        <subitem.icon size={16} />
                        <span>{subitem.label}</span>
                        {pathname === subitem.href && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300\">System Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-green-400 font-semibold\">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-xs text-gray-400\">All systems operational</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 font-medium text-sm border border-red-500/20 hover:border-red-500/40 group"
            >
              <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
