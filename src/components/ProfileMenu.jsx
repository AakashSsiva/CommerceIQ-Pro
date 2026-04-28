import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Settings, FileText, Bell, LogOut,
  Shield, ChevronRight, Clock, Upload,
  Download, Star, X, Edit3, Check
} from 'lucide-react';
import { useData } from '../context/DataContext';

const ACCESS_COLORS = {
  Admin:     'bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent',
  Analyst:   'bg-positive/10 text-positive',
  Executive: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  Viewer:    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

/* ── Avatar Component ── */
function Avatar({ profile, size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-16 h-16 text-xl' };
  const initials = profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  if (profile.avatar) {
    return (
      <img
        src={profile.avatar}
        alt={profile.name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white dark:ring-slate-800`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white ring-2 ring-white dark:ring-slate-800 shrink-0`}>
      {initials}
    </div>
  );
}

/* ── Profile Full Panel ── */
function ProfilePanel({ onClose }) {
  const { profile, setProfile, savedReports, theme, setTheme, currency, language } = useData();
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const roles = ['Admin', 'Analyst', 'Executive', 'Viewer'];

  const saveName = () => {
    if (nameInput.trim()) setProfile(p => ({ ...p, name: nameInput.trim() }));
    setEditName(false);
  };

  const fmtDate = (iso) => {
    try { return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); }
    catch { return iso; }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1,    y: 0 }}
      exit={{ opacity: 0, scale: 0.95,    y: -10 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-full mt-2 w-80 bg-cards dark:bg-darkcards border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      {/* ── Identity Header ── */}
      <div className="bg-gradient-to-br from-primary to-accent p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#fff,_transparent)]" />
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 relative z-10">
          <Avatar profile={profile} size="lg" />
          <div>
            {editName ? (
              <div className="flex items-center gap-1">
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  autoFocus
                  className="bg-white/20 text-white placeholder-white/50 rounded-lg px-2 py-1 text-sm font-bold outline-none w-36 border border-white/30"
                />
                <button onClick={saveName} className="p-1 hover:bg-white/20 rounded text-white"><Check className="w-3 h-3" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-base leading-tight">{profile.name}</h3>
                <button onClick={() => setEditName(true)} className="p-1 hover:bg-white/20 rounded text-white/60 hover:text-white transition-colors">
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}
            <p className="text-white/75 text-xs mt-0.5">{profile.role}</p>
            <span className="mt-1.5 inline-block text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
              <Shield className="w-2.5 h-2.5 inline mr-1" />{profile.access}
            </span>
          </div>
        </div>
        <p className="text-white/60 text-xs mt-3 relative z-10">{profile.email}</p>
      </div>

      {/* ── Role Switcher ── */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">Access Level</p>
        <div className="flex gap-1.5 flex-wrap">
          {roles.map(r => (
            <button
              key={r}
              onClick={() => setProfile(p => ({ ...p, access: r }))}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                profile.access === r
                  ? (ACCESS_COLORS[r] || 'bg-primary/10 text-primary') + ' border-transparent'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 hover:border-primary/40 hover:text-primary dark:hover:text-accent'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── Analytics Strip ── */}
      <div className="mx-4 my-3 grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-textmain dark:text-slate-500 mb-1">
            <Clock className="w-3 h-3" />
          </div>
          <p className="text-[10px] text-textmain dark:text-slate-500 font-medium">Last Login</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-300 mt-0.5">Today</p>
        </div>
        <div className="text-center border-x border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center gap-1 text-textmain dark:text-slate-500 mb-1">
            <Upload className="w-3 h-3" />
          </div>
          <p className="text-[10px] text-textmain dark:text-slate-500 font-medium">Uploads</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-300 mt-0.5">{profile.filesUploaded} files</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-textmain dark:text-slate-500 mb-1">
            <Download className="w-3 h-3" />
          </div>
          <p className="text-[10px] text-textmain dark:text-slate-500 font-medium">Exports</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-300 mt-0.5">{profile.reportsExported}</p>
        </div>
      </div>

      {/* ── Preferences (quick) ── */}
      <div className="px-4 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">Quick Preferences</p>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Dark Mode</span>
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-accent' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-slate-800">
          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Currency</span>
          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400">{currency}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-slate-800">
          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Language</span>
          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400 uppercase">{language}</span>
        </div>
      </div>

      {/* ── Saved Reports ── */}
      {savedReports.length > 0 && (
        <div className="px-4 pb-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">Saved Reports</p>
          <div className="space-y-1.5">
            {savedReports.slice(0, 2).map(r => (
              <div key={r.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <Star className="w-3 h-3 text-yellow-400 shrink-0" fill="currentColor" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{r.label}</p>
                  <p className="text-[10px] text-textmain dark:text-slate-600">{r.saved}</p>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-700 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-2">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-alert hover:bg-alert/5 transition-colors text-sm font-semibold">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main ProfileMenu Component ── */
export default function ProfileMenu() {
  const { profile } = useData();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
        aria-label="Open profile menu"
      >
        <Avatar profile={profile} size="sm" />
        <div className="hidden md:block text-left">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{profile.name.split(' ')[0]}</p>
          <p className="text-[10px] text-textmain dark:text-slate-500 mt-0.5 truncate max-w-[80px]">{profile.access}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <svg className="w-3 h-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && <ProfilePanel onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
