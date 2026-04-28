import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const COLORS = ['#003A70', '#00A676', '#3b82f6', '#8b5cf6', '#f59e0b'];

export default function ChannelChart() {
  const { channelPerformance } = useDashboard();
  
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-slate-100 flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-slate-900">Channel Performance</h3>
        <p className="text-sm text-slate-500">Revenue by acquisition channel</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        {channelPerformance.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">No data</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelPerformance} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} width={100} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {channelPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
