'use client';

import { BarChart3 } from 'lucide-react';

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={32} className="text-green-600" />
            Accounting
          </h1>
          <p className="text-gray-600 mt-1">Chart of accounts, ledger, and financial statements</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Assets</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 2,450,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Total Liabilities</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 890,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Net Income</p>
          <p className="text-3xl font-bold text-green-600 mt-2">KES 520,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Accounts</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">48</p>
        </div>
      </div>

      {/* Chart of Accounts Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Chart of Accounts</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Assets</p>
                <p className="text-sm text-gray-600">Current and fixed assets</p>
              </div>
              <p className="text-lg font-bold text-blue-600">KES 2,450,000</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Liabilities</p>
                <p className="text-sm text-gray-600">Payables and loans</p>
              </div>
              <p className="text-lg font-bold text-orange-600">KES 890,000</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Revenue</p>
                <p className="text-sm text-gray-600">Income from sales</p>
              </div>
              <p className="text-lg font-bold text-green-600">KES 5,200,000</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Expenses</p>
                <p className="text-sm text-gray-600">Operating costs</p>
              </div>
              <p className="text-lg font-bold text-red-600">KES 4,680,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900 font-medium mb-2">📋 Coming Soon</p>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>✓ General ledger view and journal entries</li>
          <li>✓ Financial statements (P&L, Balance Sheet, Cash Flow)</li>
          <li>✓ Trial balance and reconciliation</li>
          <li>✓ Bank reconciliation tools</li>
        </ul>
      </div>
    </div>
  );
}
