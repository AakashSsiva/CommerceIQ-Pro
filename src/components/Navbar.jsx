import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sparkles, FileText, Settings as SettingsIcon, Package } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Insights', path: '/insights', icon: Sparkles },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <nav className="w-full md:w-64 bg-white border-r border-slate-200 md:min-h-screen p-4 flex flex-col shrink-0">
      <div className="flex items-center gap-3 mb-8 px-2 mt-2">
        <div className="bg-primary p-2 rounded-lg">
          <Package className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">CommerceIQ</h1>
      </div>
      
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                  isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </div>
      
      <div className="hidden md:block mt-auto px-2 pb-4 text-xs text-slate-400 font-medium">
        © 2026 CommerceIQ
      </div>
    </nav>
  );
}
