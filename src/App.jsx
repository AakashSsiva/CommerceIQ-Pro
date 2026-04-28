import React from 'react';
import { DataProvider } from './context/DataContext';
import Header         from './components/Header';
import FilterBar      from './filters/FilterBar';
import KPIcards       from './components/KPIcards';
import DuplicateAlert from './components/DuplicateAlert';
import SalesTrendChart    from './charts/SalesTrendChart';
import ChannelChart       from './charts/ChannelChart';
import CategoryDonutChart from './charts/CategoryDonutChart';
import RegionChart        from './charts/RegionChart';
import ForecastChart      from './charts/ForecastChart';
import ProductTable    from './components/ProductTable';
import ExecutiveReports from './insights/ExecutiveReports';
import SettingsPanel   from './components/SettingsPanel';

function Dashboard() {
  return (
    <div id="dashboard-capture" className="max-w-[1600px] mx-auto space-y-0">
      {/* 1 ── Header */}
      <Header />

      {/* 2 ── Duplicate Alert */}
      <DuplicateAlert />

      {/* 3 ── Filters */}
      <FilterBar />

      {/* 4 ── KPI Cards */}
      <KPIcards />

      {/* 5 ── Full-width Live Sales Trend */}
      <div className="mb-5">
        <SalesTrendChart />
      </div>

      {/* 6 ── Secondary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <ChannelChart />
        <CategoryDonutChart />
        <RegionChart />
      </div>

      {/* 7 ── Live Product Intelligence */}
      <div className="mb-5">
        <ProductTable />
      </div>

      {/* 8 ── Reports + Forecast + Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div className="md:col-span-2">
          <ExecutiveReports />
        </div>
        <ForecastChart />
      </div>

      {/* 9 ── Settings */}
      <div className="mb-8">
        <SettingsPanel />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-background dark:bg-darkbg px-4 md:px-6 lg:px-8 py-6 transition-colors duration-300 selection:bg-primary/20">
        <Dashboard />
      </div>
    </DataProvider>
  );
}
