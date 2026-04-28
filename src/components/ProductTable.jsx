import React from 'react';
import { useDashboard } from '../context/DashboardContext';

export default function ProductTable() {
  const { topProducts } = useDashboard();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-slate-100 flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-slate-900">Top Products</h3>
        <p className="text-sm text-slate-500">Highest converting items for selected filters</p>
      </div>
      <div className="overflow-x-auto flex-1">
        {topProducts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 font-medium py-10">No products found</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase text-slate-500 tracking-wider">
                <th className="py-3 px-2 font-semibold">Product Name</th>
                <th className="py-3 px-2 font-semibold">Category</th>
                <th className="py-3 px-2 font-semibold">Revenue</th>
                <th className="py-3 px-2 font-semibold text-right">Conv.</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {topProducts.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-2 font-medium text-slate-900">{item.name}</td>
                  <td className="py-4 px-2 text-slate-500">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">{item.category}</span>
                  </td>
                  <td className="py-4 px-2 font-semibold text-slate-800">{item.revenue}</td>
                  <td className="py-4 px-2 text-right text-positive font-bold">{item.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
