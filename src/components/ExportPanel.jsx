import React from 'react';
import { Download, FileSpreadsheet, FileText, FileImage } from 'lucide-react';
import { useData } from '../context/DataContext';
import { exportToExcel } from '../utils/exportExcel';
import { exportToPDF } from '../utils/exportPDF';
import Papa from 'papaparse';

export default function ExportPanel() {
  const { filteredData } = useData();

  const handleCSV = () => {
    if (filteredData.length === 0) return alert('No data to export');
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CommerceIQ_Export.csv";
    link.click();
  };

  const handleExcel = () => {
    if (filteredData.length === 0) return alert('No data to export');
    exportToExcel(filteredData);
  };

  const handlePDF = () => {
    exportToPDF('dashboard-capture', 'CommerceIQ_Executive_Report.pdf');
  };

  return (
    <div className="relative group flex-1 md:flex-none">
      <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-sm">
        <Download className="w-4 h-4" />
        <span>Export</span>
      </button>
      <div className="absolute right-0 mt-2 w-56 bg-cards dark:bg-darkcards border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
        <button onClick={handleExcel} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-textmain dark:text-darktext hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800">
          <FileSpreadsheet className="w-4 h-4 text-positive" /> Excel Export
        </button>
        <button onClick={handleCSV} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-textmain dark:text-darktext hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800">
          <FileText className="w-4 h-4 text-primary" /> CSV Export
        </button>
        <button onClick={handlePDF} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-textmain dark:text-darktext hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <FileImage className="w-4 h-4 text-alert" /> PDF Snapshot
        </button>
      </div>
    </div>
  );
}
