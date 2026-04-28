import React from 'react';
import { useData } from '../context/DataContext';
import { Moon, Sun, DollarSign, Globe, Hash } from 'lucide-react';

/* ── Currency options with flags ── */
const CURRENCIES = [
  { value: 'USD', label: '🇺🇸 United States — USD ($)' },
  { value: 'EUR', label: '🇪🇺 European Union — EUR (€)' },
  { value: 'INR', label: '🇮🇳 India — INR (₹)' },
  { value: 'GBP', label: '🇬🇧 United Kingdom — GBP (£)' },
  { value: 'JPY', label: '🇯🇵 Japan — JPY (¥)' },
  { value: 'CAD', label: '🇨🇦 Canada — CAD (C$)' },
  { value: 'AUD', label: '🇦🇺 Australia — AUD (A$)' },
  { value: 'SGD', label: '🇸🇬 Singapore — SGD (S$)' },
  { value: 'AED', label: '🇦🇪 UAE — AED (د.إ)' },
];

/* ── Language options with country ── */
const LANGUAGES = [
  { value: 'en',    label: '🇺🇸 English (United States)' },
  { value: 'en-gb', label: '🇬🇧 English (United Kingdom)' },
  { value: 'ta',    label: '🇮🇳 Tamil (India)' },
  { value: 'hi',    label: '🇮🇳 Hindi (India)' },
  { value: 'fr',    label: '🇫🇷 French (France)' },
  { value: 'de',    label: '🇩🇪 German (Germany)' },
  { value: 'ja',    label: '🇯🇵 Japanese (Japan)' },
  { value: 'ar',    label: '🇦🇪 Arabic (UAE)' },
  { value: 'zh',    label: '🇨🇳 Chinese (Simplified)' },
];

const NUMBER_FORMATS = [
  { value: 'international', label: '1,234,567 — International' },
  { value: 'indian',        label: '12,34,567 — Indian (Lakh/Crore)' },
];

const Row = ({ icon: Icon, label, desc, children }) => (
  <div className="flex items-center justify-between gap-4 py-5 border-b border-slate-50 dark:border-slate-800 last:border-none">
    <div className="flex items-center gap-3 min-w-0">
      <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl shrink-0">
        <Icon className="w-4 h-4 text-primary dark:text-accent" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-xs text-textmain dark:text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

export default function SettingsPanel() {
  const {
    theme, setTheme,
    currency, setCurrency,
    language, setLanguage,
    numberFormat, setNumberFormat
  } = useData();

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2.5 mb-2">
        <h3 className="section-title">System Settings</h3>
      </div>
      <p className="section-sub mb-6">Customize your dashboard experience</p>

      {/* Dark Mode */}
      <Row icon={theme === 'light' ? Moon : Sun} label="Appearance" desc="Executive White or Slate Premium dark theme">
        <button
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
          className={`relative inline-flex h-7 w-13 w-[52px] items-center rounded-full transition-colors duration-300 focus:outline-none ${theme === 'dark' ? 'bg-accent' : 'bg-slate-200'}`}
        >
          <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </Row>

      {/* Currency */}
      <Row icon={DollarSign} label="Currency" desc="Select the country's display currency">
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="filter-select text-sm min-w-[220px]"
        >
          {CURRENCIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </Row>

      {/* Language */}
      <Row icon={Globe} label="Language" desc="Select country-based interface language">
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="filter-select text-sm min-w-[220px]"
        >
          {LANGUAGES.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </Row>

      {/* Number Format */}
      <Row icon={Hash} label="Number Format" desc="Numeric display standard for values">
        <select
          value={numberFormat}
          onChange={e => setNumberFormat(e.target.value)}
          className="filter-select text-sm min-w-[220px]"
        >
          {NUMBER_FORMATS.map(n => (
            <option key={n.value} value={n.value}>{n.label}</option>
          ))}
        </select>
      </Row>
    </div>
  );
}
