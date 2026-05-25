'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthToken } from '../../utils/api';

const MAIN_NAV = [
  { name: 'Home', path: '/dashboard', icon: '🏠' },
  { name: 'Explore AI', path: '/dashboard/explore', icon: '🤖' },
  { name: 'Category Compare', path: '/dashboard/compare', icon: '⚖️' },
  { name: 'Chat With AI', path: '/dashboard/chat', icon: '💬' },
  { name: 'Trending AI Tools', path: '/dashboard/trending', icon: '📈' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setUserName(userObj.name || 'User');
        } catch(e) {}
      }
    }
  }, [router]);

  const handleLogout = (e: any) => {
    e.preventDefault();
    clearAuthToken();
    router.push('/');
  };

  const NavItem = ({ item, isLogout = false, onClick = undefined }: any) => {
    const isActive = !isLogout && (pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path)));
    
    return (
      <Link href={item.path || '#'} onClick={onClick} style={{
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12,
        textDecoration: 'none', color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
        background: isActive ? 'rgba(255,45,45,0.1)' : 'transparent',
        borderRight: isActive ? '3px solid #FF2D2D' : '3px solid transparent',
        fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: isActive ? 600 : 400,
        transition: 'all 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={e => { if(!isActive) e.currentTarget.style.color = 'white'; }}
      onMouseLeave={e => { if(!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
      >
        <span style={{ fontSize: 18 }}>{item.icon}</span>
        <span style={{ whiteSpace: 'nowrap', opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>{item.name}</span>
      </Link>
    );
  };

  return (
    <div style={{ height: '100vh', background: '#000000', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header style={{
        height: '70px', borderBottom: '1px solid rgba(255,45,45,0.2)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
        background: 'rgba(8,12,28,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 20 }}>
            ☰
          </button>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#FF2D2D', fontSize: 20 }}>△</span>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, color: 'white', letterSpacing: '2px' }}>
              <span style={{ color: '#FF2D2D' }}>AI</span> UNIVERSE
            </span>
          </Link>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <input 
            type="text" 
            placeholder="Search AI tools..." 
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px', borderRadius: 20, color: 'white', outline: 'none',
              width: '250px', fontFamily: "'Inter',sans-serif"
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'white', fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,45,45,0.2)', color: '#FF2D2D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: '1px solid rgba(255,45,45,0.5)' }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: 14 }}>{userName}</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '250px' : '0px',
          transition: 'width 0.3s ease',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(8,12,28,0.5)',
          display: 'flex',
          flexDirection: 'column',
          padding: sidebarOpen ? '20px 0' : '0'
        }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {MAIN_NAV.map(item => <NavItem key={item.name} item={item} />)}
          </div>
          
          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
            <NavItem item={{ name: 'Profile', path: '/dashboard/profile', icon: '👤' }} />
            <NavItem item={{ name: 'Logout', path: '#', icon: '⏻' }} isLogout onClick={handleLogout} />
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
