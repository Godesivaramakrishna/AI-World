'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Category {
  name: string;
  count: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  'Chat AI': '🤖',
  'Coding AI': '💻',
  'Image Generation AI': '🎨',
  'Video Generation AI': '🎬',
  'Voice AI': '🎤',
  'Website Builder AI': '🌐',
  'App Builder AI': '📱',
  'Automation AI': '⚡',
  'Productivity AI': '📊',
  'Education AI': '📚',
  'Research AI': '🧠',
  'Music AI': '🎵',
  'Marketing AI': '📈',
  'Ecommerce AI': '🛒',
  'Cybersecurity AI': '🔒',
  'Cloud & DevOps AI': '☁️',
  'Game Development AI': '🎮',
  'Healthcare AI': '🧬',
  'Resume & Career AI': '📄',
  'Meeting Assistant AI': '📹'
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ color: 'white' }}>Loading ecosystem...</div>;
  }

  // Pre-fill categories that might have 0 tools for UI completeness
  const displayCategories = Object.keys(CATEGORY_ICONS).map(name => {
    const existing = categories.find(c => c.name === name);
    return { name, count: existing ? existing.count : 0 };
  });

  return (
    <div>
      <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 8px 0' }}>AI Ecosystem Categories</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter',sans-serif" }}>
          Explore the universe of artificial intelligence divided into modern, specialized domains.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {displayCategories.map(cat => (
          <div key={cat.name} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 24, transition: 'all 0.3s', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0,168,255,0.5)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0,168,255,0.15)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{CATEGORY_ICONS[cat.name] || '🧠'}</div>
            <h3 style={{ margin: '0 0 8px 0', color: 'white', fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{cat.name}</h3>
            <p style={{ color: cat.count > 0 ? '#4ade80' : 'rgba(255,255,255,0.3)', margin: 0, fontSize: 13, fontWeight: 600 }}>
              {cat.count} {cat.count === 1 ? 'Tool' : 'Tools'} Available
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
