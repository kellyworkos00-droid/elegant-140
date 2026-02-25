'use client';

import { useEffect, useState } from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { Table, Column } from '@/components/ui/Table';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LoadingSkeleton, TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';

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
      {loading ? (
        <Card padding="lg">
          <CardHeader title="Sales Invoices" subtitle="Loading invoice data..." />
          <TableSkeleton rows={10} columns={7} />
        </Card>
      ) : filteredInvoices.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<FileText size={48} />}
            title="No invoices found"
            description={search ? "Try adjusting your search criteria" : "Create your first invoice to get started"}
            action={
              <Link href="/dashboard/sales/invoices/new">
                <Button variant="primary" leftIcon={<Plus size={20} />}>
                  Create Invoice
                </Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <Card padding="none">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Sales Invoices</h3>
              <p className="text-sm text-gray-500 mt-1">{filteredInvoices.length} invoices found</p>
            </div>
          </div>
          <div className="p-6">
            <Table
              data={filteredInvoices}
              columns={invoicesColumns}
              stickyHeader
              pagination
              pageSize={15}
            />
          </div>
        </Card>
      )}
    </div>
  );
}

// Define table columns with TypeScript type safety
const invoicesColumns: Column<Invoice>[] = [
  {
    key: 'number',
    label: 'Invoice #',
    sortable: true,
    width: '140px',
    render: (invoice) => (
      <span className="font-mono text-blue-600 font-bold text-sm">{invoice.number}</span>
    ),
  },
  {
    key: 'customer',
    label: 'Customer',
    sortable: true,
    render: (invoice) => (
      <span className="font-semibold text-gray-900">{invoice.customer?.name || 'N/A'}</span>
    ),
  },
  {
    key: 'invoiceDate',
    label: 'Invoice Date',
    sortable: true,
    width: '130px',
    render: (invoice) => (
      <span className="text-gray-600">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
    ),
  },
  {
    key: 'total',
    label: 'Amount',
    sortable: true,
    width: '130px',
    render: (invoice) => (
      <span className="font-bold text-gray-900">KES {(invoice.total || 0).toLocaleString()}</span>
    ),
  },
  {
    key: 'paid',
    label: 'Paid',
    sortable: true,
    width: '130px',
    render: (invoice) => (
      <span className="font-bold text-green-600">KES {(invoice.paid || 0).toLocaleString()}</span>
    ),
  },
  {
    key: 'remaining',
    label: 'Balance',
    sortable: true,
    width: '130px',
    render: (invoice) => (
      <span className="font-bold text-orange-600">
        KES {((invoice.total || 0) - (invoice.paid || 0)).toLocaleString()}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: '120px',
    render: (invoice) => (
      <Badge
        variant={
          invoice.status === 'PAID' ? 'success' :
          invoice.status === 'PENDING' ? 'warning' :
          'neutral'
        }
        dot
      >
        {invoice.status || 'DRAFT'}
      </Badge>
    ),
  },
];
