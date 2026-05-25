'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Tool {
  id: number;
  name: string;
  category: string;
  pricing: string;
  api_available: boolean;
  rating: number;
  description: string;
}

export default function DashboardPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/tools')
      .then(res => res.json())
      .then(data => setTools(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading tools...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 8px 0' }}>Explore AI Tools</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter',sans-serif" }}>Discover the best artificial intelligence tools across the universe.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {tools.map(tool => (
          <div key={tool.id} className="tool-card" style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 24, transition: 'all 0.3s', cursor: 'pointer',
            display: 'flex', flexDirection: 'column'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,45,45,0.5)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,45,45,0.1)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{tool.name}</h3>
              <span style={{ background: 'rgba(0,168,255,0.1)', color: '#00A8FF', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{tool.category}</span>
            </div>
            
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, flex: 1, margin: '0 0 20px 0' }}>{tool.description}</p>
            
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, fontSize: 12, fontWeight: 500 }}>
              <span style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: 6 }}>{tool.pricing}</span>
              <span style={{ color: tool.api_available ? '#4ade80' : 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 6 }}>
                API: {tool.api_available ? '✅' : '❌'}
              </span>
              <span style={{ color: '#FFD700', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 6 }}>⭐ {tool.rating}</span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, padding: '10px', background: '#FF2D2D', border: 'none', borderRadius: 8, color: 'white', fontWeight: 600, cursor: 'pointer' }}>Visit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
