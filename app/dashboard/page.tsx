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
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  Package,
  Clock,
} from "lucide-react";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

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

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0f3460] to-[#1a2342] rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Welcome back! Here's your business performance overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Revenue</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">
                KES {(dashboardData.revenue / 1000).toFixed(0)}K
              </p>
              <p className="text-green-600 text-sm mt-3 flex items-center gap-1 font-semibold">
                <TrendingUp size={16} /> +12.5% from last month
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl">
              <DollarSign size={40} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Profit</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">
                KES {(dashboardData.profit / 1000).toFixed(0)}K
              </p>
              <p className="text-green-600 text-sm mt-3 font-semibold">
                71.1% profit margin
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-xl">
              <TrendingUp size={40} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Expenses</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">
                KES {(dashboardData.expenses / 1000).toFixed(0)}K
              </p>
              <p className="text-red-600 text-sm mt-3 flex items-center gap-1 font-semibold">
                <TrendingDown size={16} /> -8.2% from last month
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-xl">
              <AlertCircle size={40} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Orders</p>
              <p className="text-4xl font-bold text-gray-900 mt-3">
                {dashboardData.totalOrders}
              </p>
              <p className="text-orange-600 text-sm mt-3 font-semibold">
                {dashboardData.todaysSales > 0
                  ? `KES ${(dashboardData.todaysSales / 1000).toFixed(0)}K today`
                  : "No sales today"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-xl">
              <ShoppingCart size={40} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Expenses Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Sales & Expenses Trend
            </h2>
            <span className="text-sm text-gray-500">Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sales by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
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
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receivables & Payables */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Accounts Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Accounts Receivable</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  KES {(dashboardData.receivables / 1000).toFixed(0)}K
                </p>
              </div>
              <TrendingUp className="text-blue-600" size={40} />
            </div>
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl border border-red-200 hover:border-red-300 transition-all">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Accounts Payable</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  KES {(dashboardData.payables / 1000).toFixed(0)}K
                </p>
              </div>
              <AlertCircle className="text-red-600" size={40} />
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Inventory Alerts
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
              <div className="bg-orange-600 p-3 rounded-lg">
                <Package className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {dashboardData.lowStockItems} Items Low in Stock
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Requiring reorder attention
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-sm text-gray-600 font-semibold">Last checked</span>
              <span className="text-sm font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">
                2 mins ago
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Transactions
          </h2>
          <a href="#" className="text-[#0f3460] hover:text-[#e94560] font-semibold text-sm transition">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
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
              ].map((row) => (
                <tr key={row.invoice} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-gray-700">{row.date}</td>
                  <td className="py-4 px-4 font-bold text-[#0f3460]">
                    {row.invoice}
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-medium">{row.customer}</td>
                  <td className="py-4 px-4 font-bold text-gray-900">
                    KES {(row.amount / 1000).toFixed(0)}K
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                        row.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
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
