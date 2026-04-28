import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockForecast = [
  { name: 'Month 1', actual: 4000, forecast: 4200 },
  { name: 'Month 2', actual: 4500, forecast: 4600 },
  { name: 'Month 3', actual: 5000, forecast: 5100 },
  { name: 'Month 4', actual: null, forecast: 5800 },
  { name: 'Month 5', actual: null, forecast: 6500 },
];

export default function ForecastChart() {
  return (
    <div className="bg-cards dark:bg-darkcards rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col p-6 min-h-[350px]">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">AI Forecast</h3>
        <p className="text-sm text-textmain dark:text-slate-400 mt-1">Predictive 2-month revenue outlook</p>
      </div>
      <div className="flex-1 w-full h-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.2} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 600 }}
            />
            <Line type="monotone" dataKey="actual" stroke="#003A70" strokeWidth={3} dot={{r:4}} />
            <Line type="monotone" dataKey="forecast" stroke="#E4572E" strokeWidth={3} strokeDasharray="5 5" dot={{r:4}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
