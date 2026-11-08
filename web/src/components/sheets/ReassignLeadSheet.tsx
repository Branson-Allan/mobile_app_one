import React, { useState, useEffect } from 'react';
import { Trash2, UserPlus } from 'lucide-react';
import { useSales } from '../../context/SalesContext';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { Assignee } from '../../types';
import { INITIAL_ASSIGNEES } from '../../data/mockData';

export const ReassignLeadSheet: React.FC = () => {
  const { activeReassignSheetLeadId, closeReassignSheet, leads, reassignLead } = useSales();
  const currentLead = leads.find((l) => l.id === activeReassignSheetLeadId);

  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedToAdd, setSelectedToAdd] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (currentLead) {
      setAssignees([...currentLead.assignedTo]);
      setSelectedToAdd('');
      setComment('');
    }
  }, [currentLead]);

  if (!currentLead) return null;

  const handleRemove = (id: string) => {
    setAssignees((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAdd = () => {
    if (!selectedToAdd) return;
    const staff = INITIAL_ASSIGNEES.find((s) => s.id === selectedToAdd);
    if (staff && !assignees.some((a) => a.id === staff.id)) {
      setAssignees((prev) => [...prev, staff]);
      setSelectedToAdd('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignees.length === 0) {
      alert('Please keep at least one officer assigned to the lead.');
      return;
    }
    reassignLead(currentLead.id, assignees, comment);
  };

  return (
    <BottomSheet
      isOpen={Boolean(activeReassignSheetLeadId)}
      onClose={closeReassignSheet}
      title="Reassign Lead Ownership"
      subtitle={`${currentLead.id} • ${currentLead.customerName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 pb-4">
        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            Active Assigned Officers ({assignees.length})
          </label>
          <div className="space-y-2">
            {assignees.map((officer) => (
              <div
                key={officer.id}
                className="flex items-center justify-between p-3 rounded-md border border-neutral-200 bg-neutral-50"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-bold text-xs flex items-center justify-center">
                    {officer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{officer.name}</p>
                    <p className="text-xs text-neutral-500">{officer.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(officer.id)}
                  disabled={assignees.length <= 1}
                  className="p-2 text-feedback-error hover:bg-red-50 rounded min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Remove officer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Assignment Combo */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Add Team Member
          </label>
          <div className="flex gap-2">
            <select
              value={selectedToAdd}
              onChange={(e) => setSelectedToAdd(e.target.value)}
              className="flex-1 min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">Select officer to add...</option>
              {INITIAL_ASSIGNEES.filter((s) => !assignees.some((a) => a.id === s.id)).map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} — {staff.role}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAdd}
              disabled={!selectedToAdd}
              icon={<UserPlus size={18} />}
            >
              Add
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Handover Remarks (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Reason for reassignment, specialized task notes..."
            rows={2}
            className="w-full p-3 rounded-md border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 resize-none"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" fullWidth variant="primary" size="lg">
            Update Assignment
          </Button>
        </div>
      </form>
    </BottomSheet>
  );
};
