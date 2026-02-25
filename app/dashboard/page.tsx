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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                KES {(dashboardData.revenue / 1000).toFixed(0)}K
              </p>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={16} /> +12.5% from last month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign size={32} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Profit</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                KES {(dashboardData.profit / 1000).toFixed(0)}K
              </p>
              <p className="text-green-600 text-sm mt-2">
                71.1% profit margin
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp size={32} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                KES {(dashboardData.expenses / 1000).toFixed(0)}K
              </p>
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                <TrendingDown size={16} /> -8.2% from last month
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle size={32} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.totalOrders}
              </p>
              <p className="text-orange-600 text-sm mt-2">
                {dashboardData.todaysSales > 0
                  ? `KES ${(dashboardData.todaysSales / 1000).toFixed(0)}K today`
                  : "No sales today"}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <ShoppingCart size={32} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Expenses Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Sales & Expenses Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" />
              <Bar dataKey="expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receivables & Payables */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Accounts Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border-l-4 border-blue-500">
              <div>
                <p className="text-gray-600 text-sm">Accounts Receivable</p>
                <p className="text-2xl font-bold text-blue-600">
                  KES {(dashboardData.receivables / 1000).toFixed(0)}K
                </p>
              </div>
              <TrendingUp className="text-blue-600" size={32} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-transparent rounded-lg border-l-4 border-red-500">
              <div>
                <p className="text-gray-600 text-sm">Accounts Payable</p>
                <p className="text-2xl font-bold text-red-600">
                  KES {(dashboardData.payables / 1000).toFixed(0)}K
                </p>
              </div>
              <AlertCircle className="text-red-600" size={32} />
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Alerts
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-lg border-l-4 border-orange-500">
              <Package className="text-orange-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">
                  {dashboardData.lowStockItems} Items Low in Stock
                </p>
                <p className="text-sm text-gray-600">
                  Requiring reorder attention
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Last checked</span>
              <span className="text-sm font-semibold text-gray-900">
                2 minutes ago
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Invoice
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
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
                <tr key={row.invoice} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{row.date}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {row.invoice}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{row.customer}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    KES {(row.amount / 1000).toFixed(0)}K
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
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
