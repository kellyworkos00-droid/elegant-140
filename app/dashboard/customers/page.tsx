"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Search, Filter, Download, TrendingUp, DollarSign, UserCheck, AlertCircle, Mail, Phone, BarChart3, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, Column } from "@/components/ui/Table";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LoadingSkeleton, TableSkeleton, CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";

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
        <Card padding="lg">
          <CardHeader title="Customer Accounts" subtitle="Loading customer data..." />
          <TableSkeleton rows={10} columns={6} />
        </Card>
      ) : filteredCustomers.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Users size={48} />}
            title="No customers found"
            description="Try adjusting your search criteria or add a new customer"
            action={
              <Button variant="primary" leftIcon={<Plus size={20} />}>
                Add First Customer
              </Button>
            }
          />
        </Card>
      ) : (
        <Card padding="none">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Customer Accounts</h3>
              <p className="text-sm text-gray-500 mt-1">{filteredCustomers.length} customers found</p>
            </div>
          </div>
          <div className="p-6">
            <Table
              data={filteredCustomers}
              columns={customersColumns}
              stickyHeader
              pagination
              pageSize={10}
            />
          </div>
        </Card>
      )}
    </div>
  );
}

// Define table columns with TypeScript type safety
const customersColumns: Column<Customer>[] = [
  {
    key: 'customerCode',
    label: 'Customer Code',
    sortable: true,
    width: '140px',
    render: (customer) => (
      <span className="font-mono text-purple-600 font-semibold text-sm">{customer.customerCode}</span>
    ),
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    render: (customer) => (
      <span className="font-semibold text-gray-900">{customer.name}</span>
    ),
  },
  {
    key: 'contact',
    label: 'Contact',
    width: '220px',
    render: (customer) => (
      customer.email || customer.phone ? (
        <div className="space-y-1">
          {customer.email && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={14} />
              <span>{customer.email}</span>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone size={14} />
              <span>{customer.phone}</span>
            </div>
          )}
        </div>
      ) : (
        <span className="text-gray-400">-</span>
      )
    ),
  },
  {
    key: 'currentBalance',
    label: 'Balance',
    sortable: true,
    width: '140px',
    render: (customer) => (
      <span className="font-bold text-gray-900">KES {customer.currentBalance.toLocaleString()}</span>
    ),
  },
  {
    key: 'totalOutstanding',
    label: 'Outstanding',
    sortable: true,
    width: '140px',
    render: (customer) => (
      <span className={`font-bold ${customer.totalOutstanding > 0 ? 'text-orange-600' : 'text-green-600'}`}>
        KES {customer.totalOutstanding.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    width: '120px',
    render: (customer) => (
      <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
        View
      </Button>
    ),
  },
];
