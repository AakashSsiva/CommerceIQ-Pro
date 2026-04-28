import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Info, AlertTriangle, CheckCircle2, AlertOctagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

const TYPE_META = {
  info:    { Icon: Info,          bg: 'bg-accent/10',   text: 'text-accent',   dot: 'bg-accent' },
  success: { Icon: CheckCircle2,  bg: 'bg-positive/10', text: 'text-positive', dot: 'bg-positive' },
  warning: { Icon: AlertTriangle, bg: 'bg-alert/10',    text: 'text-alert',    dot: 'bg-alert' },
  error:   { Icon: AlertOctagon,  bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-500', dot: 'bg-red-500' },
};

export default function NotificationBell() {
  const { notifications, unreadCount, markAllRead, markRead } = useData();
  const [open, setOpen] = useState(false);
  const ref  = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="btn-icon relative"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-alert text-white text-[10px] font-extrabold rounded-full flex items-center justify-center px-1 leading-none"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0, scale: 0.95,    y: -8 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-full mt-2 w-80 bg-cards dark:bg-darkcards border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary dark:text-accent" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold bg-alert/10 text-alert px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] font-semibold text-primary dark:text-accent hover:underline"
                  >
                    <CheckCheck className="w-3 h-3" /> Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="p-1 ml-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-textmain dark:text-slate-500 gap-2">
                  <Bell className="w-8 h-8 opacity-20" />
                  <p className="text-sm font-medium">You're all caught up!</p>
                </div>
              ) : (
                notifications.map(n => {
                  const meta = TYPE_META[n.type] || TYPE_META.info;
                  const Icon = meta.Icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                        n.read
                          ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          : 'bg-primary/[0.03] dark:bg-accent/[0.04] hover:bg-primary/[0.06] dark:hover:bg-accent/[0.07]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${meta.bg}`}>
                        <Icon className={`w-3.5 h-3.5 ${meta.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-xs font-bold truncate ${n.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400 dark:text-slate-600 whitespace-nowrap shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-textmain dark:text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                      </div>
                      {!n.read && (
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${meta.dot}`} />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <button className="text-xs font-semibold text-primary dark:text-accent hover:underline">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
