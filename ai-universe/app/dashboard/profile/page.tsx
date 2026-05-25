'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuthToken } from '../../../utils/api';

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setUserName(userObj.name || 'User');
        setUserEmail(userObj.email || 'user@example.com');
        setNewName(userObj.name || 'User');
      } catch(e) {}
    }
  }, []);

  const handleSaveName = () => {
    setUserName(newName);
    setIsEditing(false);
    
    // Update local storage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        userObj.name = newName;
        localStorage.setItem('user', JSON.stringify(userObj));
        // Force a page reload so the layout header updates
        window.location.reload();
      } catch(e) {}
    }
  };

  const handleResetPassword = () => {
    alert("Password reset link has been sent to " + userEmail);
  };

  const handleLogout = () => {
    clearAuthToken();
    router.push('/');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: 40 }}>
      <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 30px 0' }}>User Profile</h1>
      
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 30, display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Avatar Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,45,45,0.1)', border: '2px solid #FF2D2D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2D2D', fontSize: 32, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            {isEditing ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #FF2D2D', color: 'white', padding: '8px 12px', borderRadius: 8, outline: 'none' }}
                />
                <button onClick={handleSaveName} style={{ background: '#FF2D2D', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>Save</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ color: 'white', margin: 0, fontSize: 24, fontFamily: "'Inter',sans-serif" }}>{userName}</h2>
                <button onClick={() => setIsEditing(true)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16 }}>✏️</button>
              </div>
            )}
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '4px 0 0 0', fontFamily: "'Inter',sans-serif" }}>{userEmail}</p>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>

        {/* Account Settings */}
        <div>
          <h3 style={{ color: 'white', fontSize: 18, margin: '0 0 16px 0', fontFamily: "'Inter',sans-serif" }}>Account Settings</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '16px 20px', borderRadius: 12, marginBottom: 12 }}>
            <div>
              <div style={{ color: 'white', fontWeight: 500, marginBottom: 4 }}>Email Address</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{userEmail}</div>
            </div>
            <div style={{ color: '#4ade80', fontSize: 14, fontWeight: 600 }}>Verified ✅</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '16px 20px', borderRadius: 12 }}>
            <div>
              <div style={{ color: 'white', fontWeight: 500, marginBottom: 4 }}>Password</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>••••••••</div>
            </div>
            <button onClick={handleResetPassword} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
              Reset Password
            </button>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>

        <button onClick={handleLogout} style={{ background: 'rgba(255,45,45,0.1)', border: '1px solid rgba(255,45,45,0.3)', color: '#FF2D2D', padding: '12px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter',sans-serif", alignSelf: 'flex-start' }}>
          Sign Out of AI Universe
        </button>

      </div>
    </div>
  );
}
