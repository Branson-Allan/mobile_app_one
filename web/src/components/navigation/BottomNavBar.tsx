import React from 'react';
import { LayoutDashboard, Users, MessageSquare, MoreHorizontal } from 'lucide-react';
import { useSales, BottomNavTab } from '../../context/SalesContext';
import { clsx } from 'clsx';

export const BottomNavBar: React.FC = () => {
  const { activeTab, setActiveTab } = useSales();

  const navItems: { id: BottomNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'leads', label: 'Leads', icon: <Users size={22} /> },
    { id: 'engagements', label: 'Engage', icon: <MessageSquare size={22} /> },
    { id: 'more', label: 'More', icon: <MoreHorizontal size={22} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                'flex flex-col items-center justify-center flex-1 h-full min-h-[48px] transition-colors',
                isActive ? 'text-primary-600 font-bold' : 'text-neutral-500 hover:text-neutral-800'
              )}
            >
              <span className={clsx('transition-transform duration-150', isActive && 'scale-110')}>
                {item.icon}
              </span>
              <span className="text-[11px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
