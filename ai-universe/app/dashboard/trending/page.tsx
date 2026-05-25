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

export default function TrendingPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/tools')
      .then(res => res.json())
      .then(data => {
        // Sort by highest rating first, limit to top 15
        const sorted = data.sort((a: Tool, b: Tool) => b.rating - a.rating).slice(0, 15);
        setTools(sorted);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading trending tools...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 30, display: 'flex', alignItems: 'center', gap: 15 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0' }}>Trending AI Tools</h1>
        <div style={{ background: 'rgba(255,45,45,0.1)', border: '1px solid #FF2D2D', color: '#FF2D2D', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>HOT 🔥</div>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 30px 0', fontFamily: "'Inter',sans-serif" }}>The highest-rated artificial intelligence platforms this week.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {tools.map((tool, index) => (
          <div key={tool.id} className="tool-card" style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 24, transition: 'all 0.3s', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
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
            {/* Rank badge */}
            <div style={{ position: 'absolute', top: 0, right: 0, background: index < 3 ? '#FF2D2D' : 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 14px', borderBottomLeftRadius: 16, fontWeight: 700, fontSize: 14 }}>
              #{index + 1}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <h3 style={{ margin: 0, color: 'white', fontSize: 20, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{tool.name}</h3>
            </div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ background: 'rgba(0,168,255,0.1)', color: '#00A8FF', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{tool.category}</span>
            </div>
            
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, flex: 1, margin: '0 0 20px 0' }}>{tool.description}</p>
            
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, fontSize: 12, fontWeight: 500 }}>
              <span style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: 6 }}>{tool.pricing}</span>
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
