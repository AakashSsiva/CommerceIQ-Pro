import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useData } from '../context/DataContext';

const COLORS = ['#003A70', '#00A676', '#E4572E', '#3B82F6', '#8B5CF6'];

export default function ChannelChart() {
  const { channelPerformance, formatCurrency } = useData();

  return (
    <div className="card p-6 flex flex-col min-h-[320px]">
      <div className="mb-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Channel Performance</h3>
        <p className="text-xs text-textmain dark:text-slate-500 mt-0.5">Revenue by acquisition channel</p>
      </div>
      <div className="flex-1 min-h-[220px]">
        {channelPerformance.length === 0
          ? <div className="h-full flex items-center justify-center text-sm text-textmain dark:text-slate-500">No data</div>
          : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelPerformance} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} width={96} />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  formatter={v => [formatCurrency(v), 'Revenue']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {channelPerformance.map((_, i) => (
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
