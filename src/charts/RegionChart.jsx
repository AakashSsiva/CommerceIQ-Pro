import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell
} from 'recharts';
import { useData } from '../context/DataContext';

const COLORS = ['#003A70', '#3B82F6', '#00A676', '#8B5CF6'];

export default function RegionChart() {
  const { regionComparison, formatCurrency } = useData();

  return (
    <div className="card p-6 flex flex-col min-h-[320px]">
      <div className="mb-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Region Comparison</h3>
        <p className="text-xs text-textmain dark:text-slate-500 mt-0.5">Revenue breakdown by geography</p>
      </div>
      <div className="flex-1 min-h-[220px]">
        {regionComparison.length === 0
          ? <div className="h-full flex items-center justify-center text-sm text-textmain dark:text-slate-500">No data</div>
          : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionComparison} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} width={52} />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  formatter={v => [formatCurrency(v), 'Revenue']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                  {regionComparison.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
      </div>
    </div>
  );
}
