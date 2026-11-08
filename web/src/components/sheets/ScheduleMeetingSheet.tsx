import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { useSales } from '../../context/SalesContext';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const ScheduleMeetingSheet: React.FC = () => {
  const { activeMeetingSheetLeadId, closeMeetingSheet, leads, scheduleMeeting } = useSales();
  const currentLead = leads.find((l) => l.id === activeMeetingSheetLeadId);

  const [status, setStatus] = useState('In-Discussion');
  const [location, setLocation] = useState('Courtyard Branch - Boardroom 1');
  const [department, setDepartment] = useState('Retail Banking');
  const [startDate, setStartDate] = useState('2026-09-22');
  const [startTime, setStartTime] = useState('14:30');
  const [endDate, setEndDate] = useState('2026-09-22');
  const [endTime, setEndTime] = useState('15:30');
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [calendar] = useState('Nylas Calendar (Default)');

  useEffect(() => {
    if (currentLead) {
      setPurpose(`Follow-up on ${currentLead.productInterests[0] || 'Banking Facilities'}`);
      setDescription(`Pitch meeting regarding client requirement: ${currentLead.notes || 'N/A'}`);
    }
  }, [currentLead]);

  if (!currentLead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMeeting({
      leadId: currentLead.id,
      customerName: currentLead.customerName,
      meetingStatus: status,
      location,
      department,
      startDateTime: `${startDate} ${startTime}`,
      endDateTime: `${endDate} ${endTime}`,
      resources: 'Conference Screen, Refreshments',
      purpose,
      description,
      calendarName: calendar,
      staffAssigned: currentLead.assignedTo[0]?.name || 'Branson Allann',
    });
  };

  return (
    <BottomSheet
      isOpen={Boolean(activeMeetingSheetLeadId)}
      onClose={closeMeetingSheet}
      title="Schedule Lead Meeting"
      subtitle={`${currentLead.id} • ${currentLead.customerName}`}
      height="full"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 pb-6">
        {/* Pre-filled Lead Context Card */}
        <div className="p-3 bg-primary-50 rounded-md border border-primary-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-primary-900 block">{currentLead.customerName}</span>
            <span className="text-primary-700">Lead ID: {currentLead.id}</span>
          </div>
          <span className="font-semibold text-primary-800 bg-primary-100 px-2 py-0.5 rounded">
            {currentLead.branch}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Meeting Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="In-Discussion">In-Discussion</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Tentative">Tentative</option>
              <option value="Presentation Scheduled">Presentation Scheduled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Department *
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="Retail Banking">Retail Banking</option>
              <option value="Corporate Banking">Corporate Banking</option>
              <option value="Bancassurance Division">Bancassurance Division</option>
              <option value="Credit & Card Services">Credit & Card Services</option>
            </select>
          </div>
        </div>

        <Input
          label="Meeting Location / Room *"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          leftIcon={<MapPin size={18} />}
          required
        />

        {/* Date and Time Controls */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start Date *"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            leftIcon={<Calendar size={18} />}
            required
          />
          <Input
            label="Start Time *"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            leftIcon={<Clock size={18} />}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="End Date *"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            leftIcon={<Calendar size={18} />}
            required
          />
          <Input
            label="End Time *"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            leftIcon={<Clock size={18} />}
            required
          />
        </div>

        <Input
          label="Purpose of Meeting *"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="e.g. Presentation of Salary Account & Credit Card"
          required
        />

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Meeting Description & Internal Agenda
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full p-3 rounded-md border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 resize-none"
          />
        </div>

        {/* Nylas Calendar Integration Pill */}
        <div className="flex items-center justify-between p-3 rounded-md bg-neutral-100 border border-neutral-200 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="font-semibold text-neutral-800">Sync: {calendar}</span>
          </div>
          <span className="text-neutral-500 font-medium">Auto-invite client</span>
        </div>

        <div className="pt-2">
          <Button type="submit" fullWidth variant="primary" size="lg">
            Create Event & Sync Calendar
          </Button>
        </div>
      </form>
    </BottomSheet>
  );
};
