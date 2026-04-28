import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { defaultMockData } from '../data/mockData';
import { detectDuplicates } from '../utils/duplicateDetector';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const CURRENCY_SYMBOLS = { USD: '$', INR: '₹', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$', SGD: 'S$', AED: 'د.إ' };
const CURRENCY_RATES   = { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.79, JPY: 154.2, CAD: 1.36, AUD: 1.53, SGD: 1.34, AED: 3.67 };

/* ── Default profile ── */
const DEFAULT_PROFILE = {
  name:      'Tony Aakash',
  role:      'Business Intelligence Analyst',
  access:    'Admin',
  email:     'tony@commerceiq.io',
  avatar:    null,               // null → initials fallback
  lastLogin: new Date().toISOString(),
  filesUploaded: 0,
  reportsExported: 0,
};

/* ── Default notifications ── */
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'info',    title: 'Duplicate Detected',   body: '2 duplicate records removed on load.',       time: 'Just now',    read: false },
  { id: 2, type: 'success', title: 'Dashboard Loaded',     body: 'All 250 records loaded successfully.',       time: '1 min ago',   read: false },
  { id: 3, type: 'warning', title: 'Low Rating Alert',     body: 'Some products are below 3★ average.',       time: '5 min ago',   read: false },
  { id: 4, type: 'info',    title: 'Revenue Trend Up',     body: 'Revenue improved 8.2% vs prior period.',    time: '10 min ago',  read: true  },
];

