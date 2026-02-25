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
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
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
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Warehouse,
  },
  {
    label: "Purchases",
    href: "/dashboard/purchases",
    icon: Package,
  },
  {
    label: "Accounting",
    href: "/dashboard/accounting",
    icon: DollarSign,
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
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
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

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 text-gray-900 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center">
            <Image 
              src="/logo.png" 
              alt="Elegant Steel Hardware" 
              width={50} 
              height={50}
              priority
              className="rounded-lg"
            />
            <span className="ml-3 text-lg font-bold text-[#0f3460]">Elegant</span>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    pathname === item.href
                      ? "bg-[#0f3460] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${item.submenu ? "cursor-pointer" : ""}`}
                  onClick={() =>
                    item.submenu && toggleSubmenu(item.label)
                  }
                >
                  <Link
                    href={!item.submenu ? item.href : "#"}
                    className="flex items-center gap-3 flex-1"
                  >
                    <item.icon size={20} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && expandedMenu === item.label && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                          pathname === subitem.href
                            ? "bg-[#0f3460] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <subitem.icon size={16} />
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#0f3460] hover:text-white rounded-lg transition text-sm"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
