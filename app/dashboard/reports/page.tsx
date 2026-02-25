'use client';

import { BarChart4 } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Sales Report',
      description: 'Daily, monthly, and yearly sales analysis',
      icon: '📊',
      color: 'bg-blue-50 border-blue-300'
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels, movements, and valuations',
      icon: '📦',
      color: 'bg-green-50 border-green-300'
    },
    {
      title: 'Financial Statement',
      description: 'Income statement, balance sheet, cash flow',
      icon: '💰',
      color: 'bg-purple-50 border-purple-300'
    },
    {
      title: 'Customer Report',
      description: 'Receivables aging and customer analysis',
      icon: '👥',
      color: 'bg-orange-50 border-orange-300'
    },
    {
      title: 'Expense Report',
      description: 'Operating expenses and cost analysis',
      icon: '💸',
      color: 'bg-red-50 border-red-300'
    },
    {
      title: 'Payroll Report',
      description: 'Employee salaries and deductions',
      icon: '💼',
      color: 'bg-indigo-50 border-indigo-300'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart4 size={32} className="text-purple-600" />
          Reports
        </h1>
        <p className="text-gray-600 mt-1">Generate, view, and export business reports</p>
      </div>

      {/* Date Range Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium">
              Generate Reports
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className={`border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition ${report.color}`}>
            <div className="text-4xl mb-3">{report.icon}</div>
            <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{report.description}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition">
                View
              </button>
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-medium transition">
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Report</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Generated</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">Monthly Sales Report - Jan 2026</td>
              <td className="px-4 py-3">2 days ago</td>
              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Ready</span></td>
              <td className="px-4 py-3"><button className="text-blue-600 hover:underline">Download</button></td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">Quarterly P&L Statement</td>
              <td className="px-4 py-3">1 week ago</td>
              <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Ready</span></td>
              <td className="px-4 py-3"><button className="text-blue-600 hover:underline">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Coming Soon */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900 font-medium mb-2">📈 Coming Soon</p>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>✓ Advanced data filtering and drill-down</li>
          <li>✓ PDF, Excel, and CSV export formats</li>
          <li>✓ Scheduled report generation</li>
          <li>✓ Email delivery of reports</li>
          <li>✓ Custom report builder</li>
        </ul>
      </div>
    </div>
  );
}
