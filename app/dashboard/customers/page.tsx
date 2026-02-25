"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users size={32} className="text-blue-600" /> Customers
          </h1>
          <p className="text-gray-600 mt-1">Manage your customers and accounts</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Customer
        </button>
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
        <div className="card p-12 text-center text-gray-500">
          <Users size={48} className="mx-auto opacity-50 mb-4" />
          <p className="text-lg font-medium">No customers found</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Customer Code</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Outstanding</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900 font-bold">{customer.customerCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.email || <span className="text-gray-400">-</span>}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    KES {customer.currentBalance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-bold ${customer.totalOutstanding > 0 ? "text-red-600" : "text-green-600"}`}>
                      KES {customer.totalOutstanding.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold text-xs transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
