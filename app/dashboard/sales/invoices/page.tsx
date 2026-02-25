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
        <div className="card card-hover p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              KES {totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-lg">
            <FileText size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="card card-hover p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Amount Paid</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              KES {paidAmount.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-lg">
            <FileText size={24} className="text-green-600" />
          </div>
        </div>
        <div className="card card-hover p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Pending Payment</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              KES {pendingAmount.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
            <FileText size={24} className="text-orange-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by invoice number or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 border-0 outline-none w-full text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto mb-2"></div>
            <p className="text-gray-600 font-medium">Loading invoices...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-8 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No invoices found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600">{invoice.number}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{invoice.customer?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">KES {(invoice.total || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">KES {(invoice.paid || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-orange-600 font-bold">KES {((invoice.total || 0) - (invoice.paid || 0)).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      invoice.status === 'PAID' ? 'badge-success' :
                      invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
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
