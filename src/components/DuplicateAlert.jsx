import React from 'react';
import { useData } from '../context/DataContext';
import { AlertCircle, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DuplicateAlert() {
  const { duplicateInfo, dismissDuplicate } = useData();
  const { alert, rows } = duplicateInfo;

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="border border-alert/30 bg-alert/5 dark:bg-alert/10 rounded-2xl px-5 py-4 flex items-start justify-between gap-4 mb-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-alert/10 rounded-lg mt-0.5">
              <AlertCircle className="w-4 h-4 text-alert" />
            </div>
            <div>
              <p className="text-sm font-bold text-alert">Duplicate Detection Engine</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{alert}</p>
              {rows.length > 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Duplicate Order IDs: {rows.slice(0, 4).map(r => r.Order_ID).join(', ')}
                  {rows.length > 4 && ` +${rows.length - 4} more`}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-positive bg-positive/10 px-3 py-1.5 rounded-full">
              <Trash2 className="w-3 h-3" /> Cleaned
            </span>
            <button onClick={dismissDuplicate} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
