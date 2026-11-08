import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Building, 
  ShieldCheck, 
  User, 
  Plus, 
  LogOut, 
  Camera 
} from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SettingsScreen: React.FC = () => {
  const { goBack, navigateTo, showToast } = useSales();

  const [companyName, setCompanyName] = useState('Central Electricals');
  const [phone, setPhone] = useState('079387223');
  const [address, setAddress] = useState('Chișinău, Moldova');
  const [currency, setCurrency] = useState('KES');
  const apiKey = '1677317336185x147232494608711680';

  const [taxes, setTaxes] = useState([
    { name: 'VAT Kenya 16%', rate: '16%' },
    { name: 'Withholding Tax 5%', rate: '5%' },
  ]);

  const [firstName, setFirstName] = useState('Branson');
  const [lastName, setLastName] = useState('Allan');
  const [empPhone, setEmpPhone] = useState('254710928843');
  const [whatsapp, setWhatsapp] = useState('+254710928843');

  const copyApiKey = () => {
    navigator.clipboard?.writeText(apiKey);
    showToast('API Key copied to clipboard');
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
          <h1 className="font-bold text-base text-neutral-900">Settings & Company Details</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* SECTION 1: Company Profile */}
        <Card className="space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-neutral-100">
            <Building size={18} className="text-primary-600" />
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Company Identification
            </h2>
          </div>

          <Input
            label="Corporate Tenant Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Company Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                Operating Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 rounded-md border border-neutral-300 text-sm font-bold bg-white"
              >
                <option value="KES">KES (Kenya Shilling)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>
          </div>

          <Input
            label="Physical Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* API Key Box */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-neutral-700">
              Enterprise Integration API Key
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 font-mono text-xs bg-neutral-100 px-3 py-2 rounded-md border border-neutral-200 text-neutral-600 select-all"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                icon={<Copy size={14} />}
                onClick={copyApiKey}
              >
                Copy
              </Button>
            </div>
          </div>
        </Card>

        {/* SECTION 2: Taxes Configuration */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Institutional Tax Rules
            </h2>
            <button
              onClick={() => {
                setTaxes((prev) => [...prev, { name: 'Excise Duty 20%', rate: '20%' }]);
                showToast('Excise duty tax rule added');
              }}
              className="text-xs text-primary-600 font-bold flex items-center gap-1 p-1 hover:text-primary-700"
            >
              <Plus size={14} /> Add Tax
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {taxes.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded bg-neutral-50 border border-neutral-100"
              >
                <span className="font-semibold text-neutral-800">{t.name}</span>
                <span className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-200">
                  {t.rate}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* SECTION 3: Security & 2FA */}
        <Card className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-neutral-100">
            <ShieldCheck size={18} className="text-emerald-600" />
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Security & Two-Factor Authentication
            </h2>
          </div>

          <div className="text-xs space-y-2">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded border border-neutral-200">
              <div>
                <p className="font-bold text-neutral-900">Two-Factor Authentication (2FA)</p>
                <p className="text-neutral-500">Protect account with mobile authenticator</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => showToast('2FA Enrollment workflow initiated')}
              >
                Add 2FA Step
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded border border-neutral-200">
              <div>
                <p className="font-bold text-neutral-900">Change Password</p>
                <p className="text-neutral-500">Last changed 45 days ago</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => showToast('Password reset email dispatched')}
              >
                Change
              </Button>
            </div>
          </div>
        </Card>

        {/* SECTION 4: Personal Employee Profile */}
        <Card className="space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-neutral-100">
            <User size={18} className="text-primary-600" />
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Employee Personal Profile
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-secondary-100 text-secondary-800 font-extrabold text-xl flex items-center justify-center border-2 border-secondary-200">
                BA
              </div>
              <button
                onClick={() => showToast('Photo upload picker opened')}
                className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full shadow hover:bg-primary-700 min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Upload photo"
              >
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">{firstName} {lastName}</h3>
              <p className="text-xs text-neutral-500">Relationship Manager • Courtyard Branch</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Employer Phone"
              value={empPhone}
              onChange={(e) => setEmpPhone(e.target.value)}
            />
            <Input
              label="WhatsApp Phone"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => showToast('Personal profile updated successfully')}
          >
            Save Profile Changes
          </Button>
        </Card>

        {/* Log Out Action */}
        <div className="pt-2">
          <Button
            variant="destructive"
            fullWidth
            icon={<LogOut size={18} />}
            onClick={() => navigateTo('login')}
          >
            Log Out of Kati Enterprise
          </Button>
        </div>
      </div>
    </div>
  );
};
