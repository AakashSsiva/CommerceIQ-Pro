import React, { createContext, useContext, useState, useMemo } from 'react';
import { defaultRawData } from '../data/mockRawData';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [rawData, setRawData] = useState(defaultRawData);
  
  const [filters, setFilters] = useState({
    dateRange: 'All Time',
    region: 'All',
    channel: 'All',
    category: 'All',
    gender: 'All',
    deliveryStatus: 'All',
    rating: 'All',
  });

  // Load imported data
  const loadImportedData = (newData) => {
    setRawData(newData);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filter the raw data
  const filteredData = useMemo(() => {
    return rawData.filter(order => {
      if (filters.region !== 'All' && order.Region !== filters.region) return false;
      if (filters.channel !== 'All' && order.Channel !== filters.channel) return false;
      if (filters.category !== 'All' && order.Category !== filters.category) return false;
      if (filters.gender !== 'All' && order.Gender !== filters.gender) return false;
      if (filters.deliveryStatus !== 'All' && order.Delivery_Status !== filters.deliveryStatus) return false;
      if (filters.rating !== 'All' && order.Rating.toString() !== filters.rating) return false;
      
      // Basic date filtering
      if (filters.dateRange !== 'All Time') {
        const orderDate = new Date(order.Date);
        const now = new Date();
        const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
        
        if (filters.dateRange === 'Today' && diffDays > 1) return false;
        if (filters.dateRange === 'Last 7 Days' && diffDays > 7) return false;
        if (filters.dateRange === 'Last 30 Days' && diffDays > 30) return false;
        if (filters.dateRange === 'Quarterly' && diffDays > 90) return false;
        if (filters.dateRange === 'Yearly' && diffDays > 365) return false;
      }
      
      return true;
    });
  }, [rawData, filters]);

  // Derived KPIs
  const kpis = useMemo(() => {
    const totalOrders = filteredData.length;
    const revenue = filteredData.reduce((sum, order) => sum + (order.Price * order.Quantity), 0);
    const avgRating = totalOrders > 0 ? (filteredData.reduce((sum, order) => sum + order.Rating, 0) / totalOrders).toFixed(1) : 0;
    const avgDelivery = totalOrders > 0 ? (filteredData.reduce((sum, order) => sum + order.Delivery_Days, 0) / totalOrders).toFixed(1) : 0;

    return { totalOrders, revenue, avgRating, avgDelivery };
  }, [filteredData]);

  // Derived Sales Trend (Grouped by Month/Year)
  const salesTrend = useMemo(() => {
    const trendMap = {};
    filteredData.forEach(order => {
      const date = new Date(order.Date);
      const month = date.toLocaleString('default', { month: 'short' });
      if (!trendMap[month]) trendMap[month] = { name: month, revenue: 0, orders: 0 };
      trendMap[month].revenue += (order.Price * order.Quantity);
      trendMap[month].orders += 1;
    });
    return Object.values(trendMap);
  }, [filteredData]);

  // Derived Channel Performance
  const channelPerformance = useMemo(() => {
    const channelMap = {};
    filteredData.forEach(order => {
      if (!channelMap[order.Channel]) channelMap[order.Channel] = 0;
      channelMap[order.Channel] += (order.Price * order.Quantity);
    });
    return Object.keys(channelMap).map(key => ({ name: key, value: channelMap[key] }));
  }, [filteredData]);

  // Derived Top Products
  const topProducts = useMemo(() => {
    const productMap = {};
    filteredData.forEach(order => {
      if (!productMap[order.Product]) {
        productMap[order.Product] = { 
          id: order.Product, 
          name: order.Product, 
          category: order.Category, 
          revenue: 0, 
          orders: 0 
        };
      }
      productMap[order.Product].revenue += (order.Price * order.Quantity);
      productMap[order.Product].orders += 1;
    });
    
    return Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map(p => ({
        ...p,
        revenue: `$${p.revenue.toLocaleString()}`,
        conversion: `${((p.orders / kpis.totalOrders) * 100 || 0).toFixed(1)}%`
      }));
  }, [filteredData, kpis.totalOrders]);

  return (
    <DashboardContext.Provider value={{
      rawData,
      filteredData,
      filters,
      updateFilter,
      loadImportedData,
      kpis,
      salesTrend,
      channelPerformance,
      topProducts
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
