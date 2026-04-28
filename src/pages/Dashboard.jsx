import React from 'react';
import KPICards from '../components/KPICards';
import SalesChart from '../components/SalesChart';
import ChannelChart from '../components/ChannelChart';
import ProductTable from '../components/ProductTable';
import InsightPanel from '../components/InsightPanel';
import DashboardHeader from '../components/DashboardHeader';
import FilterBar from '../components/FilterBar';

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <DashboardHeader />
      <FilterBar />
      <section>
        <KPICards />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        <InsightPanel />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChannelChart />
        <ProductTable />
      </section>
    </div>
  );
}
