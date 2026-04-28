import React from 'react';
import { Download, FileSpreadsheet, FileText, FileImage, Camera } from 'lucide-react';
import { useData } from '../context/DataContext';
import { exportToExcel } from './exportExcel';
import { exportToPDF }   from './exportPDF';
import Papa from 'papaparse';

export default function ExportPanel() {
  const { filteredData, setProfile, addNotification } = useData();

  const track = (label) => {
    setProfile(p => ({ ...p, reportsExported: p.reportsExported + 1 }));
    addNotification({ type: 'success', title: 'Export Complete', body: `${label} downloaded successfully.` });
  };

  const handleCSV = () => {
    if (!filteredData.length) return alert('No data to export.');
    const csv  = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'CommerceIQ_Export.csv' }).click();
    track('CSV Export');
  };

  const handleExcel = () => {
    if (!filteredData.length) return alert('No data.');
    exportToExcel(filteredData);
    track('Excel Export');
  };

  const handlePDF = () => {
    exportToPDF('dashboard-capture');
    track('PDF Report');
  };

  const handleScreenshot = () => {
    exportToPDF('dashboard-capture', 'CommerceIQ_Screenshot.pdf');
    track('Screenshot Export');
  };

  const items = [
    { label: 'Excel Export',    icon: FileSpreadsheet, color: 'text-positive', fn: handleExcel },
    { label: 'CSV Export',      icon: FileText,        color: 'text-primary dark:text-accent', fn: handleCSV },
    { label: 'PDF Report',      icon: FileImage,       color: 'text-alert',   fn: handlePDF },
    { label: 'Screenshot',      icon: Camera,          color: 'text-slate-500', fn: handleScreenshot },
  ];

  return (
    <div className="relative group">
      <button className="btn-primary">
        <Download className="w-4 h-4" />
        Export
      </button>
      <div className="absolute right-0 top-full mt-2 w-52 bg-cards dark:bg-darkcards border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden p-1">
        {items.map(it => {
          const Icon = it.icon;
          return (
            <button
              key={it.label}
              onClick={it.fn}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <Icon className={`w-4 h-4 ${it.color}`} />
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
