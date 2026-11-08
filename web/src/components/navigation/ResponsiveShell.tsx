import React from 'react';
import { useSales } from '../../context/SalesContext';
import { TopAppBar } from './TopAppBar';
import { BottomNavBar } from './BottomNavBar';
import { GlobalAppDrawer } from './GlobalAppDrawer';
import { Toast } from '../ui/Toast';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  ShoppingBag, 
  Building2, 
  LifeBuoy, 
  PhoneCall, 
  Calendar, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeScreen, setActiveTab, navigateTo, toastMessage } = useSales();

  // If on login screen, render standalone without shell
  if (activeScreen === 'login') {
    return (
      <div className="min-h-screen bg-neutral-100">
        {children}
        <Toast message={toastMessage} />
      </div>
    );
  }

  const desktopModules = [
    { id: 'sales', label: 'Sales Module', icon: <TrendingUp size={18} />, active: true, action: () => navigateTo('dashboard') },
    { id: 'contacts', label: 'Contacts (360)', icon: <Users size={18} />, action: () => navigateTo('customer-360') },
    { id: 'opportunity', label: 'Opportunity Deals', icon: <Briefcase size={18} /> },
    { id: 'orders', label: 'Sales Orders', icon: <ShoppingBag size={18} /> },
    { id: 'b2b', label: 'B2B Banking', icon: <Building2 size={18} /> },
    { id: 'helpdesk', label: 'Helpdesk Tickets', icon: <LifeBuoy size={18} /> },
    { id: 'telephony', label: 'Call Reports', icon: <PhoneCall size={18} /> },
    { id: 'calendar', label: 'Calendar & Nylas', icon: <Calendar size={18} /> },
    { id: 'analytics', label: 'Analytics & BI', icon: <BarChart2 size={18} /> },
  ];

  const salesSubTabs = [
    { id: 'dashboard', label: 'Dashboard', screen: 'dashboard' as const },
    { id: 'leads', label: 'All Leads', screen: 'leads' as const },
    { id: 'customer-eng', label: 'Customer Engagement', screen: 'leads' as const },
    { id: 'all-eng', label: 'All Engagements', screen: 'leads' as const },
    { id: 'collections', label: 'Collections', screen: 'leads' as const },
    { id: 'reports', label: 'Report & Analytics', screen: 'dashboard' as const },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* DESKTOP LEFT SIDEBAR (Visible only on desktop >= 1200px) */}
      <aside className="hidden lg:flex w-64 bg-secondary-900 text-white flex-col shrink-0 border-r border-secondary-800">
        {/* Brand Header */}
        <div className="p-4 border-b border-secondary-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-secondary-900 rounded font-extrabold text-sm flex items-center justify-center shadow">
            DTB
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight leading-tight">Kati Enterprise</h2>
            <span className="text-[10px] text-secondary-200/70">Diamond Trust Bank</span>
          </div>
        </div>

        {/* 18 Modules Section */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <span className="text-[10px] font-bold tracking-wider text-secondary-200/50 uppercase px-2">
            Enterprise Modules
          </span>
          {desktopModules.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                if (m.action) m.action();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                m.active
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-secondary-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Profile Settings */}
        <div className="p-3 border-t border-secondary-800 space-y-1">
          <button
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-secondary-100 hover:text-white hover:bg-white/10 rounded-md"
          >
            <Settings size={16} />
            <span>Company & Profile</span>
          </button>
          <button
            onClick={() => navigateTo('login')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-300 hover:text-red-100 hover:bg-white/10 rounded-md"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top App Bar */}
        <TopAppBar />

        {/* DESKTOP / TABLET SALES SUB-NAVIGATION STRIP (Visible on md+ screens) */}
        <div className="hidden md:flex bg-white border-b border-neutral-200 px-4 h-11 items-center gap-1 overflow-x-auto">
          {salesSubTabs.map((sub) => {
            const isTabActive = 
              (sub.id === 'dashboard' && activeScreen === 'dashboard') ||
              (sub.id === 'leads' && activeScreen === 'leads');

            return (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveTab(sub.id === 'dashboard' ? 'dashboard' : 'leads');
                  navigateTo(sub.screen);
                }}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                  isTabActive
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>

        {/* Active Screen Content Area */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Mobile Persistent Bottom Nav Bar (Hidden on desktop/tablet) */}
        <BottomNavBar />

        {/* Mobile Slide-Out App Drawer */}
        <GlobalAppDrawer />

        {/* Notification Toast */}
        <Toast message={toastMessage} />
      </div>
    </div>
  );
};
