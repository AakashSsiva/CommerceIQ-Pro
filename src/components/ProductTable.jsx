import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown, Star, TrendingUp, TrendingDown } from 'lucide-react';

export default function ProductTable() {
  const { topProducts, formatCurrency } = useData();
  const [sortKey, setSortKey]   = useState('revenue');
  const [sortDir, setSortDir]   = useState('desc');
  const [search,  setSearch]    = useState('');

  const toggle = (key) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = useMemo(() => {
    const filtered = topProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].sort((a, b) =>
      sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
    );
  }, [topProducts, sortKey, sortDir, search]);

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 opacity-30" />;
    return sortDir === 'desc'
      ? <ArrowDown className="w-3 h-3 text-primary dark:text-accent" />
      : <ArrowUp   className="w-3 h-3 text-primary dark:text-accent" />;
  };

  const Th = ({ col, label }) => (
    <th
      onClick={() => toggle(col)}
      className="py-3 px-3 font-semibold text-left cursor-pointer hover:text-primary dark:hover:text-accent transition-colors select-none"
    >
      <div className="flex items-center gap-1">
        {label} <SortIcon col={col} />
      </div>
    </th>
  );

  return (
    <div className="card p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Live Product Intelligence</h3>
          <p className="text-xs text-textmain dark:text-slate-500 mt-0.5">Click columns to sort · Live filtered view</p>
        </div>
        <input
          type="text"
          placeholder="Search product…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="filter-select text-sm min-w-[160px]"
        />
      </div>

      <div className="overflow-x-auto">
        {sorted.length === 0
          ? <div className="h-24 flex items-center justify-center text-sm text-textmain dark:text-slate-500">No matching products</div>
          : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-600">
                  <th className="py-3 px-3 font-semibold text-left">#</th>
                  <th className="py-3 px-3 font-semibold text-left">Product</th>
                  <th className="py-3 px-3 font-semibold text-left">Category</th>
                  <Th col="revenue" label="Revenue" />
                  <Th col="qty"     label="Qty" />
                  <Th col="avgRating" label="Rating" />
                  <th className="py-3 px-3 font-semibold text-left">Trend</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sorted.map((item, i) => {
                    const isTop    = i === 0;
                    const isWeak   = item.avgRating < 3;
                    return (
                      <motion.tr
                        key={item.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-slate-50 dark:border-slate-800/50 last:border-none hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3.5 px-3 text-slate-400 dark:text-slate-600 font-mono text-xs">{i + 1}</td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                            {isTop && (
                              <span className="text-[10px] bg-positive/10 text-positive font-bold px-2 py-0.5 rounded-full">TOP</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-textmain dark:text-slate-400 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-200">
                          {formatCurrency(item.revenue)}
                        </td>
                        <td className="py-3.5 px-3 text-positive font-semibold">{item.qty}</td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1">
                            <Star className={`w-3 h-3 ${isWeak ? 'text-alert' : 'text-yellow-400'}`} fill="currentColor" />
                            <span className={`font-semibold text-xs ${isWeak ? 'text-alert' : 'text-slate-700 dark:text-slate-300'}`}>
                              {item.avgRating}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          {isWeak
                            ? <TrendingDown className="w-4 h-4 text-alert" />
                            : <TrendingUp   className="w-4 h-4 text-positive" />}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}
