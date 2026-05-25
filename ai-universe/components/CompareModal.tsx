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

export default function CompareModal({ tools, onClose }: { tools: Tool[], onClose: () => void }) {
  if (tools.length === 0) return null;

  const radarData = [
    { subject: 'Speed', ...tools.reduce((acc, t) => ({...acc, [t.name]: t.speed_score}), {}) },
    { subject: 'Reasoning', ...tools.reduce((acc, t) => ({...acc, [t.name]: t.reasoning_score}), {}) },
    { subject: 'Creativity', ...tools.reduce((acc, t) => ({...acc, [t.name]: t.creativity_score}), {}) },
    { subject: 'Rating', ...tools.reduce((acc, t) => ({...acc, [t.name]: t.rating * 20}), {}) },
  ];

  const priceData = tools.map(t => ({ name: t.name, 'Price ($/mo)': t.price_num }));
  const contextData = tools.map(t => ({ name: t.name, 'Context (Tokens)': t.context_length }));
  const pieData = tools.map(t => ({
    name: t.name,
    value: Math.round((t.speed_score + t.reasoning_score + t.creativity_score + (t.rating * 20)) / 4)
  }));

  const colors = ['#FF2D2D', '#00A8FF', '#4ade80'];
  const glassmorphism = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 20 };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '40px'
    }}>
      <div style={{
        background: '#080c1c', border: '1px solid rgba(255,45,45,0.3)',
        borderRadius: 24, width: '100%', maxWidth: 1200, height: '90vh',
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ margin: 0, fontFamily: "'Orbitron',sans-serif", color: 'white', fontSize: 24 }}>System Comparison</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,45,45,0.1)', border: 'none', color: '#FF2D2D', fontSize: 24, cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {/* Data Table */}
          <h3 style={{ color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 20, marginBottom: 20 }}>Detailed Specifications</h3>
          <div style={{ overflowX: 'auto', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontFamily: "'Inter',sans-serif" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px', borderBottom: '2px solid rgba(255,45,45,0.5)', color: 'rgba(255,255,255,0.5)' }}>Feature</th>
                  {tools.map((t, i) => (
                    <th key={t.id} style={{ textAlign: 'left', padding: '16px', borderBottom: `2px solid ${colors[i]}`, fontSize: 18, color: colors[i] }}>{t.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Category</td>
                  {tools.map(t => <td key={t.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t.category}</td>)}
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Pricing Model</td>
                  {tools.map(t => <td key={t.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t.pricing}</td>)}
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>API Access</td>
                  {tools.map(t => <td key={t.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t.api_available ? '✅ Included' : '❌ No'}</td>)}
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Context Length</td>
                  {tools.map(t => <td key={t.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t.context_length.toLocaleString()} tokens</td>)}
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Rating</td>
                  {tools.map(t => <td key={t.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>⭐ {t.rating}</td>)}
                </tr>
                <tr>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Description</td>
                  {tools.map(t => <td key={t.id} style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{t.description}</td>)}
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 20, marginBottom: 20 }}>Visual Diagnostics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 30 }}>
            {/* Radar Chart */}
            <div style={{ ...glassmorphism, height: 350 }}>
              <h4 style={{ color: 'white', textAlign: 'center', marginBottom: 10, margin: 0, fontFamily: "'Inter',sans-serif" }}>Capabilities Radar</h4>
              <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 8 }} />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  {tools.map((t, i) => (
                    <Radar key={t.id} name={t.name} dataKey={t.name} stroke={colors[i]} fill={colors[i]} fillOpacity={0.4} />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Price Chart */}
            <div style={{ ...glassmorphism, height: 350 }}>
              <h4 style={{ color: 'white', textAlign: 'center', marginBottom: 10, margin: 0, fontFamily: "'Inter',sans-serif" }}>Pricing Comparison</h4>
              <ResponsiveContainer width="100%" height="90%">
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

            {/* Overall Score Pie */}
            <div style={{ ...glassmorphism, height: 350 }}>
              <h4 style={{ color: 'white', textAlign: 'center', marginBottom: 10, margin: 0, fontFamily: "'Inter',sans-serif" }}>Overall Power Score</h4>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" label={({name, value}) => `${name}: ${value}`} labelLine={{ stroke: 'rgba(255,255,255,0.2)' }}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: 8 }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
