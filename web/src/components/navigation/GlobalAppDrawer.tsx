import React from 'react';
import { 
  X, 
  TrendingUp, 
  Users, 
  Briefcase, 
  ShoppingBag, 
  Building2, 
  LifeBuoy, 
  Share2, 
  AlertOctagon, 
  MessageSquare, 
  ThumbsUp, 
  PhoneCall, 
  PhoneForwarded, 
  ListOrdered, 
  Megaphone, 
  Calendar as CalendarIcon, 
  BarChart2, 
  ShieldCheck, 
  BookOpen, 
  Settings, 
  LogOut,
  Radio
} from 'lucide-react';
import { useSales } from '../../context/SalesContext';

export const GlobalAppDrawer: React.FC = () => {
  const { isAppDrawerOpen, setIsAppDrawerOpen, navigateTo } = useSales();

  if (!isAppDrawerOpen) return null;

  const moduleSections = [
    {
      title: 'CORE RELATIONSHIP & SALES',
      items: [
        { id: 'sales', label: 'Sales Module (Active)', icon: <TrendingUp size={18} />, active: true, action: () => navigateTo('dashboard') },
        { id: 'contacts', label: 'Contacts (Customer 360)', icon: <Users size={18} />, action: () => navigateTo('customer-360') },
        { id: 'opportunity', label: 'Opportunity Deals', icon: <Briefcase size={18} /> },
        { id: 'orders', label: 'Sales Orders', icon: <ShoppingBag size={18} /> },
        { id: 'b2b', label: 'B2B Commercial Banking', icon: <Building2 size={18} /> },
      ],
    },
    {
      title: 'CUSTOMER SERVICE & ENGAGEMENT',
      items: [
        { id: 'helpdesk', label: 'Helpdesk & Complaints', icon: <LifeBuoy size={18} /> },
        { id: 'social', label: 'Social Media Omnichannel', icon: <Share2 size={18} /> },
        { id: 'branch-complaints', label: 'Branch Complaints', icon: <AlertOctagon size={18} /> },
        { id: 'branch-feedback', label: 'Branch Feedback', icon: <MessageSquare size={18} /> },
        { id: 'csat', label: 'Feedback Surveys (CSAT)', icon: <ThumbsUp size={18} /> },
      ],
    },
    {
      title: 'OUTREACH & TELEPHONY OPERATIONS',
      items: [
        { id: 'call-reports', label: 'Call Reports & Logs', icon: <PhoneCall size={18} /> },
        { id: 'outbound', label: 'Outbound Campaigns', icon: <PhoneForwarded size={18} /> },
        { id: 'queue', label: 'Queue Management (8022)', icon: <ListOrdered size={18} /> },
        { id: 'campaign', label: 'Marketing Campaigns', icon: <Megaphone size={18} /> },
        { id: 'calendar', label: 'Calendar & Nylas Sync', icon: <CalendarIcon size={18} /> },
      ],
    },
    {
      title: 'GOVERNANCE, QUALITY & INSIGHTS',
      items: [
        { id: 'analytics', label: 'Analytics & Reporting', icon: <BarChart2 size={18} /> },
        { id: 'qa', label: 'Quality Assurance (QA)', icon: <ShieldCheck size={18} /> },
        { id: 'kb', label: 'Knowledge Base (SOPs)', icon: <BookOpen size={18} /> },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAppDrawerOpen(false)}
      />

      {/* Drawer Surface */}
      <aside className="relative w-[85%] max-w-[340px] bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="bg-secondary-900 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white text-secondary-900 rounded font-bold text-xs flex items-center justify-center">
                DTB
              </div>
              <span className="font-bold text-base tracking-tight">Kati Enterprise</span>
            </div>
            <button
              onClick={() => setIsAppDrawerOpen(false)}
              className="p-1.5 text-neutral-300 hover:text-white rounded-full hover:bg-white/10"
              aria-label="Close Drawer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs bg-white/10 p-2.5 rounded-md border border-white/10">
            <div>
              <p className="font-semibold text-white">Branson Allann</p>
              <p className="text-secondary-100/70 text-[11px]">Diamond Trust Bank Kenya</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-medium text-[10px]">
              <Radio size={10} className="animate-pulse" />
              Online
            </div>
          </div>
        </div>

        {/* Scrollable Module List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {moduleSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-[10px] font-bold tracking-wider text-neutral-400 px-2 uppercase">
                {sec.title}
              </h4>
              <div className="space-y-0.5">
                {sec.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) item.action();
                      setIsAppDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-semibold transition-colors min-h-[40px] text-left ${
                      item.active
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                    }`}
                  >
                    <span className={item.active ? 'text-primary-600' : 'text-neutral-500'}>
                      {item.icon}
                    </span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between safe-bottom">
          <button
            onClick={() => {
              navigateTo('settings');
              setIsAppDrawerOpen(false);
            }}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 p-2 rounded-md hover:bg-neutral-200"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button
            onClick={() => {
              navigateTo('login');
              setIsAppDrawerOpen(false);
            }}
            className="flex items-center gap-2 text-xs font-semibold text-feedback-error hover:text-red-700 p-2 rounded-md hover:bg-red-50"
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
