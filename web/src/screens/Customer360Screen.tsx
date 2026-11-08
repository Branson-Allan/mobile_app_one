import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  Smartphone, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  Clock 
} from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SegmentedControl } from '../components/ui/SegmentedControl';

export const Customer360Screen: React.FC = () => {
  const { customer360, goBack, toggleAccountProduct, showToast } = useSales();

  const [activeSegment, setActiveSegment] = useState<'accounts' | 'mobile' | 'insurance' | 'cards'>('accounts');
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'tickets' | 'leads' | 'orders'>('all');

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pb-20">
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
          <div>
            <h1 className="font-bold text-sm md:text-base text-neutral-900 leading-tight">
              Customer 360 Relationship Hub
            </h1>
            <p className="text-[11px] text-neutral-500">CIF: {customer360.cif}</p>
          </div>
        </div>

        <Button
          variant="secondary-soft"
          size="sm"
          onClick={() => showToast('Customer relationship snapshot exported')}
        >
          Export
        </Button>
      </header>

      {/* Main Content Area */}
      <div className="p-4 space-y-4 max-w-3xl mx-auto w-full">
        {/* Master Biodata Header Card */}
        <Card className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-700 font-bold text-base flex items-center justify-center border border-secondary-200 shrink-0">
                {customer360.fullName.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                    {customer360.fullName}
                  </h2>
                  <span title="Verified Customer" className="inline-flex items-center">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  National ID: {customer360.nationalId} • Age: {customer360.age} • {customer360.gender}
                </p>
                <p className="text-xs text-neutral-500 truncate max-w-xs">
                  {customer360.address}
                </p>
              </div>
            </div>
          </div>

          {/* Omnichannel Quick Action Dock */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100">
            <a
              href={`tel:${customer360.phone}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 min-h-[44px]"
            >
              <Phone size={14} />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/${customer360.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 min-h-[44px]"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${customer360.email}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-xs font-semibold border border-neutral-200 min-h-[44px]"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>
        </Card>

        {/* 4 Segmented Banking Facet Tabs (Replacing Desktop Tiny Radio Buttons) */}
        <div className="bg-white p-1 rounded-lg border border-neutral-200">
          <SegmentedControl
            options={[
              { value: 'accounts', label: 'Accounts', badge: customer360.accounts.length },
              { value: 'mobile', label: 'Mobile', badge: customer360.mobileProfiles.length },
              { value: 'insurance', label: 'Insurance', badge: customer360.policies.length },
              { value: 'cards', label: 'Cards', badge: customer360.creditCards.length },
            ]}
            value={activeSegment}
            onChange={(val) => setActiveSegment(val)}
          />
        </div>

        {/* TAB 1: Core Banking Accounts & Dynamic Products (Screen 3.2.1) */}
        {activeSegment === 'accounts' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-bold uppercase tracking-wider px-1">
              <span>Core Accounts ({customer360.accounts.length})</span>
              <span>Tap account to review active products</span>
            </div>

            {customer360.accounts.map((acc) => (
              <Card key={acc.accountNumber} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs bg-neutral-100 text-neutral-800 font-bold px-2 py-0.5 rounded">
                      {acc.accountType}
                    </span>
                    <h3 className="text-base font-extrabold text-neutral-900 mt-1 font-mono">
                      {acc.currency} {acc.balance.toLocaleString()}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      A/C: {acc.accountNumber} • Branch: {acc.branch} ({acc.branchCode})
                    </p>
                  </div>
                  <Badge variant="status">Active</Badge>
                </div>

                <div className="text-xs text-neutral-600 bg-neutral-50 p-2 rounded border border-neutral-100">
                  <span className="font-semibold">Co-Owners: </span>
                  {acc.coOwners.join(', ')}
                </div>

                {/* In-Place Active Products Checklist (Resolving desktop disconnect) */}
                <div className="border-t border-neutral-100 pt-2.5">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase mb-2">
                    Active Account Products Checklist
                  </h4>
                  <div className="space-y-1.5">
                    {acc.activeProducts.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => toggleAccountProduct(acc.accountNumber, prod.id)}
                        className="w-full flex items-center justify-between p-2 rounded hover:bg-neutral-50 border border-neutral-100 text-left min-h-[38px]"
                      >
                        <span className="text-xs font-medium text-neutral-800">{prod.name}</span>
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                            prod.enrolled ? 'bg-emerald-600 text-white' : 'border border-neutral-300 text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  icon={<Plus size={14} />}
                  onClick={() => showToast(`Task initiated for Account ${acc.accountNumber}`)}
                >
                  + Add to Operational Task
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 2: Mobile Banking PIN Registry (Screen 3.2.2) */}
        {activeSegment === 'mobile' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-bold uppercase tracking-wider px-1">
              <span>Mobile Banking Registrations ({customer360.mobileProfiles.length})</span>
            </div>

            {customer360.mobileProfiles.map((mb) => (
              <Card key={mb.id} className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} className="text-primary-600" />
                    <span className="text-sm font-bold text-neutral-900 font-mono">
                      +{mb.msisdn}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      mb.pinStatus === 'Active PIN'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {mb.pinStatus}
                  </span>
                </div>
                <div className="text-xs text-neutral-600 grid grid-cols-2 gap-1 pt-1 border-t border-neutral-100">
                  <p>Linked A/C: <span className="font-semibold text-neutral-900 font-mono">{mb.accountNumber}</span></p>
                  <p>Branch Code: <span className="font-semibold text-neutral-900">{mb.branchCode}</span></p>
                  <p>Registered: <span className="font-medium text-neutral-500">{mb.registeredDate}</span></p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: Bancassurance Policies (Screen 3.2.3) */}
        {activeSegment === 'insurance' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-bold uppercase tracking-wider px-1">
              <span>Bancassurance Policies ({customer360.policies.length})</span>
            </div>

            {customer360.policies.map((pol) => (
              <Card key={pol.policyNumber} className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-100 text-primary-800">
                      {pol.line}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900 mt-1">{pol.productName}</h4>
                    <p className="text-xs text-neutral-500">Underwriter: {pol.insurer}</p>
                  </div>
                  <Badge variant="status">Active</Badge>
                </div>
                <div className="text-xs text-neutral-600 pt-2 border-t border-neutral-100 space-y-0.5 font-mono">
                  <p>Policy #: <span className="font-semibold text-neutral-900">{pol.policyNumber}</span></p>
                  <p>Coverage: {pol.startDate} → <span className="text-emerald-700 font-bold">{pol.expiryDate}</span></p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 4: Credit Cards Facilities (Screen 3.2.4) */}
        {activeSegment === 'cards' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 font-bold uppercase tracking-wider px-1">
              <span>Credit Card Facilities ({customer360.creditCards.length})</span>
            </div>

            {customer360.creditCards.map((card, idx) => (
              <Card key={idx} className="p-4 space-y-3 bg-gradient-to-br from-white to-neutral-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard size={20} className="text-secondary-600" />
                    <span className="text-sm font-bold text-neutral-900">{card.cardTitle}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      card.status === 'NORMAL'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {card.status}
                  </span>
                </div>

                <div className="font-mono text-base font-bold tracking-widest text-neutral-800 py-1">
                  {card.maskedPan}
                </div>

                <div className="flex items-center justify-between text-xs border-t border-neutral-200/60 pt-2">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Approved Limit</span>
                    <span className="font-bold text-sm text-neutral-900 font-mono">
                      {card.currency} {card.creditLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[10px] uppercase">Good Thru</span>
                    <span className="font-semibold text-neutral-900 font-mono">{card.expiry}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Collapsible DTB Compliance Accordion */}
        <Card className="p-3.5">
          <button
            type="button"
            onClick={() => setIsComplianceOpen(!isComplianceOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span className="text-sm font-bold text-neutral-900">
                DTB Compliance & KYC Verification
              </span>
            </div>
            {isComplianceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isComplianceOpen && (
            <div className="mt-3 pt-3 border-t border-neutral-100 text-xs space-y-1.5 text-neutral-700 animate-in fade-in duration-150">
              <div className="flex justify-between">
                <span>KYC Verification Status:</span>
                <span className="font-bold text-emerald-600">Passed (Tier 1 Verified)</span>
              </div>
              <div className="flex justify-between">
                <span>AML Risk Assessment:</span>
                <span className="font-bold text-neutral-900">Low Risk</span>
              </div>
              <div className="flex justify-between">
                <span>Politically Exposed Person (PEP):</span>
                <span className="font-semibold text-neutral-600">Negative</span>
              </div>
              <div className="flex justify-between">
                <span>Last Regulatory Audit:</span>
                <span className="text-neutral-500">15-Aug-2026</span>
              </div>
            </div>
          )}
        </Card>

        {/* Multi-channel Activity History */}
        <Card className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Cross-Channel Activity History
            </h3>
            <span className="text-xs text-neutral-400">272 Touchpoints</span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
            {(['all', 'tickets', 'leads', 'orders'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setHistoryFilter(filter)}
                className={`px-2.5 py-1 rounded-full font-semibold capitalize whitespace-nowrap ${
                  historyFilter === filter
                    ? 'bg-neutral-800 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2 rounded bg-neutral-50 border border-neutral-100">
              <Clock size={14} className="text-primary-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900">Salary Account Lead Created</p>
                <p className="text-neutral-500">19-Sep-2026 • Branson Allann [RM]</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded bg-neutral-50 border border-neutral-100">
              <Clock size={14} className="text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900">Helpdesk Case #8812 Closed</p>
                <p className="text-neutral-500">14-Aug-2026 • Mobile App PIN Reset Completed</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
