'use client';

import { ShoppingCart, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function PurchaseOrdersPage() {
  const [search, setSearch] = useState('');
  const [orders] = useState([
    {
      id: 'PO-2026-001',
      supplier: 'Steel Supplies Ltd',
      date: '2026-02-20',
      amount: 350000,
      status: 'Delivered',
      items: 8
    },
    {
      id: 'PO-2026-002',
      supplier: 'Industrial Parts Co',
      date: '2026-02-22',
      amount: 125000,
      status: 'In Transit',
      items: 5
    },
    {
      id: 'PO-2026-003',
      supplier: 'Hardware Distributors',
      date: '2026-02-24',
      amount: 89500,
      status: 'Pending',
      items: 3
    }
  ]);

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={32} className="text-red-600" />
            Purchase Orders
          </h1>
          <p className="text-gray-600 mt-1">Manage purchase orders and supplier deliveries</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-medium">
          <Plus size={20} /> Create PO
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total POs</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">487</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Delivered</p>
          <p className="text-3xl font-bold text-green-600 mt-2">445</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">In Transit</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">28</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">Total Spent</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 15.2M</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by PO number or supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 border-0 outline-none w-full"
          />
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">PO Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                <td className="px-6 py-4">{order.supplier}</td>
                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">{order.items}</td>
                <td className="px-6 py-4 font-medium">KES {order.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Coming Soon */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900 font-medium mb-2">📦 Coming Soon</p>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>✓ Create and edit purchase orders</li>
          <li>✓ Goods receipt tracking</li>
          <li>✓ Invoice matching and reconciliation</li>
          <li>✓ Automated PO generation from inventory levels</li>
        </ul>
      </div>
    </div>
  );
}