export const DataProvider = ({ children }) => {
  /* ── raw / clean ── */
  const [rawData,       setRawData]       = useState([]);
  const [duplicateInfo, setDuplicateInfo] = useState({ alert: null, rows: [] });

  /* ── filters ── */
  const [filters, setFilters] = useState({
    dateRange: 'All Time', region: 'All', channel: 'All',
    category: 'All', gender: 'All', rating: 'All', searchProduct: '',
  });

  /* ── settings ── */
  const [theme,        setTheme]       = useState(localStorage.getItem('ciq_theme') || 'light');
  const [currency,     setCurrency]    = useState('USD');
  const [language,     setLanguage]    = useState('en');
  const [numberFormat, setNumberFormat]= useState('international');

  /* ── profile ── */
  const [profile,      setProfile]     = useState(DEFAULT_PROFILE);

  /* ── notifications ── */
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () =>
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  const addNotification = (notif) =>
    setNotifications(ns => [{ id: Date.now(), read: false, time: 'Just now', ...notif }, ...ns]);

  /* ── saved reports ── */
  const [savedReports, setSavedReports] = useState([
    { id: 1, label: 'Weekly Executive Summary', saved: new Date().toLocaleDateString() },
    { id: 2, label: 'Q1 Channel Analysis',      saved: '3 days ago' },
  ]);

  const saveReport = (label) => {
    setSavedReports(rs => [{ id: Date.now(), label, saved: 'Just now' }, ...rs]);
    addNotification({ type: 'success', title: 'Report Saved', body: `"${label}" saved to your profile.` });
  };

  /* ── persist theme ── */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('ciq_theme', theme);
  }, [theme]);

  /* ── initial data load ── */
  useEffect(() => {
    const { cleanData, duplicates } = detectDuplicates(defaultMockData);
    setRawData(cleanData);
    if (duplicates.length > 0) {
      setDuplicateInfo({
        alert: `${duplicates.length} duplicate invoice records detected and removed on load.`,
        rows: duplicates,
      });
    }
  }, []);

  /* ── import handler ── */
  const handleImport = (parsedData) => {
    const { cleanData, duplicates } = detectDuplicates(parsedData);
    setRawData(cleanData);
    setProfile(p => ({ ...p, filesUploaded: p.filesUploaded + 1 }));
    if (duplicates.length > 0) {
      setDuplicateInfo({ alert: `Import complete. Removed ${duplicates.length} duplicate records.`, rows: duplicates });
      addNotification({ type: 'warning', title: 'Duplicates Removed', body: `${duplicates.length} duplicate records scrubbed from import.` });
    } else {
      setDuplicateInfo({ alert: null, rows: [] });
      addNotification({ type: 'success', title: 'Import Successful', body: `${parsedData.length} records loaded successfully.` });
    }
  };

  const dismissDuplicate = () => setDuplicateInfo({ alert: null, rows: [] });
  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  /* ── filtered data ── */
  const filteredData = useMemo(() => {
    return rawData.filter(row => {
      if (filters.region   !== 'All' && row.Region   !== filters.region)   return false;
      if (filters.channel  !== 'All' && row.Channel  !== filters.channel)  return false;
      if (filters.category !== 'All' && row.Category !== filters.category) return false;
      if (filters.gender   !== 'All' && row.Gender   !== filters.gender)   return false;
      if (filters.rating   !== 'All' && String(row.Rating) !== filters.rating) return false;
      if (filters.searchProduct && row.Product &&
          !row.Product.toLowerCase().includes(filters.searchProduct.toLowerCase())) return false;
      if (filters.dateRange !== 'All Time') {
        const diff = (Date.now() - new Date(row.Date)) / 86_400_000;
        if (filters.dateRange === 'Today'        && diff > 1)   return false;
        if (filters.dateRange === 'Last 7 Days'  && diff > 7)   return false;
        if (filters.dateRange === 'Last 30 Days' && diff > 30)  return false;
        if (filters.dateRange === 'Quarterly'    && diff > 90)  return false;
        if (filters.dateRange === 'Yearly'       && diff > 365) return false;
      }
      return true;
    });
  }, [rawData, filters]);

  /* ── KPIs ── */
  const kpis = useMemo(() => {
    const n           = filteredData.length;
    const revenue     = filteredData.reduce((s, r) => s + (r.Revenue ?? r.Price * r.Quantity), 0);
    const qty         = filteredData.reduce((s, r) => s + r.Quantity, 0);
    const avgRating   = n > 0 ? filteredData.reduce((s, r) => s + r.Rating, 0) / n : 0;
    const avgDelivery = n > 0 ? filteredData.reduce((s, r) => s + (r.Delivery_Days ?? 3), 0) / n : 0;
    return { totalOrders: n, revenue, qty, avgRating: avgRating.toFixed(1), avgDelivery: avgDelivery.toFixed(1), growth: 15.4 };
  }, [filteredData]);

  /* ── Chart feeds ── */
  const salesTrend = useMemo(() => {
    const map = {};
    const ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    filteredData.forEach(r => {
      const m = new Date(r.Date).toLocaleString('default', { month: 'short' });
      if (!map[m]) map[m] = { name: m, revenue: 0, orders: 0 };
      map[m].revenue += (r.Revenue ?? r.Price * r.Quantity);
      map[m].orders  += 1;
    });
    return ORDER.filter(m => map[m]).map(m => map[m]);
  }, [filteredData]);

  const channelPerformance = useMemo(() => {
    const map = {};
    filteredData.forEach(r => { map[r.Channel] = (map[r.Channel] || 0) + (r.Revenue ?? r.Price * r.Quantity); });
    return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) }));
  }, [filteredData]);

  const categoryDistribution = useMemo(() => {
    const map = {};
    filteredData.forEach(r => { map[r.Category] = (map[r.Category] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const regionComparison = useMemo(() => {
    const map = {};
    filteredData.forEach(r => { map[r.Region] = (map[r.Region] || 0) + (r.Revenue ?? r.Price * r.Quantity); });
    return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) }));
  }, [filteredData]);

  const topProducts = useMemo(() => {
    const map = {};
    filteredData.forEach(r => {
      if (!map[r.Product]) map[r.Product] = { name: r.Product, category: r.Category, revenue: 0, qty: 0, ratingSum: 0, count: 0 };
      map[r.Product].revenue   += (r.Revenue ?? r.Price * r.Quantity);
      map[r.Product].qty       += r.Quantity;
      map[r.Product].ratingSum += r.Rating;
      map[r.Product].count     += 1;
    });
    return Object.values(map)
      .map(p => ({ ...p, avgRating: (p.ratingSum / p.count).toFixed(1) }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredData]);

  /* ── Currency formatter ── */
  const formatCurrency = (val) => {
    const sym = CURRENCY_SYMBOLS[currency] || '$';
    const converted = val * (CURRENCY_RATES[currency] || 1);
    return numberFormat === 'indian'
      ? sym + converted.toLocaleString('en-IN', { maximumFractionDigits: 0 })
      : sym + converted.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <DataContext.Provider value={{
      rawData, filteredData, filters, updateFilter, handleImport,
      duplicateInfo, dismissDuplicate,
      kpis, salesTrend, channelPerformance, categoryDistribution, regionComparison, topProducts,
      theme, setTheme,
      currency, setCurrency,
      language, setLanguage,
      numberFormat, setNumberFormat,
      formatCurrency,
      profile, setProfile,
      notifications, unreadCount, markAllRead, markRead, addNotification,
      savedReports, saveReport,
    }}>
      {children}
    </DataContext.Provider>
  );
};
