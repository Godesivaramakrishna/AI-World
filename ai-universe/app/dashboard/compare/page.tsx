'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(tools.map(t => t.category))).sort()];
  const filteredTools = selectedCategory === 'All' ? tools : tools.filter(t => t.category === selectedCategory);

  useEffect(() => {
    fetchWithAuth('/tools')
      .then(res => res.json())
      .then(data => setTools(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare data for Radar Chart (Capabilities)
  const radarData = [
    { subject: 'Speed', ...comparedTools.reduce((acc, t) => ({...acc, [t.name]: t.speed_score}), {}) },
    { subject: 'Reasoning', ...comparedTools.reduce((acc, t) => ({...acc, [t.name]: t.reasoning_score}), {}) },
    { subject: 'Creativity', ...comparedTools.reduce((acc, t) => ({...acc, [t.name]: t.creativity_score}), {}) },
    { subject: 'Rating', ...comparedTools.reduce((acc, t) => ({...acc, [t.name]: t.rating * 20}), {}) },
  ];

  // Prepare data for Bar Charts
  const priceData = comparedTools.map(t => ({ name: t.name, 'Price ($/mo)': t.price_num }));
  const contextData = comparedTools.map(t => ({ name: t.name, 'Context (Tokens)': t.context_length }));

  // Prepare data for Pie Chart (Overall Power Score)
  const pieData = comparedTools.map(t => ({
    name: t.name,
    value: Math.round((t.speed_score + t.reasoning_score + t.creativity_score + (t.rating * 20)) / 4)
  }));

  const colors = ['#FF2D2D', '#00A8FF', '#4ade80'];
  const glassmorphism = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 20 };

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 8px 0' }}>Visual Comparison Engine</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter',sans-serif" }}>
          Select up to 3 tools to visualize and compare all their aspects including pricing, capabilities, and technical specs.
        </p>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
            padding: '10px 16px', color: 'white', fontFamily: "'Inter',sans-serif", outline: 'none', cursor: 'pointer'
          }}
        >
          {categories.map(c => <option key={c} value={c} style={{ background: '#080c1c' }}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 30 }}>
        {filteredTools.map(tool => (
          <div 
            key={tool.id} 
            onClick={() => toggleSelect(tool.id)}
            style={{
              padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
              border: selectedIds.includes(tool.id) ? '1px solid #FF2D2D' : '1px solid rgba(255,255,255,0.1)',
              background: selectedIds.includes(tool.id) ? 'rgba(255,45,45,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedIds.includes(tool.id) ? '#FF2D2D' : 'rgba(255,255,255,0.7)',
              fontSize: 13, transition: 'all 0.2s', fontFamily: "'Inter',sans-serif"
            }}
          >
            {tool.name}
          </div>
        ))}
      </div>

      <button 
        onClick={handleCompare}
        disabled={selectedIds.length < 2}
        style={{
          padding: '12px 24px', background: selectedIds.length >= 2 ? '#FF2D2D' : 'rgba(255,255,255,0.1)',
          color: selectedIds.length >= 2 ? 'white' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 8,
          fontWeight: 700, cursor: selectedIds.length >= 2 ? 'pointer' : 'not-allowed',
          marginBottom: 40, fontFamily: "'Inter',sans-serif", letterSpacing: 1
        }}
      >
        COMPARE SELECTED ({selectedIds.length}/3)
      </button>

      {comparedTools.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          
          {/* Quick Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {comparedTools.map((t, i) => (
              <div key={t.id} style={{ background: 'rgba(8,12,28,0.7)', border: `1px solid ${colors[i]}`, borderRadius: 16, padding: 20, boxShadow: `0 0 15px ${colors[i]}20` }}>
                <h3 style={{ color: colors[i], margin: '0 0 10px 0', fontSize: 20 }}>{t.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 5px 0', fontSize: 14 }}><strong>Category:</strong> {t.category}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 5px 0', fontSize: 14 }}><strong>API Support:</strong> {t.api_available ? '✅ Yes' : '❌ No'}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 5px 0', fontSize: 14 }}><strong>Pricing:</strong> {t.pricing} (${t.price_num}/mo)</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 5px 0', fontSize: 14 }}><strong>Context Window:</strong> {t.context_length.toLocaleString()} tokens</p>
                <p style={{ color: '#FFD700', margin: '0 0 0 0', fontSize: 14 }}><strong>⭐ {t.rating} / 5.0</strong></p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 30 }}>
            {/* 1. Radar Chart (Capabilities) */}
            <div style={{ ...glassmorphism, height: 400 }}>
              <h3 style={{ color: 'white', textAlign: 'center', marginBottom: 20, fontFamily: "'Inter',sans-serif" }}>Capabilities Radar (0-100)</h3>
              <ResponsiveContainer width="100%" height="80%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 8 }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  {comparedTools.map((t, i) => (
                    <Radar key={t.id} name={t.name} dataKey={t.name} stroke={colors[i]} fill={colors[i]} fillOpacity={0.4} />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Bar Chart (Pricing) */}
            <div style={{ ...glassmorphism, height: 400 }}>
              <h3 style={{ color: 'white', textAlign: 'center', marginBottom: 20, fontFamily: "'Inter',sans-serif" }}>Base Pricing Comparison</h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(val) => `$${val}`} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 8 }} />
                  <Bar dataKey="Price ($/mo)" radius={[4, 4, 0, 0]}>
                    {priceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 3. Bar Chart (Context Window) */}
            <div style={{ ...glassmorphism, height: 400 }}>
              <h3 style={{ color: 'white', textAlign: 'center', marginBottom: 20, fontFamily: "'Inter',sans-serif" }}>Context Window (Tokens)</h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={contextData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 8 }} />
                  <Bar dataKey="Context (Tokens)" radius={[0, 4, 4, 0]}>
                    {contextData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 4. Pie Chart (Overall Power Score) */}
            <div style={{ ...glassmorphism, height: 400 }}>
              <h3 style={{ color: 'white', textAlign: 'center', marginBottom: 20, fontFamily: "'Inter',sans-serif" }}>Overall Power Score Breakdown</h3>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                    labelLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 8 }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
