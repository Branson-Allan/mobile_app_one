import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LeadStatus } from '../types';

export const DashboardScreen: React.FC = () => {
  const { leads, navigateTo, setActiveStatusFilter, setActiveTab } = useSales();
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);

  // Aggregated KPI counts
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
  const hotLeads = leads.filter((l) => l.status === 'Hot').length;
  const warmLeads = leads.filter((l) => l.status === 'Warm').length;
  const coldLeads = leads.filter((l) => l.status === 'Cold').length;
  const followUpsToday = 2;
  const meetingsScheduledToday = 1;
  const openEngagements = 5;

  // Pipeline stages calculation
  const pipelineStages: { status: LeadStatus; label: string; count: number; value: number; color: string }[] = [
    { status: 'New', label: 'New', count: leads.filter((l) => l.status === 'New').length, value: 20000, color: 'bg-amber-500' },
    { status: 'Cold', label: 'Cold', count: coldLeads, value: 1098700, color: 'bg-sky-500' },
    { status: 'Warm', label: 'Warm', count: warmLeads, value: 5064542, color: 'bg-orange-500' },
    { status: 'Hot', label: 'Hot', count: hotLeads, value: 25000, color: 'bg-red-500' },
    { status: 'Nurturing', label: 'Nurturing', count: leads.filter((l) => l.status === 'Nurturing').length, value: 42542, color: 'bg-purple-500' },
    { status: 'Converted', label: 'Converted', count: convertedLeads, value: 2021200, color: 'bg-emerald-500' },
  ];

  const handleStageClick = (status: LeadStatus) => {
    setActiveStatusFilter(status);
    setActiveTab('leads');
    navigateTo('leads');
  };

  // Trend line chart data points (Jun - Sep)
  const trendPoints = [
    { date: 'Jun 1', count: 1 },
    { date: 'Jun 15', count: 2 },
    { date: 'Jul 1', count: 2 },
    { date: 'Jul 15', count: 4 },
    { date: 'Aug 1', count: 3 },
    { date: 'Aug 15', count: 5 },
    { date: 'Sep 1', count: 4 },
    { date: 'Sep 14', count: 6 },
  ];

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto pb-24">
      {/* Greeting Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
            Sales Dashboard 👋
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 mt-0.5">
            Diamond Trust Bank • Daily Operational Briefing
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={<Plus size={18} />}
          onClick={() => navigateTo('lead-capture')}
          className="hidden sm:inline-flex"
        >
          New Lead
        </Button>
      </div>

      {/* 8 KPI Performance Overview Cards (2x4 Grid on mobile, 4x2 on tablet, 8x1 on desktop) */}
      <div>
        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
          Daily Action Triggers & Pipeline Volume
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Follow-Ups</span>
              <Calendar size={14} className="text-primary-600" />
            </div>
            <p className="text-xl font-bold text-neutral-900">{followUpsToday}</p>
            <span className="text-[10px] text-amber-600 font-medium">Due Today</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Meetings</span>
              <Users size={14} className="text-sky-600" />
            </div>
            <p className="text-xl font-bold text-neutral-900">{meetingsScheduledToday}</p>
            <span className="text-[10px] text-sky-600 font-medium">Nylas Synced</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Engagements</span>
              <TrendingUp size={14} className="text-purple-600" />
            </div>
            <p className="text-xl font-bold text-neutral-900">{openEngagements}</p>
            <span className="text-[10px] text-purple-600 font-medium">Active Tasks</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Total Leads</span>
              <Sparkles size={14} className="text-primary-600" />
            </div>
            <p className="text-xl font-bold text-neutral-900">{totalLeads}</p>
            <span className="text-[10px] text-neutral-500 font-medium">All Branches</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Hot Leads</span>
              <Flame size={14} className="text-red-600" />
            </div>
            <p className="text-xl font-bold text-red-600">{hotLeads}</p>
            <span className="text-[10px] text-red-500 font-medium">Immediate</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Warm Leads</span>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            </div>
            <p className="text-xl font-bold text-orange-600">{warmLeads}</p>
            <span className="text-[10px] text-orange-600 font-medium">In-Progress</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Cold Leads</span>
              <span className="w-2 h-2 rounded-full bg-sky-500" />
            </div>
            <p className="text-xl font-bold text-sky-600">{coldLeads}</p>
            <span className="text-[10px] text-sky-600 font-medium">Initial Pitch</span>
          </Card>

          <Card className="p-3 bg-white border-neutral-200">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-medium truncate">Converted</span>
              <CheckCircle2 size={14} className="text-emerald-600" />
            </div>
            <p className="text-xl font-bold text-emerald-600">{convertedLeads}</p>
            <span className="text-[10px] text-emerald-600 font-medium">Won Deals</span>
          </Card>
        </div>
      </div>

      {/* 6-Stage Pipeline Funnel (Horizontal Swipeable Carousel on Mobile) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Lead Pipeline Funnel (Tap stage to filter)
          </h2>
          <span className="text-xs text-primary-600 font-semibold flex items-center gap-0.5">
            Swipe ⏵
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none snap-x">
          {pipelineStages.map((st) => (
            <div
              key={st.status}
              onClick={() => handleStageClick(st.status)}
              className="min-w-[170px] sm:min-w-[190px] bg-white rounded-lg border border-neutral-200 p-3.5 shadow-xs hover:border-primary-400 hover:shadow-md cursor-pointer transition-all active:scale-98 snap-start"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-800">{st.label}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                  {st.count}
                </span>
              </div>
              <p className="text-sm font-extrabold text-neutral-900 mb-1">
                KES {st.value.toLocaleString()}
              </p>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${st.color} transition-all duration-300`}
                  style={{ width: `${Math.min(100, (st.count / totalLeads) * 100 * 2.5)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-primary-600 font-semibold mt-1">
                <span>View leads</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Section (2 Columns on Tablet/Desktop, Stacked on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Lead Conversion Trend */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Lead Conversion Trend</h3>
              <p className="text-xs text-neutral-500">Jun 1, 2026 – Sep 14, 2026 (Timeline)</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded">
              +18.5% MoM
            </span>
          </div>

          <div className="relative h-44 w-full flex items-end justify-between pt-6 pb-2 px-2">
            {/* SVG Trend Line */}
            <svg className="absolute inset-0 w-full h-36 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EA580C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#EA580C" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 5,42 Q 20,38 35,35 T 65,22 T 95,8 L 95,50 L 5,50 Z"
                fill="url(#grad)"
              />
              <path
                d="M 5,42 Q 20,38 35,35 T 65,22 T 95,8"
                fill="none"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Interactive Data Points */}
            {trendPoints.map((pt, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredChartPoint(idx)}
                onMouseLeave={() => setHoveredChartPoint(null)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                {hoveredChartPoint === idx && (
                  <div className="absolute -top-7 bg-neutral-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    {pt.count} Leads
                  </div>
                )}
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 border-white transition-all ${
                    hoveredChartPoint === idx ? 'bg-primary-600 scale-125' : 'bg-primary-500'
                  }`}
                  style={{ marginBottom: `${pt.count * 16}px` }}
                />
                <span className="text-[10px] text-neutral-500 font-medium truncate max-w-[36px]">
                  {pt.date}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Product Interest Distribution */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Product Interest Distribution</h3>
              <p className="text-xs text-neutral-500">Breakdown by banking facility</p>
            </div>
            <span className="text-xs bg-neutral-100 text-neutral-700 font-semibold px-2 py-0.5 rounded">
              8 Products
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
            {/* Donut representation */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Salary Account 35% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#EA580C" strokeWidth="4.5" strokeDasharray="35 65" strokeDashoffset="0" />
                {/* Savings Account 25% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#DC2626" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-35" />
                {/* World Credit Card 20% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#334155" strokeWidth="4.5" strokeDasharray="20 80" strokeDashoffset="-60" />
                {/* Debit Card 10% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#0284C7" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-80" />
                {/* Overdraft 10% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#16A34A" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-90" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-extrabold text-neutral-900 block leading-tight">36</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Leads</span>
              </div>
            </div>

            {/* Legend Chips */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs flex-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0" />
                <span className="text-neutral-700 font-medium">Salary A/C (35%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                <span className="text-neutral-700 font-medium">Savings A/C (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 shrink-0" />
                <span className="text-neutral-700 font-medium">World Card (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                <span className="text-neutral-700 font-medium">Debit Card (10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-neutral-700 font-medium">Overdraft (10%)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Action Button (FAB) on Mobile */}
      <div className="sm:hidden fixed bottom-20 right-4 z-30">
        <Button
          variant="fab"
          icon={<Plus size={22} />}
          onClick={() => navigateTo('lead-capture')}
        >
          New Lead
        </Button>
      </div>
    </div>
  );
};
