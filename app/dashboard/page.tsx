"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  Package,
  Clock,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    revenue: 156800,
    expenses: 45200,
    profit: 111600,
    receivables: 34500,
    payables: 12300,
    todaysSales: 8900,
    monthSales: 156800,
    lowStockItems: 14,
    totalOrders: 342,
    totalCustomers: 87,
    pendingInvoices: 23,
    activeProjects: 12,
  });

  // Mock data for charts
  const salesData = [
    { name: "Jan", sales: 45000, expenses: 12000 },
    { name: "Feb", sales: 52000, expenses: 14000 },
    { name: "Mar", sales: 48000, expenses: 13000 },
    { name: "Apr", sales: 61000, expenses: 15000 },
    { name: "May", sales: 55000, expenses: 14500 },
    { name: "Jun", sales: 67000, expenses: 16500 },
    { name: "Jul", sales: 72000, expenses: 18000 },
  ];

  const profitData = [
    { name: "Hardware", value: 45 },
    { name: "Steel", value: 30 },
    { name: "Services", value: 15 },
    { name: "Other", value: 10 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
    { month: "Jul", revenue: 72000 },
  ];

  const topProducts = [
    { name: "Steel Rods 12mm", sold: 2340, revenue: 234000 },
    { name: "Cement Bags", sold: 1890, revenue: 189000 },
    { name: "Nails Assorted", sold: 1560, revenue: 78000 },
    { name: "Paint White", sold: 980, revenue: 147000 },
    { name: "Timber 4x4", sold: 750, revenue: 112500 },
  ];

  const recentActivities = [
    { action: "New order created", user: "John Doe", time: "5 min ago", type: "order" },
    { action: "Invoice paid", user: "ABC Construction", time: "12 min ago", type: "payment" },
    { action: "Stock updated", user: "System", time: "35 min ago", type: "inventory" },
    { action: "New customer added", user: "Jane Smith", time: "1 hour ago", type: "customer" },
    { action: "Report generated", user: "System", time: "2 hours ago", type: "report" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section with Quick Actions */}
      <div className="bg-gradient-to-r from-[#0f3460] via-[#16213e] to-[#1a2342] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <BarChart3 size={40} />
                Dashboard Overview
              </h1>
              <p className="text-blue-100 text-lg">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/dashboard/sales/invoices" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/20">
                <FileText size={18} />
                <span className="font-semibold">New Invoice</span>
              </Link>
              <Link href="/dashboard/customers" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/20">
                <Users size={18} />
                <span className="font-semibold">Add Customer</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm mt-6">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-green-300" />
              <span className="text-green-300 font-semibold">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <DollarSign size={28} className="text-white" />
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={14} className="text-green-600" />
              <span className="text-green-600 text-xs font-bold">+12.5%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">
              KES {(dashboardData.revenue / 1000).toFixed(1)}K
            </p>
            <p className="text-gray-500 text-sm mt-2">
              KES {(dashboardData.todaysSales / 1000).toFixed(1)}K today
            </p>
          </div>
        </div>

        {/* Profit Card */}
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp size={28} className="text-white" />
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <Target size={14} className="text-green-600" />
              <span className="text-green-600 text-xs font-bold">71.1%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Net Profit</p>
            <p className="text-3xl font-bold text-gray-900">
              KES {(dashboardData.profit / 1000).toFixed(1)}K
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Profit margin: 71.1%
            </p>
          </div>
        </div>

        {/* Orders Card */}
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <ShoppingCart size={28} className="text-white" />
            </div>
            <div className="bg-orange-50 px-3 py-1 rounded-full flex items-center gap-1">
              <Zap size={14} className="text-orange-600" />
              <span className="text-orange-600 text-xs font-bold">Active</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">
              {dashboardData.totalOrders}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {dashboardData.pendingInvoices} pending invoices
            </p>
          </div>
        </div>

        {/* Customers Card */}
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Users size={28} className="text-white" />
            </div>
            <div className="bg-purple-50 px-3 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={14} className="text-purple-600" />
              <span className="text-purple-600 text-xs font-bold">+8</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Customers</p>
            <p className="text-3xl font-bold text-gray-900">
              {dashboardData.totalCustomers}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {dashboardData.activeProjects} active projects
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
              <p className="text-sm text-gray-500 mt-1">Monthly revenue overview</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Last 7 months</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  padding: "12px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sales by Category</h2>
            <p className="text-sm text-gray-500 mt-1">Distribution breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {profitData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {profitData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-xs text-gray-600 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales & Expenses Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Sales vs Expenses</h2>
            <p className="text-sm text-gray-500 mt-1">Monthly comparison</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                padding: "12px"
              }}
            />
            <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section - Three Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
            <Package className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">
                    {(product.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accounts Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Accounts Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Financial summary</p>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-semibold">Receivables</p>
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                KES {(dashboardData.receivables / 1000).toFixed(0)}K
              </p>
              <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-semibold">Payables</p>
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-red-600">
                KES {(dashboardData.payables / 1000).toFixed(0)}K
              </p>
              <div className="mt-2 h-2 bg-red-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 font-semibold">Low Stock Alert</p>
                <Package className="text-orange-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {dashboardData.lowStockItems} Items
              </p>
              <Link href="/dashboard/inventory" className="text-xs text-orange-600 hover:text-orange-700 font-semibold mt-2 inline-block">
                View inventory →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Activity className="text-gray-400" size={20} />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'order' ? 'bg-blue-500' :
                  activity.type === 'payment' ? 'bg-green-500' :
                  activity.type === 'inventory' ? 'bg-orange-500' :
                  activity.type === 'customer' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <p className="text-sm text-gray-500 mt-1">Latest invoice data</p>
          </div>
          <Link href="/dashboard/sales/invoices" className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition flex items-center gap-1">
            View all
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-gray-600 font-bold uppercase text-xs tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-4 text-gray-600 font-bold uppercase text-xs tracking-wider">
                  Invoice
                </th>
                <th className="text-left py-4 px-4 text-gray-600 font-bold uppercase text-xs tracking-wider">
                  Customer
                </th>
                <th className="text-left py-4 px-4 text-gray-600 font-bold uppercase text-xs tracking-wider">
                  Amount
                </th>
                <th className="text-left py-4 px-4 text-gray-600 font-bold uppercase text-xs tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2026-02-25",
                  invoice: "INV-001203",
                  customer: "ABC Construction",
                  amount: 45600,
                  status: "Paid",
                },
                {
                  date: "2026-02-24",
                  invoice: "INV-001202",
                  customer: "XYZ Builders",
                  amount: 32400,
                  status: "Pending",
                },
                {
                  date: "2026-02-23",
                  invoice: "INV-001201",
                  customer: "DEF Industries",
                  amount: 28900,
                  status: "Paid",
                },
                {
                  date: "2026-02-22",
                  invoice: "INV-001200",
                  customer: "GHI Enterprises",
                  amount: 15200,
                  status: "Paid",
                },
              ].map((row) => (
                <tr key={row.invoice} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-gray-600 font-medium">{row.date}</td>
                  <td className="py-4 px-4 font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                    {row.invoice}
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-semibold">{row.customer}</td>
                  <td className="py-4 px-4 font-bold text-gray-900">
                    KES {(row.amount / 1000).toFixed(1)}K
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                        row.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        row.status === "Paid" ? "bg-green-600" : "bg-yellow-600"
                      }`}></div>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
