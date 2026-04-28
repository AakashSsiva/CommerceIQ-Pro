import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useData } from '../context/DataContext';

const COLORS = ['#003A70', '#00A676', '#E4572E', '#3B82F6', '#8B5CF6'];

const renderLabel = ({ name, percent }) =>
  `${(percent * 100).toFixed(0)}%`;

export default function CategoryDonutChart() {
  const { categoryDistribution } = useData();

  return (
    <div className="card p-6 flex flex-col min-h-[320px]">
      <div className="mb-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Category Distribution</h3>
        <p className="text-xs text-textmain dark:text-slate-500 mt-0.5">Order share by category</p>
      </div>
      <div className="flex-1 min-h-[220px]">
        {categoryDistribution.length === 0
          ? <div className="h-full flex items-center justify-center text-sm text-textmain dark:text-slate-500">No data</div>
          : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="46%"
                  innerRadius="52%"
                  outerRadius="72%"
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderLabel}
                >
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  formatter={(v, name) => [v + ' orders', name]}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
      </div>
    </div>
  );
}
