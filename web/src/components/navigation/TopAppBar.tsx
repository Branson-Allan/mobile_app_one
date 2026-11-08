import React from 'react';
import { Menu, Bell, Search, PhoneCall } from 'lucide-react';
import { useSales } from '../../context/SalesContext';

export const TopAppBar: React.FC = () => {
  const { setIsAppDrawerOpen, navigateTo } = useSales();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsAppDrawerOpen(true)}
          className="p-2 -ml-2 text-neutral-700 hover:text-neutral-900 rounded-md hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open Global Menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-secondary-600 rounded flex items-center justify-center text-white font-bold text-xs shadow-xs">
            DTB
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-neutral-900">Kati CRM</span>
            <span className="hidden sm:inline-block text-[11px] bg-primary-50 text-primary-700 font-semibold px-1.5 py-0.2 rounded ml-1.5">
              Sales Hub
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Queue Status Pill */}
        <div className="hidden xs:flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 px-2 py-1 rounded text-xs text-neutral-700">
          <PhoneCall size={12} className="text-primary-600" />
          <span className="font-medium">Q: 8022</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Online" />
        </div>

        {/* Global Search Button */}
        <button
          onClick={() => navigateTo('leads')}
          className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <span className="absolute top-2 right-2 w-4 h-4 bg-primary-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            8
          </span>
        </div>

        {/* User Avatar with Presence Dot */}
        <button
          onClick={() => navigateTo('settings')}
          className="relative ml-1 rounded-full p-0.5 hover:ring-2 hover:ring-primary-500/30 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="User Profile"
        >
          <div className="w-8 h-8 rounded-full bg-secondary-100 border border-secondary-200 text-secondary-700 font-bold text-xs flex items-center justify-center">
            BA
          </div>
          <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};
