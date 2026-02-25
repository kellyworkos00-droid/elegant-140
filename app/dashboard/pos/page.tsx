'use client';

import { ShoppingCart, Plus, Trash2, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const products: Product[] = [
    { id: 1, name: 'Steel Bolt M10', price: 150, stock: 450 },
    { id: 2, name: 'Steel Rod 12mm', price: 450, stock: 120 },
    { id: 3, name: 'Iron Plate 3mm', price: 1200, stock: 85 },
    { id: 4, name: 'Washer Pack 100', price: 280, stock: 320 },
    { id: 5, name: 'Nuts M10 Box', price: 350, stock: 200 },
    { id: 6, name: 'Lock Pins', price: 180, stock: 95 }
  ];

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const updated = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updated);
      updateTotal(updated);
    } else {
      const newItem: CartItem = { ...product, quantity: 1 };
      const updated = [...cart, newItem];
      setCart(updated);
      updateTotal(updated);
    }
  };

  const removeFromCart = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    updateTotal(updated);
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
    updateTotal(updated);
  };

  const updateTotal = (items: CartItem[]) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart size={32} className="text-green-600" />
          Point of Sale (POS)
        </h1>
        <p className="text-gray-600 mt-1">Quick sales entry and checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold text-blue-600">KES {product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-3 py-2 rounded flex items-center gap-1 transition text-sm font-medium"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingCart size={24} /> Cart
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-blue-600 font-bold">KES {item.price}</p>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-bold"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-10 text-center border rounded text-xs py-1"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-right text-gray-900 font-bold text-sm">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (16%):</span>
                    <span>KES {Math.round(total * 0.16).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">KES {Math.round(total * 1.16).toLocaleString()}</span>
                  </div>

                  <div className="space-y-2 pt-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold transition flex items-center justify-center gap-2">
                      <DollarSign size={20} /> Checkout
                    </button>
                    <button
                      onClick={() => setCart([])}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded font-bold transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900 font-medium mb-2">🛍️ Coming Soon</p>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>✓ Payment method selection (Cash, Card, Mobile)</li>
          <li>✓ Discount application</li>
          <li>✓ Receipt printing</li>
          <li>✓ Daily sales report</li>
        </ul>
      </div>
    </div>
  );
}
