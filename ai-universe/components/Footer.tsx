'use client';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(0,0,0,0.98)',
      borderTop: '1px solid rgba(255,45,45,0.2)',
      padding: '60px 80px 30px 80px',
      width: '100%',
    }}>
      {/* ─── Top Row: 4 Columns ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Column 1 - Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 30,28 2,28" fill="none" stroke="#FF2D2D" strokeWidth="2.5"/>
              <line x1="7" y1="22" x2="25" y2="22" stroke="#FF2D2D" strokeWidth="2"/>
              <circle cx="16" cy="16" r="2.5" fill="#FF2D2D"/>
            </svg>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em' }}>
              <span style={{ color: '#FF2D2D' }}>AI</span> <span style={{ color: 'white' }}>UNIVERSE</span>
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: "'Inter',sans-serif" }}>
            Explore. Learn. Create.
          </span>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', maxWidth: '200px', lineHeight: 1.6, margin: 0, fontFamily: "'Inter',sans-serif" }}>
            The next generation of artificial intelligence platform.
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            {['github', 'linkedin', 'twitter', 'instagram'].map(platform => (
              <a key={platform} href="#" style={{
                width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.background = 'rgba(255,45,45,0.2)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(255,45,45,0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ width: 14, height: 14, background: 'currentColor', WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E")`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: '#FF2D2D', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px 0', fontFamily: "'Inter',sans-serif" }}>
            NAVIGATION
          </h4>
          {[
            { name: 'Home', path: '/' },
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Explore AI', path: '/dashboard/explore' },
            { name: 'Compare', path: '/dashboard/compare' }
          ].map(link => (
            <a key={link.name} href={link.path} style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '14px', textDecoration: 'none', padding: '4px 0',
              borderLeft: '2px solid transparent', paddingLeft: '0', transition: 'all 0.2s', fontFamily: "'Inter',sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderLeft = '2px solid #FF2D2D';
              e.currentTarget.style.paddingLeft = '10px';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.borderLeft = '2px solid transparent';
              e.currentTarget.style.paddingLeft = '0';
            }}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Column 3 - Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: '#FF2D2D', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px 0', fontFamily: "'Inter',sans-serif" }}>
            CONTACT
          </h4>
          
          <a href="mailto:goderaja288@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', marginBottom: '8px', fontFamily: "'Inter',sans-serif" }}
             onMouseEnter={e => e.currentTarget.style.color = '#FF2D2D'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <span style={{ color: '#FF2D2D', fontSize: '16px' }}>✉</span> goderaja288@gmail.com
          </a>
          
          <a href="tel:+916304218886" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', marginBottom: '8px', fontFamily: "'Inter',sans-serif" }}
             onMouseEnter={e => e.currentTarget.style.color = '#FF2D2D'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <span style={{ color: '#FF2D2D', fontSize: '16px' }}>📞</span> +91 63042 18886
          </a>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '8px', fontFamily: "'Inter',sans-serif" }}>
            <span style={{ color: '#FF2D2D', fontSize: '16px' }}>👤</span> Gode Sivaramakrishna Durgaprasad
          </div>
        </div>

        {/* Column 4 - Newsletter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ color: '#FF2D2D', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px 0', fontFamily: "'Inter',sans-serif" }}>
            STAY UPDATED
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '0 0 8px 0', fontFamily: "'Inter',sans-serif" }}>
            Get the latest AI Universe updates.
          </p>
          <div style={{ display: 'flex' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '10px 14px',
                color: 'white',
                fontSize: '13px',
                flex: 1,
                outline: 'none',
                fontFamily: "'Inter',sans-serif",
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#FF2D2D'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button style={{
              background: '#FF2D2D',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '0 8px 8px 0',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#cc0000';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255,45,45,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FF2D2D';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              →
            </button>
          </div>
        </div>
      </div>

      {/* ─── Divider Line ─── */}
      <div style={{
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
        margin: '40px auto 30px auto',
        maxWidth: '1400px',
      }} />

      {/* ─── Bottom Row ─── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: "'Inter',sans-serif"
      }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
          © 2025 AI Universe. All rights reserved.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
          Built with <span style={{ color: '#FF2D2D' }}>❤️</span> by <span style={{ color: '#FF2D2D', fontWeight: 500 }}>Gode Sivaramakrishna Durgaprasad</span>
        </div>
      </div>
    </footer>
  );
}
