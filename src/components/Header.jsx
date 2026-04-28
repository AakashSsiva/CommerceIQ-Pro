import React, { useRef } from 'react';
import { Package, Upload, Moon, Sun } from 'lucide-react';
import { useData } from '../context/DataContext';
import { parseCSV } from '../utils/csvParser';
import ExportPanel       from '../exports/ExportPanel';
import NotificationBell  from './NotificationBell';
import ProfileMenu       from './ProfileMenu';

export default function Header() {
  const { handleImport, theme, setTheme } = useData();
  const fileRef = useRef(null);

  const onFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = await parseCSV(file);
      handleImport(data);
    } catch (err) {
      alert('CSV parse error: ' + err.message);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <header className="card px-6 py-4 flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* ── Brand ── */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-accent/10">
          <Package className="w-6 h-6 text-primary dark:text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
            CommerceIQ <span className="text-primary dark:text-accent">Pro</span>
          </h1>
          <p className="text-xs text-textmain dark:text-slate-500 font-medium mt-0.5">
            Executive Sales Intelligence Platform
          </p>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Hidden file input */}
        <input ref={fileRef} type="file" accept=".csv" onChange={onFile} className="hidden" />

        {/* Import */}
        <button onClick={() => fileRef.current?.click()} className="btn-ghost">
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Import CSV</span>
        </button>

        {/* Export Panel */}
        <ExportPanel />

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="btn-icon"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light'
            ? <Moon className="w-4 h-4" />
            : <Sun  className="w-4 h-4 text-yellow-400" />}
        </button>

        {/* Notification Bell */}
        <NotificationBell />

        {/* Divider */}
        <div className="w-px h-7 bg-slate-200 dark:bg-slate-700" />

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </header>
  );
}
