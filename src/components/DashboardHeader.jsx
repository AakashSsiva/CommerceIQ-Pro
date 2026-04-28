import React, { useRef } from 'react';
import { Upload, Download } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useDashboard } from '../context/DashboardContext';

export default function DashboardHeader() {
  const { loadImportedData, filteredData } = useDashboard();
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            loadImportedData(results.data);
            alert(`Successfully loaded ${results.data.length} rows from CSV.`);
          }
        }
      });
    } else if (file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        loadImportedData(data);
        alert(`Successfully loaded ${data.length} rows from Excel.`);
      };
      reader.readAsBinaryString(file);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExport = (type) => {
    if (filteredData.length === 0) {
      alert("No data to export!");
      return;
    }
    
    if (type === 'excel') {
      const ws = XLSX.utils.json_to_sheet(filteredData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "CommerceIQ_Data");
      XLSX.writeFile(wb, "CommerceIQ_Export.xlsx");
    } else if (type === 'csv') {
      const csv = Papa.unparse(filteredData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "CommerceIQ_Export.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (type === 'pdf') {
       window.print();
    }
  };

  return (
    <header className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between border border-slate-100 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">Real-time sales intelligence overview</p>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <input 
          type="file" 
          accept=".csv, .xlsx" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImport}
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Import Data</span>
        </button>
        
        <div className="relative group flex-1 md:flex-none">
          <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 hover:shadow-md transition-all duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <button onClick={() => handleExport('excel')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-50">Export to Excel</button>
            <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-50">Export CSV</button>
            <button onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Export Snapshot</button>
          </div>
        </div>
      </div>
    </header>
  );
}
