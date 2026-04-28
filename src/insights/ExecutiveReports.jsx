import React, { useState } from 'react';
import {
  FileText, BarChart2, AlertOctagon, TrendingUp,
  Calendar, Download, CheckCircle2, Clock, ChevronRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { exportToExcel } from '../exports/exportExcel';
import { exportToPDF }   from '../exports/exportPDF';
import Papa from 'papaparse';

const now = new Date();
const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const getWeeklyRange = () => {
  const end   = new Date(now);
  const start = new Date(now); start.setDate(start.getDate() - 7);
  return `${fmtDate(start)} – ${fmtDate(end)}`;
};
const getMonthlyRange = () => {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return `${fmtDate(start)} – ${fmtDate(now)}`;
};

export default function ExecutiveReports() {
  const { filteredData, kpis, salesTrend, topProducts, formatCurrency } = useData();
  const [status, setStatus] = useState({});

  const flash = (key) => {
    setStatus(s => ({ ...s, [key]: 'generating' }));
    setTimeout(() => setStatus(s => ({ ...s, [key]: 'done' })), 1800);
    setTimeout(() => setStatus(s => ({ ...s, [key]: null  })), 4000);
  };

  const handleWeekly = () => {
    flash('weekly');
    const rows = filteredData.slice(0, 50).map(r => ({
      'Order ID':     r.Order_ID,
      'Date':         r.Date,
      'Product':      r.Product,
      'Category':     r.Category,
      'Channel':      r.Channel,
      'Region':       r.Region,
      'Revenue':      r.Revenue,
      'Rating':       r.Rating,
    }));
    exportToExcel(rows, `CommerceIQ_Weekly_${now.toISOString().slice(0,10)}.xlsx`);
  };

  const handleMonthly = () => {
    flash('monthly');
    const summary = salesTrend.map(m => ({
      Month:    m.name,
      Revenue:  m.revenue,
      Orders:   m.orders,
    }));
    const csv = Papa.unparse(summary);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `CommerceIQ_Monthly_${now.toISOString().slice(0,7)}.csv`,
    });
    link.click();
  };

  const handleRisk = () => {
    flash('risk');
    const risky = filteredData.filter(r => r.Rating < 3 || r.Delivery_Days > 5);
    exportToExcel(risky, `CommerceIQ_Risk_${now.toISOString().slice(0,10)}.xlsx`);
  };

  const handleForecast = () => {
    flash('forecast');
    exportToPDF('dashboard-capture', `CommerceIQ_Forecast_${now.toISOString().slice(0,10)}.pdf`);
  };

  const REPORTS = [
    {
      key: 'weekly',
      label: 'Weekly Report',
      desc: getWeeklyRange(),
      icon: Calendar,
      color: 'text-accent',
      bg: 'bg-accent/10',
      meta: `${Math.min(filteredData.length, 50)} records · Excel`,
      action: handleWeekly,
    },
    {
      key: 'monthly',
      label: 'Monthly Summary',
      desc: getMonthlyRange(),
      icon: BarChart2,
      color: 'text-positive',
      bg: 'bg-positive/10',
      meta: `${salesTrend.length} months · CSV`,
      action: handleMonthly,
    },
    {
      key: 'risk',
      label: 'Risk Report',
      desc: 'Low-rating & delayed delivery orders',
      icon: AlertOctagon,
      color: 'text-alert',
      bg: 'bg-alert/10',
      meta: `${filteredData.filter(r => r.Rating < 3 || r.Delivery_Days > 5).length} flagged · Excel`,
      action: handleRisk,
    },
    {
      key: 'forecast',
      label: 'Forecast Report',
      desc: 'Full dashboard PDF snapshot',
      icon: TrendingUp,
      color: 'text-primary dark:text-accent',
      bg: 'bg-primary/10 dark:bg-accent/10',
      meta: 'PDF export',
      action: handleForecast,
    },
  ];

  return (
    <div className="card p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <FileText className="w-4 h-4 text-primary dark:text-accent" />
          </div>
          <div>
            <h3 className="section-title">Executive Reports</h3>
            <p className="section-sub">Click any report to download instantly</p>
          </div>
        </div>
        <div className="text-xs text-textmain dark:text-slate-500 font-medium flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {fmtDate(now)}
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <div className="text-center">
          <p className="text-[11px] text-textmain dark:text-slate-500 font-medium uppercase tracking-wide">Orders</p>
          <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">{kpis.totalOrders.toLocaleString()}</p>
        </div>
        <div className="text-center border-x border-slate-200 dark:border-slate-700">
          <p className="text-[11px] text-textmain dark:text-slate-500 font-medium uppercase tracking-wide">Revenue</p>
          <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">{formatCurrency(kpis.revenue)}</p>
        </div>
        <div className="text-center">
          <p className="text-[11px] text-textmain dark:text-slate-500 font-medium uppercase tracking-wide">Top Product</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">
            {topProducts[0]?.name ?? '—'}
          </p>
        </div>
      </div>

      {/* Report Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
        {REPORTS.map(r => {
          const Icon = r.icon;
          const st   = status[r.key];
          return (
            <button
              key={r.key}
              onClick={r.action}
              disabled={st === 'generating'}
              className="report-card group text-left w-full disabled:opacity-60 disabled:cursor-wait"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 ${r.bg} group-hover:scale-110 transition-transform`}>
                  {st === 'done'
                    ? <CheckCircle2 className="w-4 h-4 text-positive" />
                    : <Icon className={`w-4 h-4 ${r.color}`} />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-accent transition-colors truncate">
                    {st === 'generating' ? 'Generating…' : st === 'done' ? 'Downloaded ✓' : r.label}
                  </p>
                  <p className="text-xs text-textmain dark:text-slate-500 mt-0.5 truncate">{r.desc}</p>
                  <span className="mt-1.5 inline-flex items-center text-[10px] font-semibold text-slate-400 dark:text-slate-600 gap-1">
                    <Download className="w-2.5 h-2.5" /> {r.meta}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-primary dark:group-hover:text-accent transition-colors shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
