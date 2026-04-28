import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function InsightPanel() {
  const { topProducts, kpis } = useDashboard();

  // Dynamic Insights based on Context
  const insights = [];
  
  if (kpis.totalOrders > 0) {
    insights.push({ id: 1, text: `Processed ${kpis.totalOrders} orders generating $${kpis.revenue.toLocaleString()} in revenue.`, icon: TrendingUp, color: 'text-positive', bg: 'bg-positive/10' });
  }

  if (kpis.avgDelivery > 4) {
    insights.push({ id: 2, text: `Average delivery time is high (${kpis.avgDelivery} days). Consider reviewing logistics.`, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100' });
  } else if (kpis.avgDelivery > 0) {
    insights.push({ id: 2, text: `Delivery performance is optimal at ${kpis.avgDelivery} days on average.`, icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-100' });
  }

  if (topProducts.length > 0) {
    insights.push({ id: 3, text: `${topProducts[0].name} is driving ${topProducts[0].conversion} of total volume.`, icon: Target, color: 'text-primary', bg: 'bg-white' });
  }

  if (insights.length === 0) {
    insights.push({ id: 0, text: 'Not enough data to generate insights.', icon: Target, color: 'text-slate-400', bg: 'bg-white/10' });
  }

  return (
    <div className="bg-gradient-to-br from-[#003A70] to-[#002850] rounded-2xl shadow-lg p-6 text-white flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-positive opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-700"></div>
      
      <div className="mb-6 flex items-center gap-2 relative z-10">
        <div className="p-1.5 bg-amber-400/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-amber-300" />
        </div>
        <h3 className="font-bold text-lg tracking-wide">AI Engine Insights</h3>
      </div>
      
      <div className="space-y-4 flex-1 relative z-10">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="flex gap-3 items-start bg-white/10 p-3.5 rounded-xl border border-white/5 hover:bg-white/20 transition-all duration-300 backdrop-blur-md cursor-default transform hover:-translate-y-0.5 hover:shadow-md">
              <div className={`p-2 rounded-lg shrink-0 ${insight.bg}`}>
                <Icon className={`w-4 h-4 ${insight.color}`} />
              </div>
              <p className="text-sm leading-relaxed text-slate-100 font-medium">{insight.text}</p>
            </div>
          );
        })}
      </div>
      
      <button className="mt-6 w-full py-2.5 bg-white/10 hover:bg-white/25 border border-white/20 rounded-xl text-sm font-semibold transition-all duration-300 text-white relative z-10 backdrop-blur-md shadow-sm">
        View Full Analysis
      </button>
    </div>
  );
}
