'use client';

import { Building2, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [suppliers] = useState([
    {
      id: 1,
      name: 'Steel Supplies Ltd',
      contact: 'John Doe',
      phone: '+254-722-123456',
      email: 'contact@steelsup.com',
      balance: 250000,
      status: 'Active',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Hardware Distributors',
      contact: 'Jane Smith',
      phone: '+254-733-654321',
      email: 'info@hardwaredist.com',
      balance: 180000,
      status: 'Active',
      rating: 4.2
    },
    {
      id: 3,
      name: 'Industrial Parts Co',
      contact: 'Mike Johnson',
      phone: '+254-712-789012',
      email: 'sales@industrialparts.com',
      balance: 420000,
      status: 'Active',
      rating: 4.8
    }
  ]);

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 size={32} className="text-yellow-600" />
            Suppliers
          </h1>
          <p className="text-gray-600 mt-1">Manage supplier relationships and purchase orders</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-medium">
          <Plus size={20} /> Add Supplier
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Suppliers</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{suppliers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Outstanding Bills</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 850,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Avg Rating</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">4.5 ⭐</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 border-0 outline-none w-full"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{supplier.name}</h3>
                <p className="text-gray-600 text-sm">{supplier.contact}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {supplier.status}
              </span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-700"><strong>Phone:</strong> {supplier.phone}</p>
              <p className="text-gray-700"><strong>Email:</strong> {supplier.email}</p>
              <p className="text-gray-700"><strong>Outstanding:</strong> <span className="text-orange-600 font-medium">KES {supplier.balance.toLocaleString()}</span></p>
              <p className="text-gray-700"><strong>Rating:</strong> {supplier.rating} ⭐</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded text-sm font-medium transition">
                View Details
              </button>
              <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded text-sm font-medium transition">
                Create PO
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900 font-medium mb-2">🏭 Coming Soon</p>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>✓ Purchase order management</li>
          <li>✓ Supplier performance tracking</li>
          <li>✓ Automated purchase order generation</li>
          <li>✓ Supplier payment history</li>
        </ul>
      </div>
    </div>
  );
}
