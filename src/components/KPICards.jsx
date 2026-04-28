import React from 'react';
import { ShoppingCart, DollarSign, Star, Clock } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function KPICards() {
  const { kpis } = useDashboard();
  
  const kpiData = [
    { label: 'Total Orders', value: kpis.totalOrders.toLocaleString(), trend: '+12.5%', isPositive: true, icon: ShoppingCart },
    { label: 'Revenue', value: `$${kpis.revenue.toLocaleString()}`, trend: '+8.2%', isPositive: true, icon: DollarSign },
    { label: 'Avg Rating', value: kpis.avgRating, trend: '+0.1%', isPositive: true, icon: Star },
    { label: 'Avg Delivery', value: `${kpis.avgDelivery} Days`, trend: '-10%', isPositive: true, icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-slate-100 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-primary/5 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.isPositive ? 'bg-positive/10 text-positive' : 'bg-red-100 text-red-600'}`}>
                {item.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{item.label}</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{item.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
