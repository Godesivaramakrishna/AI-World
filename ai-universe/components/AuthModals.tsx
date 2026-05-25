'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithAuth, setAuthToken } from '../utils/api';

type ModalType = 'login' | 'signup' | null;

interface AuthModalsProps {
  open: ModalType;
  onClose: () => void;
  onSwitch: (type: ModalType) => void;
}

/* ─── Shared input field ─── */
function Field({
  label, type = 'text', placeholder, id, value, onChange,
  rightEl,
}: {
  label: string; type?: string; placeholder: string; id: string;
  value: string; onChange: (val: string) => void;
  rightEl?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '12px',
        fontWeight: 500,
        marginBottom: '4px',
        display: 'block',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontFamily: "'Inter',sans-serif"
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="auth-input"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: focused ? '1px solid #FF2D2D' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px 14px',
            paddingRight: rightEl ? 40 : 14,
            color: 'white',
            fontSize: '14px',
            width: '100%',
            fontFamily: "'Inter',sans-serif",
            outline: 'none',
            boxShadow: focused ? '0 0 0 3px rgba(255, 45, 45, 0.15)' : 'none',
            transition: 'border 0.2s, box-shadow 0.2s',
            boxSizing: 'border-box',
          }}
        />
        {rightEl && (
          <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
            {rightEl}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Password field with show/hide ─── */
function PasswordField({ label, id, value, onChange, placeholder = 'Enter your password', showStrength = false }: { label: string; id: string; value: string; onChange: (val: string) => void; placeholder?: string; showStrength?: boolean }) {
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState(0);
  const [focused, setFocused] = useState(false);

  const calcStrength = (val: string) => {
    let s = 0;
    if (val.length >= 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;
    setStrength(s);
  };

  const handlePwChange = (val: string) => {
    onChange(val);
    if (showStrength) calcStrength(val);
  }

  const colors = ['#FF2D2D', '#FF2D2D', '#FFB800', '#4ade80', '#4ade80'];

  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '12px',
        fontWeight: 500,
        marginBottom: '4px',
        display: 'block',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontFamily: "'Inter',sans-serif"
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => handlePwChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="auth-input"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: focused ? '1px solid #FF2D2D' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px 40px 10px 14px',
            color: 'white',
            fontSize: '14px',
            width: '100%',
            fontFamily: "'Inter',sans-serif",
            outline: 'none',
            boxShadow: focused ? '0 0 0 3px rgba(255, 45, 45, 0.15)' : 'none',
            transition: 'border 0.2s, box-shadow 0.2s',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      </div>
      {showStrength && strength > 0 && (
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? colors[strength] : 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Google SSO button ─── */
function GoogleBtn() {
  return (
    <button type="button" style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 8, padding: '12px', color: 'white', fontSize: 14, fontFamily: "'Inter',sans-serif",
      cursor: 'pointer', transition: 'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Continue with Google
    </button>
  );
}

/* ─── Divider ─── */
function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '14px 0', color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
      <span style={{ fontFamily: "'Inter',sans-serif", whiteSpace: 'nowrap' }}>or continue with</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
    </div>
  );
}

/* ─── Mini AI Logo ─── */
function MiniLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <polygon points="16,2 30,28 2,28" fill="none" stroke="#FF2D2D" strokeWidth="2"/>
        <line x1="7" y1="22" x2="25" y2="22" stroke="#FF2D2D" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="2" fill="#FF2D2D"/>
      </svg>
      <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em' }}>
        <span style={{ color: '#FF2D2D' }}>AI</span>{' '}
        <span style={{ color: 'white' }}>UNIVERSE</span>
      </span>
    </div>
  );
}

/* ─── Submit button ─── */
function SubmitBtn({ label, loading }: { label: string, loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: '100%', background: '#FF2D2D', border: 'none', borderRadius: 8,
        padding: '10px', color: 'white', fontWeight: 700, fontSize: '14px',
        fontFamily: "'Inter',sans-serif", letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
        boxShadow: '0 0 20px rgba(255, 45, 45, 0.35)', transition: 'all 0.2s',
        marginTop: 4,
        opacity: loading ? 0.7 : 1
      }}
      onMouseEnter={e => { if(!loading){ e.currentTarget.style.background = '#e01f1f'; e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 45, 45, 0.55)'; e.currentTarget.style.transform = 'translateY(-1px)';} }}
      onMouseLeave={e => { if(!loading){ e.currentTarget.style.background = '#FF2D2D'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 45, 45, 0.35)'; e.currentTarget.style.transform = 'translateY(0)';} }}
    >
      {loading ? 'PROCESSING...' : label}
    </button>
  );
}

/* ────────────────────────────────────────────────
   LOGIN MODAL CONTENT
──────────────────────────────────────────────── */
function LoginContent({ onSwitch }: { onSwitch: (t: ModalType) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || 'Login failed');

      setAuthToken(data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}><MiniLogo /></div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '26px', fontWeight: 700, color: 'white', margin: '0 0 4px 0' }}>Welcome Back</h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Log in to your AI Universe account</p>
      </div>

      {error && <div style={{ background: 'rgba(255,45,45,0.1)', border: '1px solid #FF2D2D', color: '#FF2D2D', padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{error}</div>}

      <Field id="login-email" value={email} onChange={setEmail} label="Email Address" type="email" placeholder="you@example.com" />
      <div style={{ position: 'relative' }}>
        <PasswordField id="login-password" value={password} onChange={setPassword} label="Password" />
        <span style={{ position: 'absolute', right: 0, top: 0, fontSize: '12px', color: '#FF2D2D', fontFamily: "'Inter',sans-serif", cursor: 'pointer', fontWeight: 500 }}>Forgot Password?</span>
      </div>

      <SubmitBtn label="LOG IN" loading={loading} />
      <OrDivider />
      <GoogleBtn />

      <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter',sans-serif" }}>
        Don&apos;t have an account?{' '}
        <span onClick={() => onSwitch('signup')} style={{ color: '#FF2D2D', cursor: 'pointer', fontWeight: 600 }}>Sign Up</span>
      </div>
    </form>
  );
}

/* ────────────────────────────────────────────────
   SIGNUP MODAL CONTENT
──────────────────────────────────────────────── */
function SignupContent({ onSwitch }: { onSwitch: (t: ModalType) => void }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) return setError('Passwords do not match');
    if (!agreed) return setError('Please agree to the Terms of Service');

    setLoading(true);
    try {
      const res = await fetchWithAuth('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || 'Signup failed');

      setAuthToken(data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}><MiniLogo /></div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '26px', fontWeight: 700, color: 'white', margin: '0 0 4px 0' }}>Create Account</h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Join the future of AI</p>
      </div>

      {error && <div style={{ background: 'rgba(255,45,45,0.1)', border: '1px solid #FF2D2D', color: '#FF2D2D', padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{error}</div>}

      <Field id="signup-name" value={name} onChange={setName} label="Full Name" placeholder="John Doe" />
      <Field id="signup-email" value={email} onChange={setEmail} label="Email Address" type="email" placeholder="you@example.com" />
      <PasswordField id="signup-password" value={password} onChange={setPassword} showStrength label="Password" placeholder="Create a strong password" />
      <PasswordField id="signup-confirm" value={confirmPassword} onChange={setConfirmPassword} label="Confirm Password" placeholder="Repeat your password" />

      {/* Checkbox */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 12 }}>
        <div
          onClick={() => setAgreed(!agreed)}
          style={{
            width: 18, height: 18, minWidth: 18, borderRadius: 4,
            border: agreed ? '1px solid #FF2D2D' : '1px solid rgba(255,255,255,0.2)',
            background: agreed ? 'rgba(255,45,45,0.15)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          {agreed && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#FF2D2D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter',sans-serif" }}>
          I agree to the{' '}
          <span style={{ color: '#FF2D2D', cursor: 'pointer' }}>Terms of Service</span>
          {' '}&amp;{' '}
          <span style={{ color: '#FF2D2D', cursor: 'pointer' }}>Privacy Policy</span>
        </span>
      </label>

      <SubmitBtn label="CREATE ACCOUNT" loading={loading} />
      <OrDivider />
      <GoogleBtn />

      <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter',sans-serif" }}>
        Already have an account?{' '}
        <span onClick={() => onSwitch('login')} style={{ color: '#FF2D2D', cursor: 'pointer', fontWeight: 600 }}>Log In</span>
      </div>
    </form>
  );
}

/* ════════════════════════════════════════════════
   MAIN EXPORT — Auth Modals
════════════════════════════════════════════════ */
export default function AuthModals({ open, onClose, onSwitch }: AuthModalsProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll when open and add modal class
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => { 
      document.body.style.overflow = ''; 
      document.body.classList.remove('modal-open');
    };
  }, [open]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        /* Hide placeholder default color */
        .auth-input::placeholder { color: rgba(255,255,255,0.25); }

        .auth-modal-box::-webkit-scrollbar {
          width: 6px;
        }
        .auth-modal-box::-webkit-scrollbar-track {
          background: transparent;
        }
        .auth-modal-box::-webkit-scrollbar-thumb {
          background: rgba(255, 45, 45, 0.3);
          border-radius: 10px;
        }
        .auth-modal-box {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 45, 45, 0.3) transparent;
        }

        /* Mobile sheet */
        @media (max-width: 480px) {
          .auth-modal-box {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            max-height: 92vh;
            overflow-y: auto;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* Modal box */}
      <div
        className="auth-modal-box"
        data-lenis-prevent="true"
        style={{
          background: 'rgba(8, 12, 28, 0.97)',
          border: '1px solid rgba(255, 45, 45, 0.25)',
          borderRadius: 16,
          padding: '32px 32px',
          width: '100%',
          maxWidth: 420,
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          boxShadow: '0 0 40px rgba(255, 45, 45, 0.1), 0 25px 50px rgba(0, 0, 0, 0.6)',
          animation: 'modalFadeIn 0.3s ease forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,45,45,0.2)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>

        {/* Scrollable content */}
        <div ref={scrollRef}>
          {open === 'login'
            ? <LoginContent  onSwitch={onSwitch} />
            : <SignupContent onSwitch={onSwitch} />
          }
        </div>
      </div>
    </div>
  );
}
