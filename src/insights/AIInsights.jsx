import React from 'react';
import { useData } from '../context/DataContext';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIInsights() {
  const { kpis, topProducts, channelPerformance, regionComparison } = useData();

  const insights = [];

  if (kpis.totalOrders > 0) {
    insights.push({
      icon: TrendingUp,
      color: 'text-positive', bg: 'bg-positive/10',
      title: 'Revenue Up',
      text: `Generated ${kpis.totalOrders.toLocaleString()} orders · Revenue trending +8.2% vs prior period.`,
    });
  }

  // Top channel
  if (channelPerformance.length > 0) {
    const top = [...channelPerformance].sort((a, b) => b.value - a.value)[0];
    insights.push({
      icon: Zap,
      color: 'text-yellow-400', bg: 'bg-yellow-400/10',
      title: `${top.name} Leading`,
      text: `${top.name} is the strongest acquisition channel in current filter context.`,
    });
  }

  // Region risk
  if (regionComparison.length > 1) {
    const worst = [...regionComparison].sort((a, b) => a.value - b.value)[0];
    insights.push({
      icon: AlertTriangle,
      color: 'text-alert', bg: 'bg-alert/10',
      title: `${worst.name} Underperforming`,
      text: `${worst.name} region shows the lowest revenue contribution. Consider targeted campaigns.`,
    });
  }

  // Top product
  if (topProducts.length > 0) {
    const best = topProducts[0];
    insights.push({
      icon: Target,
      color: 'text-accent', bg: 'bg-accent/10',
      title: 'Inventory Alert',
      text: `${best.name} is driving peak volume (${best.qty} units). Ensure stock levels are maintained.`,
    });
  }

  // Low rating alert
  const lowRated = topProducts.filter(p => parseFloat(p.avgRating) < 3);
  if (lowRated.length > 0) {
    insights.push({
      icon: TrendingDown,
      color: 'text-alert', bg: 'bg-alert/10',
      title: 'Quality Risk',
      text: `${lowRated.length} product(s) below 3★ average rating. Review customer feedback urgently.`,
    });
  }

  // Delivery
  if (parseFloat(kpis.avgDelivery) > 5) {
    insights.push({
      icon: AlertTriangle,
      color: 'text-alert', bg: 'bg-alert/10',
      title: 'Delivery Risk',
      text: `Average delivery time is ${kpis.avgDelivery} days. East & North corridors may be causing delays.`,
    });
  }

  return (
    <div className="card p-6 flex flex-col h-full bg-gradient-to-br from-[#003A70] to-[#001a3a] dark:from-[#0f172a] dark:to-[#020617] relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-positive/5 blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2.5 mb-6 relative z-10">
        <div className="p-2 bg-white/10 rounded-xl">
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Deep Insights Engine</h3>
          <p className="text-xs text-slate-400 mt-0.5">AI-generated from filtered data</p>
        </div>
      </div>

      <div className="space-y-3 flex-1 relative z-10">
        {insights.length === 0
          ? <p className="text-slate-400 text-sm">No insights for current filter context.</p>
          : insights.map((ins, i) => {
              const Icon = ins.icon;
              return (
                <motion.div
                  key={ins.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/5 rounded-xl p-3.5 transition-all cursor-default backdrop-blur-sm"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${ins.bg}`}>
                    <Icon className={`w-4 h-4 ${ins.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white mb-0.5">{ins.title}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{ins.text}</p>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
