/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, HelpCircle, 
  CheckCircle, Loader2, ShieldCheck, Database, RefreshCw, AlertTriangle 
} from 'lucide-react';

interface AdminViewProps {
  onBackToUser: () => void;
  onAdminLoginSuccess: () => void;
}

export default function AdminView({ onBackToUser, onAdminLoginSuccess }: AdminViewProps) {
  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Simulated active DB status
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "INFO: Secure Handshake initialized with Gateway NYC-1",
    "SUCCESS: Database clusters connected. Integrity checks: 100%",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Form Validation
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both your Admin ID and secure password.");
      return;
    }

    setIsLoading(true);

    // Simulated secure database network call
    setTimeout(() => {
      // Allow general simulation, or check specific credentials for robust demo
      if (email === 'admin@ucab.com' && password === 'admin123') {
        setSuccessMessage("Authentication Successful! Loading dispatch console...");
        setSystemLogs(prev => [
          ...prev, 
          `AUTH: Security token granted to operator ID: ${email}`,
          "SYSTEM: Booting ride metrics & GPS tracker nodes..."
        ]);
        
        setTimeout(() => {
          setIsLoading(false);
          onAdminLoginSuccess();
        }, 1500);
      } else {
        setIsLoading(false);
        setErrorMessage("Invalid credentials. Try: admin@ucab.com with admin123");
        setSystemLogs(prev => [...prev, `WARNING: Failed authentication attempt from operator ID: ${email}`]);
      }
    }, 1800);
  };

  const handleForgotPassword = () => {
    alert("An automated password reset token has been transmitted to admin@ucab.com. Please authenticate with your secure hardware key.");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface select-none relative overflow-x-hidden selection:bg-secondary-container selection:text-on-secondary-container">
      
      {/* Centered Top Header logo */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant/30 z-40">
        <div className="flex items-center justify-center px-5 h-16 max-w-xl mx-auto">
          <span className="font-display text-2xl font-extrabold text-primary tracking-tight">UCab</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-5 py-8 relative">
        {/* Background Glow shapes */}
        <div className="absolute -top-[10%] -right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-[10%] -left-[10%] w-72 h-72 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md z-10 space-y-6">
          
          {/* Main Card Frame */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xl border border-outline-variant/30">
            
            {/* Header branding */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 text-primary animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h1 className="font-display text-xl font-extrabold text-on-surface">Admin Access</h1>
              <p className="text-xs text-on-surface-variant font-semibold mt-1">Enter your credentials to manage operations.</p>
            </div>

            {/* Error or Success Toast notifications inside card */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-error-container/20 border border-error/30 text-error rounded-xl flex items-start gap-2.5 text-xs animate-fade-in-up">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="font-bold leading-relaxed">{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-xl flex items-start gap-2.5 text-xs animate-fade-in-up">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="font-bold leading-relaxed">{successMessage}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Admin Mail/ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-on-surface-variant block ml-1" htmlFor="admin-email">
                  Admin Email or ID
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    id="admin-email"
                    type="text" 
                    className="w-full h-12 pl-11 pr-4 bg-white border border-outline-variant/60 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant text-xs font-semibold text-on-surface"
                    placeholder="admin@ucab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-[10px] text-outline ml-1 font-medium">Developer Quick Pass: <code className="bg-surface-container px-1 py-0.5 rounded text-primary font-bold">admin@ucab.com</code></p>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-extrabold text-on-surface-variant block" htmlFor="admin-password">
                    Password
                  </label>
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-[11px] text-primary hover:underline font-bold transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'} 
                    className="w-full h-12 pl-11 pr-11 bg-white border border-outline-variant/60 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant text-xs font-semibold text-on-surface"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-outline ml-1 font-medium">Developer Passcode: <code className="bg-surface-container px-1 py-0.5 rounded text-primary font-bold">admin123</code></p>
              </div>

              {/* Security Checkbox */}
              <div className="flex items-center gap-2 ml-1 pt-1">
                <input 
                  id="remember-checkbox"
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                  disabled={isLoading}
                />
                <label htmlFor="remember-checkbox" className="text-xs font-semibold text-on-surface-variant cursor-pointer">
                  Remember this workstation
                </label>
              </div>

              {/* Submit CTA */}
              <button 
                id="admin-login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-secondary-container hover:brightness-95 text-on-secondary-container font-display font-extrabold text-sm rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying secure keys...</span>
                  </>
                ) : (
                  <>
                    <span>Admin Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* End to end badge */}
            <div className="mt-5 pt-4 border-t border-outline-variant/30 flex items-center justify-center gap-1.5 text-outline">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[9px] uppercase tracking-widest font-extrabold">End-to-End Encrypted Secure Core</span>
            </div>
          </div>

          {/* Bottom helper logs (Aesthetics + Realism) */}
          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-1.5 text-[10px] text-outline uppercase font-extrabold tracking-wider mb-2">
              <Database className="w-3.5 h-3.5 text-primary" />
              <span>Security Terminal Activity logs</span>
            </div>
            <div className="space-y-1 font-mono text-[9px] text-on-surface-variant max-h-24 overflow-y-auto">
              {systemLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-outline">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  <span className={log.includes('SUCCESS') ? 'text-primary' : log.includes('WARNING') ? 'text-error' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Back navigation panel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button 
              onClick={onBackToUser}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-xs font-bold group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to User Login</span>
            </button>
            <div className="hidden sm:block w-px h-4 bg-outline-variant" />
            <button 
              onClick={() => alert('Contacting Dispatch Operations Room support line at 1-800-555-UCAB. Help ticket simulated!')}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-xs font-bold"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer system copyright */}
      <footer className="w-full py-4 text-center border-t border-outline-variant/20 bg-surface-container-low mt-auto">
        <p className="text-[10px] text-outline font-semibold">© 2026 UCab Inc. Admin Management System v4.2.0</p>
      </footer>
    </div>
  );
}
