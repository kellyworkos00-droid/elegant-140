"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Search, Filter, Download, TrendingUp, DollarSign, UserCheck, AlertCircle, Mail, Phone, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

interface Customer {
  id: string;
  customerCode: string;
  name: string;
  email?: string;
  phone?: string;
  currentBalance: number;
  totalOutstanding: number;
  totalPaid: number;
  creditLimit?: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCustomers(data.customers || []);
      } catch (error) {
        toast.error("Failed to load customers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalances = customers.reduce((sum, c) => sum + c.currentBalance, 0);
  const totalOutstanding = customers.reduce((sum, c) => sum + c.totalOutstanding, 0);
  const activeCustomers = customers.filter(c => c.currentBalance > 0).length;
  
  const customersByBalance = [
    { name: "High Value", value: customers.filter(c => c.currentBalance > 100000).length },
    { name: "Medium Value", value: customers.filter(c => c.currentBalance > 50000 && c.currentBalance <= 100000).length },
    { name: "Low Value", value: customers.filter(c => c.currentBalance > 0 && c.currentBalance <= 50000).length },
    { name: "Inactive", value: customers.filter(c => c.currentBalance === 0).length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Users size={40} />
                Customer Management
              </h1>
              <p className="text-purple-100 text-lg">Manage customer relationships and track accounts</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/30">
                <Download size={18} />
                <span className="font-semibold">Export</span>
              </button>
              <button className="bg-white hover:bg-purple-50 text-purple-700 px-5 py-2 rounded-lg transition-all flex items-center gap-2 font-semibold shadow-lg">
                <Plus size={20} />
                Add Customer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Users size={28} className="text-white" />
            </div>
            <div className="bg-purple-50 px-3 py-1 rounded-full">
              <span className="text-purple-600 text-xs font-bold">Total</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Customers</p>
            <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
            <p className="text-gray-500 text-sm mt-2">Registered accounts</p>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <UserCheck size={28} className="text-white" />
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-green-600 text-xs font-bold">Active</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Active Customers</p>
            <p className="text-3xl font-bold text-gray-900">{activeCustomers}</p>
            <p className="text-gray-500 text-sm mt-2">With current balance</p>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <DollarSign size={28} className="text-white" />
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-600 text-xs font-bold">Balance</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Balances</p>
            <p className="text-3xl font-bold text-gray-900">KES {(totalBalances / 1000).toFixed(1)}K</p>
            <p className="text-gray-500 text-sm mt-2">Current account balances</p>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <AlertCircle size={28} className="text-white" />
            </div>
            <div className="bg-orange-50 px-3 py-1 rounded-full">
              <span className="text-orange-600 text-xs font-bold">Outstanding</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Outstanding</p>
            <p className="text-3xl font-bold text-orange-600">KES {(totalOutstanding / 1000).toFixed(1)}K</p>
            <p className="text-gray-500 text-sm mt-2">Pending payments</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={24} className="text-purple-600" />
              Customer Distribution
            </h2>
            <p className="text-sm text-gray-500 mt-1">By account value</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={customersByBalance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {customersByBalance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Customers</h2>
            <p className="text-sm text-gray-500 mt-1">By account balance</p>
          </div>
          <div className="space-y-3">
            {customers
              .sort((a, b) => b.currentBalance - a.currentBalance)
              .slice(0, 5)
              .map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.customerCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-purple-600">
                      KES {(customer.currentBalance / 1000).toFixed(1)}K
                    </p>
                    {customer.totalOutstanding > 0 && (
                      <p className="text-xs text-orange-600 font-semibold">
                        {(customer.totalOutstanding / 1000).toFixed(1)}K pending
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors font-medium">
          <Filter size={20} /> Filter
        </button>
      </div>

      {/* Customers Table */}
      {isLoading ? (
        <div className="card p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-900">No customers found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Customer Accounts ({filteredCustomers.length})</h3>
            <span className="text-sm text-gray-500">Showing {filteredCustomers.length} customers</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Customer Code</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Outstanding</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-purple-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-purple-600 font-bold">{customer.customerCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{customer.name}</td>
                    <td className="px-6 py-4 text-sm">
                      {customer.email || customer.phone ? (
                        <div className="space-y-1">
                          {customer.email && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail size={14} />
                              <span>{customer.email}</span>
                            </div>
                          )}
                          {customer.phone && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone size={14} />
                              <span>{customer.phone}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                      KES {customer.currentBalance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-bold ${customer.totalOutstanding > 0 ? "text-orange-600" : "text-green-600"}`}>
                        KES {customer.totalOutstanding.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-semibold text-xs transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
