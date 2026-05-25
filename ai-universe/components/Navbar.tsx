'use client';

import { useState, useEffect } from 'react';
import AuthModals from './AuthModals';

const NAV_LINKS = ['HOME', 'EXPLORE AI', 'CATEGORIES', 'COMPARE', 'APIS', 'CHAT WITH AI', 'ABOUT'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('HOME');
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.4)',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
        {/* Geometric A icon */}
        <div style={{ position: 'relative', width: 32, height: 32 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="16,2 30,28 2,28" fill="none" stroke="#FF2D2D" strokeWidth="2"/>
            <polygon points="16,2 30,28 2,28" fill="none" stroke="#00A8FF" strokeWidth="1.5" strokeDasharray="4 4"/>
            <line x1="7" y1="22" x2="25" y2="22" stroke="#FF2D2D" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="2" fill="#FF2D2D"/>
          </svg>
        </div>
        <div className="logo-text">
          <span style={{ color: '#FF2D2D' }}>AI</span>{' '}
          <span style={{ color: 'white' }}>UNIVERSE</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <span
            key={link}
            className={`nav-link ${active === link ? 'active' : ''}`}
            onClick={() => setActive(link)}
          >
            {link}
          </span>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-[12px]">
        <button
          onClick={() => setAuthModal('login')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            padding: '10px 24px',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#FF2D2D';
            e.currentTarget.style.color = '#FF2D2D';
            e.currentTarget.style.background = 'rgba(255,45,45,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          LOG IN
        </button>
        <button
          onClick={() => setAuthModal('signup')}
          style={{
            background: '#FF2D2D',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 24px',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(255,45,45,0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#cc0000';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255,45,45,0.7)';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF2D2D';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255,45,45,0.4)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          SIGN UP
        </button>
      </div>

      {/* Mobile Icon Buttons */}
      <div className="flex md:hidden items-center gap-4">
        <button
          onClick={() => setAuthModal('login')}
          style={{ background: 'transparent', border: 'none', color: '#FF2D2D', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(255,45,45,0.5))' }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button
          onClick={() => setAuthModal('signup')}
          style={{ background: 'transparent', border: 'none', color: '#FF2D2D', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(255,45,45,0.5))' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* Auth Modals */}
      <AuthModals 
        open={authModal} 
        onClose={() => setAuthModal(null)} 
        onSwitch={(type) => setAuthModal(type)} 
      />
    </nav>
  );
}
