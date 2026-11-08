import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useSales } from '../context/SalesContext';
import { Input } from '../components/ui/Input';

export const LoginScreen: React.FC = () => {
  const { navigateTo, showToast } = useSales();
  const [email, setEmail] = useState('allan.branson@dtbafrica.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid corporate email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Authenticated via Diamond Trust Bank SSO');
      navigateTo('dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-6 md:p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-secondary-600 rounded-xl mx-auto flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            DTB
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
              Kati Enterprise CRM
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Diamond Trust Bank Africa • Sales Portal
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Corporate Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@dtbafrica.com"
            helperText="Single Sign-On (SSO) with your institutional identity"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[52px] bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-900 text-white font-bold text-sm rounded-md shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Log In with SSO</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="pt-4 border-t border-neutral-100 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-600 font-medium">
            <Lock size={13} className="text-emerald-600" />
            <span>256-Bit TLS Bank-Grade Encryption</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            For internal banking officers and authorized agents only.
          </p>
        </div>
      </div>
    </div>
  );
};
