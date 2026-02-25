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
            <Package size={32} className="text-blue-600" /> Inventory Management
          </h1>
          <p className="text-gray-600 mt-1">Track and manage product stock levels</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-lg">
              <Package size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {lowStockItems.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
              <AlertCircle size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Stock Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                KES{" "}
                {products
                  .reduce((sum, p) => sum + (p.cost || 0) * p.quantity, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-lg">
              <TrendingDown size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Inactive Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {products.filter((p) => p.status === "INACTIVE").length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-3 rounded-lg">
              <Package size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl shadow-sm p-6 flex items-start gap-4 transform transition-all hover:shadow-md">
          <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={24} />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-900 mb-2 text-lg">Low Stock Alert</h3>
            <p className="text-orange-800 text-sm">
              {lowStockItems.length} item(s) are below reorder level. Click "View Low Stock" to manage.
            </p>
            <button className="mt-3 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm transition-colors">
              View Low Stock Items
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {isLoading ? (
        <div className="card p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Reorder Level</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Unit Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900 font-medium">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={
                        product.quantity <= product.reorderLevel
                          ? "text-red-600 font-bold flex items-center gap-1"
                          : "text-gray-900 font-semibold"
                      }
                    >
                      {product.quantity <= product.reorderLevel && (
                        <TrendingDown size={16} />
                      )}
                      {product.quantity} {product.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{product.reorderLevel}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">KES {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.status === "ACTIVE"
                          ? "badge-success"
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
