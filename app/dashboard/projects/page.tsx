'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Planning';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Hardware Inventory System',
      description: 'Complete inventory management solution',
      client: 'Elegant Steel Hardware',
      status: 'Active',
      startDate: '2026-01-15',
      endDate: '2026-03-15',
      budget: 500000,
      spent: 320000,
      progress: 65
    },
    {
      id: '2',
      name: 'Sales Platform Integration',
      description: 'Integration with e-commerce platform',
      client: 'Online Sales Corp',
      status: 'Active',
      startDate: '2026-02-01',
      endDate: '2026-04-30',
      budget: 750000,
      spent: 180000,
      progress: 24
    },
    {
      id: '3',
      name: 'Financial Reporting Suite',
      description: 'Advanced financial analytics',
      client: 'Accounting Firm Ltd',
      status: 'Planning',
      startDate: '2026-03-01',
      endDate: '2026-06-30',
      budget: 1200000,
      spent: 0,
      progress: 0
    }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects = projects.filter(p => 
    (statusFilter === 'All' || p.status === statusFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.client.toLowerCase().includes(search.toLowerCase()))
  );

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const activeCount = projects.filter(p => p.status === 'Active').length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'On Hold':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Planning':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase size={32} className="text-blue-600" />
            </div>
            Projects
          </h1>
          <p className="text-gray-600 mt-1">Manage and track project portfolios</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-medium"
        >
          <Plus size={20} /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Total Projects</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{projects.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Total Budget</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">KES {(totalBudget / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-medium">Total Spent</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">KES {(totalSpent / 1000).toFixed(0)}K</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search projects or clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-100 border-0 outline-none w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
            <option>Planning</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs font-medium">CLIENT</p>
                    <p className="text-gray-900 font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium">DURATION</p>
                    <p className="text-gray-900 font-medium">{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Budget</p>
                <p className="text-lg font-bold text-gray-900">KES {(project.budget / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-500 mt-1">Spent: KES {(project.spent / 1000).toFixed(0)}K</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Progress</span>
                <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded font-medium transition text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded font-medium transition text-sm">
                Edit Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No projects found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
