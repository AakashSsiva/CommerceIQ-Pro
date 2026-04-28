import React from 'react';
import { useData } from '../context/DataContext';
import { Filter, Search } from 'lucide-react';

export default function FilterBar() {
  const { filters, updateFilter } = useData();

  const filterOptions = {
    dateRange: ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'Quarterly', 'Yearly'],
    region: ['All', 'North', 'South', 'East', 'West', 'International'],
    channel: ['All', 'Website', 'Mobile App', 'Marketplace', 'Retail Partner'],
    category: ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories'],
    rating: ['All', '1', '2', '3', '4', '5'],
  };

  return (
    <div className="bg-cards dark:bg-darkcards p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium px-2">
        <Filter className="w-4 h-4" />
        <span>Executive Filters</span>
      </div>
      
      {Object.keys(filterOptions).map(key => (
        <div key={key} className="flex flex-col gap-1">
          <select 
            value={filters[key]} 
            onChange={(e) => updateFilter(key, e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg px-3 py-2 outline-none focus:border-primary transition-all cursor-pointer min-w-[130px]"
          >
            <option disabled value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
            {filterOptions[key].map(opt => (
              <option key={opt} value={opt}>{opt === 'All' ? `All ${key}` : opt}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex-1 min-w-[200px] relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search Product..." 
          value={filters.searchProduct}
          onChange={(e) => updateFilter('searchProduct', e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium outline-none focus:border-primary transition-all dark:text-white"
        />
      </div>
    </div>
  );
}
