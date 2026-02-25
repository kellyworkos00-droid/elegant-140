"use client";

import { useEffect, useState } from "react";
import { Package, Plus, AlertCircle, TrendingDown } from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  reorderLevel: number;
  price: number;
  cost?: number;
  unit: string;
  status: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        toast.error("Failed to load inventory");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const lowStockItems = products.filter((p) => p.quantity <= p.reorderLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package size={32} /> Inventory Management
          </h1>
          <p className="text-gray-600 mt-1">Track and manage product stock levels</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Low Stock Items</p>
          <p className="text-3xl font-bold text-orange-600 mt-2 flex items-center gap-2">
            {lowStockItems.length}
            {lowStockItems.length > 0 && <AlertCircle size={24} />}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Stock Value</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            KES{" "}
            {products
              .reduce((sum, p) => sum + (p.cost || 0) * p.quantity, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Inactive Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {products.filter((p) => p.status === "INACTIVE").length}
          </p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg shadow p-4 flex items-start gap-4">
          <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-orange-900 mb-2">Low Stock Alert</h3>
            <p className="text-orange-800 text-sm">
              {lowStockItems.length} item(s) are below reorder level. Click "View Low Stock" to manage.
            </p>
            <button className="mt-2 text-orange-700 hover:text-orange-900 font-medium text-sm">
              View Low Stock Items
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-blue-200 mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reorder Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Unit Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={
                        product.quantity <= product.reorderLevel
                          ? "text-red-600 font-semibold flex items-center gap-1"
                          : "text-gray-900"
                      }
                    >
                      {product.quantity <= product.reorderLevel && (
                        <TrendingDown size={16} />
                      )}
                      {product.quantity} {product.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.reorderLevel}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">KES {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.status}
                    </span>
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
