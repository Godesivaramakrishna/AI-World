'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../utils/api';
import Link from 'next/link';

export default function DashboardHome() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/tools')
      .then(res => res.json())
      .then(data => setTools(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading ecosystem...</div>;
  }

  const codingTools = tools.filter(t => t.category === 'Coding AI').slice(0, 3);
  const videoTools = tools.filter(t => t.category === 'Video Generation AI').slice(0, 3);
  const trendingTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const renderToolCard = (tool: any) => (
    <div key={tool.id} style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12, padding: 16, cursor: 'pointer', transition: 'all 0.2s',
      display: 'flex', flexDirection: 'column'
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,45,45,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <h4 style={{ margin: 0, color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 16 }}>{tool.name}</h4>
        <span style={{ fontSize: 12, color: '#FFD700' }}>⭐ {tool.rating}</span>
      </div>
      <p style={{ margin: '0 0 12px 0', fontSize: 13, color: 'rgba(255,255,255,0.5)', flex: 1 }}>{tool.description.substring(0, 60)}...</p>
      <div style={{ display: 'flex', gap: 8, fontSize: 11, fontWeight: 600 }}>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: 4, color: 'white' }}>{tool.pricing}</span>
        <span style={{ background: 'rgba(0,168,255,0.1)', padding: '4px 8px', borderRadius: 4, color: '#00A8FF' }}>{tool.category}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 40, background: 'linear-gradient(90deg, rgba(255,45,45,0.1), transparent)', padding: 30, borderRadius: 16, border: '1px solid rgba(255,45,45,0.2)' }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 32, color: 'white', margin: '0 0 10px 0' }}>Welcome to AI Universe</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: "'Inter',sans-serif", maxWidth: 600 }}>
          The central hub for discovering, comparing, and exploring the global AI ecosystem. 
          Currently tracking thousands of next-generation tools.
        </p>
        <Link href="/dashboard/explore" style={{ display: 'inline-block', marginTop: 20, padding: '10px 20px', background: '#FF2D2D', color: 'white', textDecoration: 'none', borderRadius: 8, fontWeight: 600 }}>
          Explore Full Directory →
        </Link>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Inter',sans-serif", color: 'white', fontSize: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          🔥 Trending AI Tools
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {trendingTools.map(renderToolCard)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
        <div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", color: 'white', fontSize: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            💻 Top Coding AI
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {codingTools.map(renderToolCard)}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "'Inter',sans-serif", color: 'white', fontSize: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            🎬 Top Video Generation
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {videoTools.map(renderToolCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
