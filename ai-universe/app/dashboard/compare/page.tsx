'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import CompareModal from '../../../components/CompareModal';

interface Tool {
  id: number;
  name: string;
  category: string;
  pricing: string;
  price_num: number;
  speed_score: number;
  context_length: number;
  reasoning_score: number;
  creativity_score: number;
  api_available: boolean;
  rating: number;
  description: string;
}

export default function ComparePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [comparedTools, setComparedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation State
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWithAuth('/tools')
      .then(res => res.json())
      .then(data => setTools(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Compute distinct categories
  const categories = Array.from(new Set(tools.map(t => t.category))).sort();
  
  // Compute tools counts per category
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = tools.filter(t => t.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        alert("You can only compare up to 3 tools at a time.");
      }
    }
  };

  const handleCompare = async () => {
    if (selectedIds.length === 0) return;
    try {
      const res = await fetchWithAuth(`/tools/compare?ids=${selectedIds.join(',')}`);
      const data = await res.json();
      setComparedTools(data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderAZToolBrowser = () => {
    const categoryTools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
    
    // Group tools by starting letter
    const groupedTools = categoryTools.reduce((acc, tool) => {
      const letter = tool.name.charAt(0).toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(tool);
      return acc;
    }, {} as Record<string, Tool[]>);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
      <div style={{ paddingBottom: 120 }}>
        
        {/* Alphabet Jump Bar */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40, background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={() => setSelectedLetter(null)}
            style={{
              background: selectedLetter === null ? '#FF2D2D' : 'transparent',
              color: selectedLetter === null ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none', fontSize: 14, fontWeight: 600, padding: '4px 12px',
              borderRadius: 6, cursor: 'pointer', fontFamily: "'Inter',sans-serif"
            }}
          >
            ALL
          </button>
          {alphabet.map(letter => (
            <button 
              key={letter} 
              onClick={() => setSelectedLetter(letter)}
              style={{
                background: selectedLetter === letter ? '#FF2D2D' : 'transparent',
                color: groupedTools[letter] ? (selectedLetter === letter ? 'white' : 'white') : 'rgba(255,255,255,0.2)',
                border: 'none', fontSize: 14, fontWeight: 600, padding: '4px 8px',
                borderRadius: 4, cursor: groupedTools[letter] ? 'pointer' : 'default',
                pointerEvents: groupedTools[letter] ? 'auto' : 'none',
                fontFamily: "'Inter',sans-serif"
              }}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Tools A-Z List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {Object.keys(groupedTools).sort()
            .filter(letter => selectedLetter === null || letter === selectedLetter)
            .map(letter => (
            <div key={letter} id={`letter-${letter}`}>
              <h3 style={{ color: '#FF2D2D', fontSize: 24, margin: '0 0 20px 0', borderBottom: '1px solid rgba(255,45,45,0.3)', paddingBottom: 10 }}>{letter}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {groupedTools[letter].map(tool => (
                  <div 
                    key={tool.id} 
                    onClick={() => toggleSelect(tool.id)}
                    style={{
                      background: selectedIds.includes(tool.id) ? 'rgba(255,45,45,0.1)' : 'rgba(255,255,255,0.02)',
                      border: selectedIds.includes(tool.id) ? '1px solid #FF2D2D' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12, padding: '20px', cursor: 'pointer', transition: 'all 0.2s',
                      display: 'flex', flexDirection: 'column', gap: 8
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ color: 'white', margin: 0, fontSize: 18 }}>{tool.name}</h4>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(tool.id)} 
                        onChange={() => {}} 
                        style={{ accentColor: '#FF2D2D', width: 18, height: 18 }} 
                      />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: 13, lineHeight: 1.5, flex: 1 }}>{tool.description.substring(0, 80)}...</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                      <span style={{ fontSize: 12, color: '#00A8FF', background: 'rgba(0,168,255,0.1)', padding: '4px 8px', borderRadius: 4 }}>{tool.pricing}</span>
                      <span style={{ fontSize: 12, color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '4px 8px', borderRadius: 4 }}>⭐ {tool.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 8px 0' }}>AI Ecosystem Comparison</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter',sans-serif" }}>
          Browse A-Z and select up to 3 tools to compare their exact specifications.
        </p>
      </div>

      {loading ? (
        <div style={{ color: 'white' }}>Loading tools ecosystem...</div>
      ) : (
        renderAZToolBrowser()
      )}

      {/* Sticky Bottom Compare Bar */}
      {selectedIds.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(8,12,28,0.9)', backdropFilter: 'blur(10px)', border: '1px solid #FF2D2D',
          borderRadius: 40, padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 30,
          boxShadow: '0 10px 40px rgba(255,45,45,0.3)', zIndex: 100
        }}>
          <div style={{ color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 16 }}>
            Selected <strong>{selectedIds.length}/3</strong> Tools
          </div>
          <button 
            onClick={() => { setSelectedIds([]); setSelectedLetter(null); }}
            style={{
              padding: '12px 24px', background: 'transparent',
              color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20,
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: "'Inter',sans-serif", letterSpacing: 1
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          >
            CLEAR ALL
          </button>
          <button 
            onClick={handleCompare}
            disabled={selectedIds.length < 2}
            style={{
              padding: '12px 24px', background: selectedIds.length >= 2 ? '#FF2D2D' : 'rgba(255,255,255,0.1)',
              color: selectedIds.length >= 2 ? 'white' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 20,
              fontWeight: 700, cursor: selectedIds.length >= 2 ? 'pointer' : 'not-allowed',
              fontFamily: "'Inter',sans-serif", letterSpacing: 1, transition: 'all 0.2s'
            }}
          >
            COMPARE SELECTED
          </button>
        </div>
      )}

      {showModal && (
        <CompareModal tools={comparedTools} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
