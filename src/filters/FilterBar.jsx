import React from 'react';
import { useData } from '../context/DataContext';
import { SlidersHorizontal, Search } from 'lucide-react';

const OPTS = {
  dateRange: ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'Quarterly', 'Yearly'],
  region:    ['All', 'North', 'South', 'East', 'West'],
  channel:   ['All', 'Website', 'Mobile App', 'Marketplace', 'Retail Partner'],
  category:  ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories'],
  gender:    ['All', 'Male', 'Female', 'Other'],
  rating:    ['All', '5', '4', '3', '2', '1'],
};

const LABELS = {
  dateRange: 'Date Range',
  region: 'Region',
  channel: 'Channel',
  category: 'Category',
  gender: 'Gender',
  rating: 'Rating ★',
};

export default function FilterBar() {
  const { filters, updateFilter } = useData();

  return (
    <div className="card px-5 py-4 flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold text-sm pr-2 border-r border-slate-200 dark:border-slate-700 mr-1">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </div>

      {Object.keys(OPTS).map(key => (
        <div key={key} className="flex flex-col">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1 px-1">
            {LABELS[key]}
          </label>
          <select
            value={filters[key]}
            onChange={e => updateFilter(key, e.target.value)}
            className="filter-select min-w-[120px]"
          >
            {OPTS[key].map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Product search */}
      <div className="flex flex-col flex-1 min-w-[180px]">
        <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1 px-1">
          Search Product
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="e.g. Headphones…"
            value={filters.searchProduct}
            onChange={e => updateFilter('searchProduct', e.target.value)}
            className="filter-select w-full pl-8"
          />
        </div>
      </div>
    </div>
  );
}
