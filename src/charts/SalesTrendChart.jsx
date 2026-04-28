import React, { useState, useEffect, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { useData } from '../context/DataContext';
import { Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, formatCurrency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl px-4 py-3 text-sm pointer-events-none">
      <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs mb-2 uppercase tracking-wider">{label}</p>
      <p className="font-extrabold text-slate-900 dark:text-white text-base">{formatCurrency(payload[0]?.value ?? 0)}</p>
      {payload[1] && (
        <p className="text-positive font-semibold text-xs mt-1">{payload[1].value} orders</p>
      )}
    </div>
  );
};

export default function SalesTrendChart() {
  const { salesTrend, formatCurrency } = useData();

  // Live ticker: add a tiny random delta to the latest month every 3 s
  const [liveTrend, setLiveTrend] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const tickerRef = useRef(null);

  useEffect(() => {
    setLiveTrend(salesTrend);
  }, [salesTrend]);

  useEffect(() => {
    tickerRef.current = setInterval(() => {
      setLiveTrend(prev => {
        if (!prev.length) return prev;
        const next = [...prev];
        const last = { ...next[next.length - 1] };
        // Simulate live revenue tick ±2%
        const delta = last.revenue * (Math.random() * 0.04 - 0.02);
        last.revenue = Math.max(0, Math.round(last.revenue + delta));
        last.orders  = last.orders + (Math.random() > 0.5 ? 1 : 0);
        next[next.length - 1] = last;
        setLastUpdate(new Date());
        return next;
      });
    }, 3000);
    return () => clearInterval(tickerRef.current);
  }, []);

  const maxRev = Math.max(...liveTrend.map(d => d.revenue), 1);

  return (
    <div className="card p-6 flex flex-col min-h-[360px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="section-title">Sales Trend</h3>
          <p className="section-sub">Monthly revenue performance · live feed</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-positive bg-positive/10 px-3 py-1.5 rounded-full">
          <span className="live-dot" />
          <span>LIVE</span>
          <span className="text-slate-400 dark:text-slate-600 font-normal ml-1">
            {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Summary row */}
      {liveTrend.length > 0 && (
        <div className="flex gap-6 mb-5 pb-5 border-b border-slate-50 dark:border-slate-800">
          <div>
            <p className="text-xs text-textmain dark:text-slate-500 font-medium">Peak Month</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {liveTrend.find(d => d.revenue === maxRev)?.name ?? '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-textmain dark:text-slate-500 font-medium">Total Revenue</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {formatCurrency(liveTrend.reduce((s, d) => s + d.revenue, 0))}
            </p>
          </div>
          <div>
            <p className="text-xs text-textmain dark:text-slate-500 font-medium">Total Orders</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {liveTrend.reduce((s, d) => s + d.orders, 0).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="flex-1 min-h-[200px]">
        {liveTrend.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-textmain dark:text-slate-500">
            No data for selected filters
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={liveTrend} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#003A70" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#003A70" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#00A676" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#00A676" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
              <XAxis
                dataKey="name"
                axisLine={false} tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                dy={8}
              />
              <YAxis
                axisLine={false} tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} />
              <ReferenceLine
                x={liveTrend[liveTrend.length - 1]?.name}
                stroke="#E4572E"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{ value: 'NOW', position: 'top', fontSize: 9, fill: '#E4572E', fontWeight: 700 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#003A70"
                strokeWidth={2.5}
                fill="url(#gradPrimary)"
                dot={false}
                activeDot={{ r: 5, fill: '#003A70', strokeWidth: 0 }}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#00A676"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                fill="url(#gradOrders)"
                dot={false}
                activeDot={{ r: 4, fill: '#00A676', strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-textmain dark:text-slate-500 font-medium">
          <span className="w-4 h-0.5 bg-primary rounded-full inline-block" /> Revenue
        </div>
        <div className="flex items-center gap-2 text-xs text-textmain dark:text-slate-500 font-medium">
          <span className="w-4 h-0.5 bg-positive rounded-full inline-block border-dashed" /> Orders
        </div>
        <div className="flex items-center gap-2 text-xs text-alert font-semibold ml-auto">
          <Activity className="w-3.5 h-3.5" /> Live updating every 3s
        </div>
      </div>
    </div>
  );
}
