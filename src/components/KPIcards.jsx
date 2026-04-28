import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import {
  ShoppingCart, DollarSign, Package, Star, Truck, TrendingUp
} from 'lucide-react';

// Tiny inline sparkline using SVG
function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function KPIcards() {
  const { kpis, salesTrend, formatCurrency } = useData();

  const sparkRevenues = salesTrend.map(d => d.revenue);
  const sparkOrders   = salesTrend.map(d => d.orders);

  const cards = [
    {
      label: 'Total Orders',
      value: kpis.totalOrders.toLocaleString(),
      trend: '+12.5%',
      positive: true,
      icon: ShoppingCart,
      spark: sparkOrders,
      sparkColor: '#003A70',
    },
    {
      label: 'Gross Revenue',
      value: formatCurrency(kpis.revenue),
      trend: '+8.2%',
      positive: true,
      icon: DollarSign,
      spark: sparkRevenues,
      sparkColor: '#00A676',
    },
    {
      label: 'Quantity Sold',
      value: kpis.qty.toLocaleString(),
      trend: '+5.1%',
      positive: true,
      icon: Package,
      spark: sparkOrders,
      sparkColor: '#3B82F6',
    },
    {
      label: 'Avg Rating',
      value: kpis.avgRating,
      trend: '+0.3%',
      positive: true,
      icon: Star,
      spark: [3.8, 4.0, 4.1, 4.2, 4.3, kpis.avgRating],
      sparkColor: '#F59E0B',
    },
    {
      label: 'Avg Delivery',
      value: `${kpis.avgDelivery}d`,
      trend: '-0.5d',
      positive: true,
      icon: Truck,
      spark: [4.5, 4.2, 4.0, 3.9, 3.8, kpis.avgDelivery],
      sparkColor: '#8B5CF6',
    },
    {
      label: 'Growth %',
      value: `${kpis.growth}%`,
      trend: 'MoM',
      positive: true,
      icon: TrendingUp,
      spark: [8, 10, 11, 13, 14, kpis.growth],
      sparkColor: '#E4572E',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="card p-5 flex flex-col gap-3 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-4 h-4 text-primary dark:text-accent" />
              </div>
              <span className={card.positive ? 'kpi-badge-positive' : 'kpi-badge-alert'}>
                {card.trend}
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-textmain dark:text-slate-500">
                {card.label}
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                {card.value}
              </h2>
            </div>

            <div className="mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
              <Sparkline data={card.spark} color={card.sparkColor} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
