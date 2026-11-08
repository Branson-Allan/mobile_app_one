import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Trash2, 
  X 
} from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { 
  CustomerSegment, 
  LeadPriority, 
  LeadStatus, 
  Assignee 
} from '../types';
import { 
  AVAILABLE_BRANCHES, 
  AVAILABLE_PRODUCTS, 
  INITIAL_ASSIGNEES,
  MOCK_CUSTOMER_360 
} from '../data/mockData';

export const LeadCaptureScreen: React.FC = () => {
  const { goBack, createLead, navigateTo, showToast } = useSales();

  const [customerType, setCustomerType] = useState<'new' | 'existing'>('new');

  // Customer Data
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  // Existing Customer Search
  const [cbsSearchQuery, setCbsSearchQuery] = useState('');
  const [matchedCustomer, setMatchedCustomer] = useState<typeof MOCK_CUSTOMER_360 | null>(null);

  // Lead Info
  const [leadType, setLeadType] = useState('New Lead');
  const [description, setDescription] = useState('');
  const [branchCode, setBranchCode] = useState('041');

  // Commercial Details
  const [leadSource, setLeadSource] = useState('Referral');
  const [referee, setReferee] = useState('');
  const [segment, setSegment] = useState<CustomerSegment>('Retail');
  const [priority, setPriority] = useState<LeadPriority>('Medium');
  const [currency, setCurrency] = useState('KES');
  const [estimatedValue, setEstimatedValue] = useState('25000');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['Salary Account']);
  const [productToAdd, setProductToAdd] = useState('');

  // Assignment & Remarks
  const [initiator, setInitiator] = useState('Branson Allann');
  const [status, setStatus] = useState<LeadStatus>('New');
  const [notes, setNotes] = useState('High Value Client');
  const [assignees, setAssignees] = useState<Assignee[]>([INITIAL_ASSIGNEES[0], INITIAL_ASSIGNEES[2]]);
  const [assigneeToAdd, setAssigneeToAdd] = useState('');

  const handleGpsDetect = () => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setLocation('Nairobi CBD (-1.286389, 36.817223)');
      setIsGpsLoading(false);
      showToast('GPS Location captured successfully');
    }, 800);
  };

  const handleCbsSearch = (query: string) => {
    setCbsSearchQuery(query);
    if (query.toLowerCase().includes('mat') || query.toLowerCase().includes('prem')) {
      setMatchedCustomer(MOCK_CUSTOMER_360);
      setCustomerName(MOCK_CUSTOMER_360.fullName);
      setPhone(MOCK_CUSTOMER_360.phone);
      setLocation(MOCK_CUSTOMER_360.address);
    } else {
      setMatchedCustomer(null);
    }
  };

  const handleAddProduct = () => {
    if (productToAdd && !selectedProducts.includes(productToAdd)) {
      setSelectedProducts([...selectedProducts, productToAdd]);
      setProductToAdd('');
    }
  };

  const handleRemoveProduct = (prod: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p !== prod));
  };

  const handleAddAssignee = () => {
    const staff = INITIAL_ASSIGNEES.find((s) => s.id === assigneeToAdd);
    if (staff && !assignees.some((a) => a.id === staff.id)) {
      setAssignees([...assignees, staff]);
      setAssigneeToAdd('');
    }
  };

  const handleRemoveAssignee = (id: string) => {
    setAssignees(assignees.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !description.trim()) {
      alert('Please fill all mandatory fields marked with *');
      return;
    }

    const branch = AVAILABLE_BRANCHES.find((b) => b.code === branchCode)?.name || 'Courtyard Branch';

    createLead({
      customerName,
      phone,
      location: location || 'Nairobi',
      branch,
      branchCode,
      segment,
      productInterests: selectedProducts,
      priority,
      estimatedValue: Number(estimatedValue) || 10000,
      currency,
      convertedValue: 0,
      assignedTo: assignees,
      status,
      leadSource,
      referee: leadSource === 'Referral' ? referee : undefined,
      initiator,
      notes,
      cif: matchedCustomer ? matchedCustomer.cif : undefined,
    });

    goBack();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goBack}
            className="p-2 -ml-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-base text-neutral-900">Capture New Lead</h1>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </header>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Customer Type Toggle */}
        <div className="bg-white p-3 rounded-lg border border-neutral-200 space-y-1.5">
          <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Customer Lead Type *
          </label>
          <SegmentedControl
            options={[
              { value: 'new', label: 'New Customer' },
              { value: 'existing', label: 'Existing Bank Customer' },
            ]}
            value={customerType}
            onChange={(val) => {
              setCustomerType(val);
              if (val === 'existing') {
                handleCbsSearch('mateen');
              } else {
                setMatchedCustomer(null);
                setCustomerName('');
                setPhone('');
              }
            }}
          />
        </div>

        {/* CARD 1: Customer Profile */}
        <Card className="space-y-3.5">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Card 1: Customer Identification
          </h2>

          {customerType === 'existing' ? (
            <div className="space-y-3">
              <Input
                label="Search Customer in Core Banking (CBS) *"
                value={cbsSearchQuery}
                onChange={(e) => handleCbsSearch(e.target.value)}
                placeholder="Type name, CIF or account e.g. 'mateen'..."
                leftIcon={<Search size={18} />}
                required
              />

              {matchedCustomer ? (
                <div className="p-3.5 bg-primary-50/60 rounded-lg border border-primary-200 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-neutral-900">{matchedCustomer.fullName}</span>
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      </div>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        CIF: {matchedCustomer.cif} • National ID: {matchedCustomer.nationalId}
                      </p>
                      <p className="text-xs text-neutral-600">
                        Phone: {matchedCustomer.phone}
                      </p>
                    </div>
                  </div>

                  {/* PROMINENT SOLUTION TO DESKTOP HIDDEN ENTRY POINT */}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    fullWidth
                    icon={<ExternalLink size={16} />}
                    onClick={() => navigateTo('customer-360', { cif: matchedCustomer.cif })}
                  >
                    View Customer 360 Profile ↗
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-neutral-500 italic">
                  Tip: Type "mateen" to search and auto-fill client records.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                label="Customer Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Allan Branson"
                required
              />
              <Input
                label="Phone Number *"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0750800900"
                required
              />
              <div className="space-y-1.5">
                <Input
                  label="Physical Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Nairobi CBD"
                />
                <Button
                  type="button"
                  variant="secondary-soft"
                  size="sm"
                  fullWidth
                  loading={isGpsLoading}
                  icon={<MapPin size={16} />}
                  onClick={handleGpsDetect}
                >
                  Detect Current GPS Coordinates
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* CARD 2: Lead Information */}
        <Card className="space-y-3">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Card 2: Lead Information
          </h2>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Lead Type *
            </label>
            <select
              value={leadType}
              onChange={(e) => setLeadType(e.target.value)}
              className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="New Lead">New Lead</option>
              <option value="Cross-Sell Opportunity">Cross-Sell Opportunity</option>
              <option value="Referred Walk-In">Referred Walk-In</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Test Area / High priority prospect requirement..."
              rows={2}
              required
              className="w-full p-3 rounded-md border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Branch Name *
            </label>
            <select
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
              className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
            >
              {AVAILABLE_BRANCHES.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* CARD 3: Commercial Details */}
        <Card className="space-y-3.5">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Card 3: Commercial Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                Lead Source *
              </label>
              <select
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="Referral">Referral</option>
                <option value="Contact Centre">Contact Centre</option>
                <option value="Door to Door">Door to Door</option>
                <option value="Website Inquiry">Website Inquiry</option>
              </select>
            </div>

            {/* Smooth Dynamic Referee Field */}
            {leadSource === 'Referral' && (
              <div className="animate-in fade-in duration-200">
                <Input
                  label="Referee Name *"
                  value={referee}
                  onChange={(e) => setReferee(e.target.value)}
                  placeholder="e.g. Branson"
                  required
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">
                Segment *
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value as CustomerSegment)}
                className="w-full min-h-[44px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white"
              >
                <option value="Retail">Retail</option>
                <option value="Corporate">Corporate</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">
                Priority *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as LeadPriority)}
                className="w-full min-h-[44px] px-3 py-2 rounded-md border border-neutral-300 text-sm text-neutral-900 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Currency and Value */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">
                Currency *
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full min-h-[48px] px-2 py-2 rounded-md border border-neutral-300 text-sm font-bold bg-white"
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="col-span-2">
              <Input
                label="Estimated Value *"
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Product Type Multi-select */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Target Banking Products *
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={productToAdd}
                onChange={(e) => setProductToAdd(e.target.value)}
                className="flex-1 min-h-[44px] px-3 py-2 rounded-md border border-neutral-300 text-sm bg-white"
              >
                <option value="">Select product to add...</option>
                {AVAILABLE_PRODUCTS.filter((p) => !selectedProducts.includes(p)).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddProduct}
                disabled={!productToAdd}
                icon={<Plus size={16} />}
              >
                Add
              </Button>
            </div>

            {/* Selected Products Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 border border-neutral-200"
                >
                  <span>{p}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(p)}
                    className="p-1 hover:text-red-600 rounded-full min-h-[32px] min-w-[32px] flex items-center justify-center -mr-1.5"
                  >
                    <Trash2 size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* CARD 4: Assignment & Remarks */}
        <Card className="space-y-3.5">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Card 4: Assignment & Remarks
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Lead Initiator *"
              value={initiator}
              onChange={(e) => setInitiator(e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                Initial Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm font-semibold bg-white"
              >
                <option value="New">New</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
                <option value="Hot">Hot</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Comments or Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. High Value Client / Follow up immediately"
              rows={2}
              className="w-full p-3 rounded-md border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-600 resize-none"
            />
          </div>

          {/* Assigned Staff */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Collaborative Assignees ({assignees.length})
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={assigneeToAdd}
                onChange={(e) => setAssigneeToAdd(e.target.value)}
                className="flex-1 min-h-[44px] px-3 py-2 rounded-md border border-neutral-300 text-sm bg-white"
              >
                <option value="">Select staff member...</option>
                {INITIAL_ASSIGNEES.filter((s) => !assignees.some((a) => a.id === s.id)).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} [{s.role}]
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddAssignee}
                disabled={!assigneeToAdd}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {assignees.map((officer) => (
                <span
                  key={officer.id}
                  className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 border border-neutral-200"
                >
                  <span>👤 {officer.name}</span>
                  <span className="text-[10px] text-neutral-500">[{officer.role}]</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAssignee(officer.id)}
                    className="p-1 hover:text-red-600 rounded-full min-h-[32px] min-w-[32px] flex items-center justify-center -mr-1.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Sticky Action Dock */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 p-3 flex gap-3 max-w-2xl mx-auto safe-bottom">
          <Button
            type="button"
            variant="secondary"
            onClick={goBack}
            className="w-1/3"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Create Lead
          </Button>
        </div>
      </form>
    </div>
  );
};
