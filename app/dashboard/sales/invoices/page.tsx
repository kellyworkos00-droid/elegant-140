'use client';

import { useEffect, useState } from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  invoiceDate: string;
  dueDate: string;
  total: number;
  paid: number;
  remaining: number;
  tax: number;
  discount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/invoices', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.invoices || []);
        
        // Calculate totals
        const total = (data.invoices || []).reduce((sum: number, inv: any) => sum + (inv.total || 0), 0);
        const paid = (data.invoices || []).reduce((sum: number, inv: any) => sum + (inv.paid || 0), 0);
        const pending = total - paid;
        
        setTotalRevenue(total);
        setPaidAmount(paid);
        setPendingAmount(pending);
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(inv =>
    (inv.number || '').toLowerCase().includes(search.toLowerCase()) ||
    (inv.customer?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText size={32} className="text-blue-600" />
            Sales Invoices
          </h1>
          <p className="text-gray-600 mt-1">Manage and track customer invoices</p>
        </div>
        <Link
          href="/dashboard/sales/invoices/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={20} /> Create Invoice
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            KES {totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Amount Paid</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            KES {paidAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Pending Payment</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            KES {pendingAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by invoice number or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 border-0 outline-none w-full"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto mb-2"></div>
            <p>Loading invoices...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-8 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No invoices found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-blue-600">{invoice.number}</td>
                  <td className="px-6 py-4">{invoice.customer?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">KES {(invoice.total || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">KES {(invoice.paid || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">KES {((invoice.total || 0) - (invoice.paid || 0)).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status || 'DRAFT'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
