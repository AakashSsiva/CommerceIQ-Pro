import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Filter } from 'lucide-react';

export default function FilterBar() {
  const { filters, updateFilter } = useDashboard();

  const filterOptions = {
    dateRange: ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'Quarterly', 'Yearly'],
    region: ['All', 'North', 'South', 'East', 'West', 'International'],
    channel: ['All', 'Website', 'Mobile App', 'Marketplace', 'Retail Partner'],
    category: ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories'],
    gender: ['All', 'Male', 'Female', 'Other'],
    deliveryStatus: ['All', 'On Time', 'Delayed', 'Critical Delay'],
    rating: ['All', '1', '2', '3', '4', '5'],
  };

  const labels = {
    dateRange: 'Date Range',
    region: 'Region',
    channel: 'Channel',
    category: 'Category',
    gender: 'Gender',
    deliveryStatus: 'Delivery Status',
    rating: 'Rating',
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-slate-700 font-medium px-2">
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </div>
      
      {Object.keys(filterOptions).map(key => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1">
            {labels[key]}
          </label>
          <select 
            value={filters[key]} 
            onChange={(e) => updateFilter(key, e.target.value)}
            className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-3 py-1.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-w-[120px] cursor-pointer"
          >
            {filterOptions[key].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
