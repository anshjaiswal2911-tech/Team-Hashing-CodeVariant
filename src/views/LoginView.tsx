import React, { useState } from 'react';
import { ScreenId } from '../types';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [usernameOrEmail, setUsernameOrEmail] = useState('eleni@graveyard.dev');
  const [password, setPassword] = useState('curator2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1-Click Mock Credentials
  const handleQuickLogin = (role: 'curator' | 'judge') => {
    if (role === 'curator') {
      setUsernameOrEmail('eleni@graveyard.dev');
      setPassword('curator2026');
    } else {
      setUsernameOrEmail('judge@codevariant.org');
      setPassword('winner2026');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage('Please provide both username/email and access key.');
      return;
    }

    setIsLoading(true);

    // Simulate authentic biometric / cryptographic vault check
    setTimeout(() => {
      setIsLoading(false);

      const isJudge = usernameOrEmail.toLowerCase().includes('judge');
      const user: UserProfile = {
        name: isJudge ? 'CodeVariant Judge' : 'Aryan',
        email: usernameOrEmail,
        role: isJudge ? 'Round 2 Hackathon Evaluator' : 'Master Curator',
        avatar: isJudge
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      };

      onLoginSuccess(user);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* ─────────────────────────────────────────────────────────────
          Botanical Scene Framing (Matching Pinterest Reference Image)
         ───────────────────────────────────────────────────────────── */}
      {/* Background Soft Radiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-surface to-surface pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar with Navigation Back */}
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container/80 hover:bg-surface-container text-xs font-medium text-on-surface border border-outline-variant/60 shadow-sm transition-all hover:-translate-x-0.5 cursor-pointer"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Return to Home Page</span>
        </button>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          Decorative Botanical Elements Framing the Card
         ───────────────────────────────────────────────────────────── */}
      {/* Left Botanical Potted Plant (SVG illustrated matching reference) */}
      <div className="hidden lg:block absolute left-8 xl:left-24 bottom-12 pointer-events-none z-10 opacity-90 transition-transform duration-700 hover:scale-105">
        <svg width="180" height="340" viewBox="0 0 180 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ceramic Botanical Pot */}
          <ellipse cx="90" cy="275" rx="42" ry="14" fill="#D3DEC8" stroke="#8CA38B" strokeWidth="2" />
          <path d="M48 275 L60 330 C62 336 68 340 76 340 H104 C112 340 118 336 120 330 L132 275 Z" fill="#DDE6D5" stroke="#8CA38B" strokeWidth="2" />
          <circle cx="90" cy="305" r="12" fill="#CAD8C1" />
          <path d="M86 305 Q90 300 94 305 Q90 310 86 305" fill="#5F7B60" />

          {/* Stems and Leaves */}
          <path d="M90 270 Q85 180 75 90" stroke="#5F7B60" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M85 210 Q50 190 38 175" stroke="#5F7B60" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M80 150 Q45 130 32 105" stroke="#5F7B60" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M82 170 Q115 155 130 135" stroke="#5F7B60" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M78 110 Q110 95 120 70" stroke="#5F7B60" strokeWidth="2.5" strokeLinecap="round" />

          {/* Lush Eucalyptus Leaves */}
          <ellipse cx="34" cy="172" rx="18" ry="12" transform="rotate(-20 34 172)" fill="#93B294" />
          <ellipse cx="28" cy="102" rx="20" ry="13" transform="rotate(-30 28 102)" fill="#84A786" />
          <ellipse cx="132" cy="132" rx="19" ry="12" transform="rotate(25 132 132)" fill="#84A786" />
          <ellipse cx="122" cy="68" rx="18" ry="12" transform="rotate(20 122 68)" fill="#93B294" />
          <ellipse cx="73" cy="85" rx="16" ry="24" transform="rotate(-10 73 85)" fill="#6D8E6F" />
        </svg>
      </div>

      {/* Right Botanical Vine & Companion (Matching reference) */}
      <div className="hidden lg:block absolute right-8 xl:right-24 bottom-12 pointer-events-none z-10 opacity-90 transition-transform duration-700 hover:scale-105">
        <svg width="170" height="320" viewBox="0 0 170 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle trailing vine */}
          <path d="M120 20 Q140 100 130 200 Q120 280 110 320" stroke="#8CA38B" strokeWidth="2" strokeDasharray="3 3" />
          <ellipse cx="135" cy="90" rx="12" ry="7" transform="rotate(25 135 90)" fill="#A8C3A9" />
          <ellipse cx="125" cy="160" rx="14" ry="8" transform="rotate(-20 125 160)" fill="#8EAA8F" />
          <ellipse cx="130" cy="230" rx="13" ry="8" transform="rotate(15 130 230)" fill="#769677" />

          {/* Botanical Ceramic Water Basin */}
          <ellipse cx="75" cy="275" rx="35" ry="10" fill="#E2EBE0" stroke="#9BB29B" strokeWidth="1.5" />
          <path d="M40 275 L48 310 C50 315 56 318 64 318 H86 C94 318 100 315 102 310 L110 275 Z" fill="#EAF0E8" stroke="#9BB29B" strokeWidth="1.5" />
          <ellipse cx="75" cy="285" rx="20" ry="5" fill="#7FA181" opacity="0.6" />
          <circle cx="75" cy="255" r="16" fill="#F4ECE4" stroke="#D3C5B5" strokeWidth="1.5" />
          <circle cx="70" cy="252" r="2.5" fill="#4B3A2C" />
          <circle cx="80" cy="252" r="2.5" fill="#4B3A2C" />
          <ellipse cx="75" cy="258" rx="3" ry="2" fill="#D38A6B" />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN AUTH CARD (Matching Reference Image)
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[420px] relative z-20 mt-8 mb-4">
        
        {/* Adorable 3D Curator Mascot Peeking Over the Card */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="relative w-28 h-20 flex items-center justify-center">
            {/* 3D Cute Botanical Avatar */}
            <svg width="104" height="84" viewBox="0 0 104 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Hands resting on card border */}
              <ellipse cx="30" cy="74" rx="8" ry="6" fill="#F8E5D5" stroke="#E0C0A8" strokeWidth="1" />
              <ellipse cx="74" cy="74" rx="8" ry="6" fill="#F8E5D5" stroke="#E0C0A8" strokeWidth="1" />

              {/* Cute Sweater Shoulders */}
              <path d="M22 84 C22 66 32 60 52 60 C72 60 82 66 82 84 Z" fill="#6B8E70" />

              {/* Head */}
              <circle cx="52" cy="44" r="24" fill="#FCEEE3" />
              {/* Hair (Warm Chestnut Bob) */}
              <path d="M30 40 C30 22 40 16 52 16 C64 16 74 22 74 40 C74 42 70 34 66 32 C62 30 56 34 52 34 C48 34 42 30 38 32 C34 34 30 42 30 40 Z" fill="#6E442B" />

              {/* Botanical Hair Sprout */}
              <path d="M52 16 Q52 6 56 3" stroke="#48784E" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="58" cy="4" rx="4" ry="2.5" transform="rotate(-30 58 4)" fill="#68A570" />
              <ellipse cx="53" cy="5" rx="3.5" ry="2" transform="rotate(30 53 5)" fill="#7CB683" />

              {/* Eyes & Blushing Cheeks */}
              <circle cx="43" cy="44" r="2.8" fill="#2E1B10" />
              <circle cx="61" cy="44" r="2.8" fill="#2E1B10" />
              <circle cx="44" cy="43" r="0.9" fill="#FFFFFF" />
              <circle cx="62" cy="43" r="0.9" fill="#FFFFFF" />
              <ellipse cx="38" cy="49" rx="3.5" ry="2" fill="#F3A790" opacity="0.6" />
              <ellipse cx="66" cy="49" rx="3.5" ry="2" fill="#F3A790" opacity="0.6" />

              {/* Smiling Mouth */}
              <path d="M49 48 Q52 52 55 48" stroke="#87472B" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Floating White/Cream Card with 3D Depth */}
        <div className="clay-card rounded-[32px] p-7 sm:p-8 bg-surface-container border border-outline-variant/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative backdrop-blur-xl">
          
          {/* Card Header & Brand Emblem */}
          <div className="text-center pt-2 pb-4 space-y-1">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span aria-hidden="true" className="material-symbols-outlined text-secondary text-base">inventory_2</span>
              <span className="font-serif text-sm tracking-wider uppercase font-semibold text-on-surface">
                PROJECT GRAVEYARD
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">

              <h1 className="font-serif text-2xl sm:text-[26px] font-normal text-on-surface tracking-tight">
                {mode === 'login' ? 'Welcome Back' : 'Join Conservatory'}
              </h1>

            </div>

            <p className="font-sans text-[11px] text-on-surface-variant max-w-xs mx-auto leading-relaxed">
              {mode === 'login'
                ? 'Login to enter the vaults and access code reclamation tools.'
                : 'Create an archival folio to preserve your engineering specimens.'}
            </p>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-4 p-2.5 rounded-xl bg-error-container/20 border border-error/40 text-error text-[11px] font-medium flex items-center gap-2 animate-in fade-in">
              <span aria-hidden="true" className="material-symbols-outlined text-sm">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Input 1: Email or Username */}
            <div className="space-y-1">
              <div className="relative flex items-center">
                <span aria-hidden="true" className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-lg pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  aria-label="Email or username"
                  autoComplete="username"
                  placeholder="Email or Username"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-high/60 border border-outline-variant/60 text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Input 2: Password */}
            <div className="space-y-1">
              <div className="relative flex items-center">
                <span aria-hidden="true" className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-lg pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  aria-label="Password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder="Password or Vault Key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-surface-container-high/60 border border-outline-variant/60 text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-on-surface-variant hover:text-on-surface transition-colors"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Forgot Access Key */}
              <div className="flex justify-end pt-0.5">
                <button
                  type="button"
                  onClick={() => alert('Demo vault credentials: Use the 1-click login buttons below!')}
                  className="text-[10px] text-on-surface-variant hover:text-primary transition-colors hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Primary Submit Button (Pivora / Reference Sage Pill) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-primary text-on-primary font-sans text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <span aria-hidden="true" className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  <span>Unlocking Conservatory Vault...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Login' : 'Create Folio'}</span>
                  <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/50" />
            </div>
            <span className="relative px-3 bg-surface-container text-[10px] font-sans text-on-surface-variant uppercase tracking-wider">
              or continue with
            </span>
          </div>

          {/* Social Auth Buttons (Matching circular style in reference) */}
          <div className="flex items-center justify-center gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleQuickLogin('curator')}
              className="w-10 h-10 rounded-full bg-surface-container-high/80 hover:bg-surface-container flex items-center justify-center border border-outline-variant/70 shadow-sm hover:scale-105 active:scale-95 transition-all text-sm"
              title="Continue with Google"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleQuickLogin('curator')}
              className="w-10 h-10 rounded-full bg-surface-container-high/80 hover:bg-surface-container flex items-center justify-center border border-outline-variant/70 shadow-sm hover:scale-105 active:scale-95 transition-all text-on-surface"
              title="Continue with Apple"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.61 1.34-.56.64-.99 1.7-0.86 2.73 1 .08 2.02-.47 2.54-1.22z"/>
              </svg>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleQuickLogin('judge')}
              className="w-10 h-10 rounded-full bg-surface-container-high/80 hover:bg-surface-container flex items-center justify-center border border-outline-variant/70 shadow-sm hover:scale-105 active:scale-95 transition-all text-on-surface"
              title="Continue with GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              1-Click Mock Credentials Box (Hackathon & Judge Friendly)
             ───────────────────────────────────────────────────────────── */}
          <div className="mt-4 p-3 rounded-2xl bg-surface-container-high/40 border border-outline-variant/60 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-on-surface-variant">
              <span>Quick Mock Data Login</span>
              <span className="text-secondary">Instant 1-Click</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('curator')}
                className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/70 text-left transition-all hover:scale-[1.02] shadow-sm group"
              >
                <div className="font-sans text-[11px] font-bold text-on-surface group-hover:text-primary flex items-center gap-1">
                  <span>Curator</span>
                </div>
                <div className="text-[9px] font-mono text-on-surface-variant truncate">
                  eleni@graveyard.dev
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('judge')}
                className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/70 text-left transition-all hover:scale-[1.02] shadow-sm group"
              >
                <div className="font-sans text-[11px] font-bold text-on-surface group-hover:text-secondary flex items-center gap-1">
                  <span>Judge demo</span>
                </div>
                <div className="text-[9px] font-mono text-on-surface-variant truncate">
                  judge@codevariant.org
                </div>
              </button>
            </div>
          </div>

          {/* Sign Up / Switch Mode Link */}
          <div className="mt-4 text-center">
            <p className="text-[11px] font-sans text-on-surface-variant">
              {mode === 'login' ? "Don't have an account?" : 'Already have a folio?'}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="font-semibold text-primary hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Trust & Protocol Badges (Bottom row matching reference)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-on-surface-variant">
          <div className="p-2 rounded-xl bg-surface-container/60 border border-outline-variant/40 flex flex-col items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-sm text-primary mb-0.5">inventory_2</span>
            <span className="text-[10px] font-mono font-medium">Zero Code Waste</span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container/60 border border-outline-variant/40 flex flex-col items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-sm text-secondary mb-0.5">lock</span>
            <span className="text-[10px] font-mono font-medium">100% Client-Side</span>
          </div>
          <div className="p-2 rounded-xl bg-surface-container/60 border border-outline-variant/40 flex flex-col items-center justify-center">
            <span aria-hidden="true" className="material-symbols-outlined text-sm text-primary mb-0.5">bolt</span>
            <span className="text-[10px] font-mono font-medium">Instant Graft</span>
          </div>
        </div>

      </div>
    </div>
  );
};
