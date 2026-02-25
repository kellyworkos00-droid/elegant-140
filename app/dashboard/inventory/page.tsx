"use client";

import { useEffect, useState } from "react";
import { Package, Plus, AlertCircle, TrendingDown, Search, Filter, Download, BarChart3, RefreshCw, Archive, TrendingUp, DollarSign, Boxes } from "lucide-react";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

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
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || 
                         (filterStatus === "LOW_STOCK" && product.quantity <= product.reorderLevel) ||
                         (filterStatus === "ACTIVE" && product.status === "ACTIVE") ||
                         (filterStatus === "INACTIVE" && product.status === "INACTIVE");
    return matchesSearch && matchesFilter;
  });

  const totalValue = products.reduce((sum, p) => sum + (p.cost || 0) * p.quantity, 0);
  const stockByCategory = [
    { name: "In Stock", value: products.filter(p => p.quantity > p.reorderLevel).length },
    { name: "Low Stock", value: lowStockItems.length },
    { name: "Inactive", value: products.filter(p => p.status === "INACTIVE").length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Boxes size={40} />
                Inventory Management
              </h1>
              <p className="text-blue-100 text-lg">Track stock levels, manage products, and monitor inventory value</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/30">
                <RefreshCw size={18} />
                <span className="font-semibold">Refresh</span>
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/30">
                <Download size={18} />
                <span className="font-semibold">Export</span>
              </button>
              <button className="bg-white hover:bg-blue-50 text-blue-700 px-5 py-2 rounded-lg transition-all flex items-center gap-2 font-semibold shadow-lg">
                <Plus size={20} />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Package size={28} className="text-white" />
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-600 text-xs font-bold">Total</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
            <p className="text-gray-500 text-sm mt-2">Active: {products.filter(p => p.status === "ACTIVE").length}</p>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <AlertCircle size={28} className="text-white" />
            </div>
            <div className="bg-orange-50 px-3 py-1 rounded-full">
              <span className="text-orange-600 text-xs font-bold">Alert</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Low Stock Items</p>
            <p className="text-3xl font-bold text-orange-600">{lowStockItems.length}</p>
            <p className="text-gray-500 text-sm mt-2">Requires attention</p>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <DollarSign size={28} className="text-white" />
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-green-600 text-xs font-bold">Value</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Stock Value</p>
            <p className="text-3xl font-bold text-gray-900">KES {(totalValue / 1000).toFixed(1)}K</p>
            <p className="text-gray-500 text-sm mt-2">Total inventory worth</p>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <Archive size={28} className="text-white" />
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded-full">
              <span className="text-gray-600 text-xs font-bold">Inactive</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Inactive Products</p>
            <p className="text-3xl font-bold text-gray-900">{products.filter((p) => p.status === "INACTIVE").length}</p>
            <p className="text-gray-500 text-sm mt-2">Not in circulation</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Distribution Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={24} className="text-blue-600" />
              Stock Distribution
            </h2>
            <p className="text-sm text-gray-500 mt-1">Overview of inventory status</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stockByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {stockByCategory.map((entry, index) => (
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

        {/* Top Products by Value */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900\">Top Products by Value</h2>
            <p className="text-sm text-gray-500 mt-1\">Highest value inventory items</p>
          </div>
          <div className="space-y-3">
            {products
              .sort((a, b) => (b.cost || 0) * b.quantity - (a.cost || 0) * a.quantity)
              .slice(0, 5)
              .map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500\">{product.quantity} {product.unit} in stock</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">
                      KES {((product.cost || 0) * product.quantity / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4\">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          >
            <option value="ALL">All Products</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
            <option value="LOW_STOCK">Low Stock Only</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <Filter size={20} />
            Filter
          </button>
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
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-900\">No products found</p>
          <p className="text-gray-500 mt-2\">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden\">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-gray-900\">Product Inventory ({filteredProducts.length})</h3>
            <span className="text-sm text-gray-500\">Showing {Math.min(filteredProducts.length, 15)} of {filteredProducts.length} products</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">Reorder Level</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">Unit Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider\">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200\">
                {filteredProducts.slice(0, 15).map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50 transition-colors\">
                    <td className="px-6 py-4 text-sm font-mono text-blue-600 font-bold\">{product.sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold\">{product.name}</td>
                    <td className="px-6 py-4 text-sm\">
                      <span
                        className={
                          product.quantity <= product.reorderLevel
                            ? "text-red-600 font-bold flex items-center gap-1"
                            : "text-gray-900 font-semibold"
                        }
                      >
                        {product.quantity <= product.reorderLevel && (
                          <AlertCircle size={16} />
                        )}
                        {product.quantity} {product.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium\">{product.reorderLevel} {product.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold\">KES {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm\">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                          product.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          product.status === "ACTIVE" ? "bg-green-600" : "bg-gray-600"
                        }`}></div>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm\">
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold text-xs transition-colors\">
                        Edit
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
