'use client';

import { useState } from 'react';

const API_DOCS = [
  {
    name: 'Groq API',
    description: 'The world\'s fastest LLM inference engine using LPUs.',
    pricing: '$0.27 per 1M tokens (Llama 3 8B)',
    rateLimit: '14,400 RPM on paid tier',
    useCases: 'Real-time AI voice assistants, lightning-fast code completion, rapid reasoning.',
    pythonSnippet: `from groq import Groq
import os

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

chat_completion = client.chat.completions.create(
    messages=[{"role": "user", "content": "Explain AI fast."}],
    model="llama3-8b-8192",
)`,
    jsSnippet: `import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: "Explain AI fast." }],
    model: "llama3-8b-8192",
  });
  console.log(completion.choices[0]?.message?.content);
}`
  },
  {
    name: 'OpenAI API',
    description: 'The industry standard for large language models and multimodality.',
    pricing: '$5.00 per 1M input tokens (GPT-4o)',
    rateLimit: '10,000 RPM (Tier 5)',
    useCases: 'General purpose chat, reasoning, coding, data extraction, image generation.',
    pythonSnippet: `from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[{"role": "user", "content": "Hello"}]
)`,
    jsSnippet: `import OpenAI from "openai";
const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are helpful." }],
    model: "gpt-4o",
  });
}`
  },
  {
    name: 'Claude API',
    description: 'Anthropic\'s highly capable, safe, and massive context window models.',
    pricing: '$3.00 per 1M input tokens (Sonnet 3.5)',
    rateLimit: '4,000 RPM (Tier 4)',
    useCases: 'Large document analysis (200k context), coding, nuanced writing.',
    pythonSnippet: `import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Hello Claude"}]
)`,
    jsSnippet: `import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();
const msg = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20240620",
  max_tokens: 1000,
  messages: [{ role: "user", content: "Hello" }]
});`
  }
];

export default function ApiLearningHub() {
  const [activeApi, setActiveApi] = useState(0);
  const [activeTab, setActiveTab] = useState<'python' | 'js'>('python');

  const active = API_DOCS[activeApi];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 8px 0' }}>API Learning Hub</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter',sans-serif" }}>
          Learn how to integrate the world's top AI services into your applications.
        </p>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: 30 }}>
        
        {/* Sidebar Nav */}
        <div style={{ width: 250, borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: 20 }}>
          {API_DOCS.map((doc, i) => (
            <div 
              key={doc.name}
              onClick={() => setActiveApi(i)}
              style={{
                padding: '12px 16px', borderRadius: 8, cursor: 'pointer', marginBottom: 10,
                background: activeApi === i ? 'rgba(255,45,45,0.1)' : 'transparent',
                color: activeApi === i ? '#FF2D2D' : 'rgba(255,255,255,0.6)',
                borderLeft: activeApi === i ? '3px solid #FF2D2D' : '3px solid transparent',
                fontWeight: activeApi === i ? 600 : 400, transition: 'all 0.2s', fontFamily: "'Inter',sans-serif"
              }}
            >
              {doc.name}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: 30, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ color: 'white', fontSize: 24, margin: '0 0 10px 0', fontFamily: "'Inter',sans-serif" }}>{active.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 30 }}>{active.description}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
            <div style={{ background: 'rgba(8,12,28,0.8)', padding: 20, borderRadius: 12, border: '1px solid rgba(255,45,45,0.2)' }}>
              <h4 style={{ color: '#FF2D2D', margin: '0 0 10px 0', fontSize: 13, textTransform: 'uppercase' }}>Pricing & Limits</h4>
              <div style={{ color: 'white', fontSize: 14, marginBottom: 8 }}><strong>Cost:</strong> {active.pricing}</div>
              <div style={{ color: 'white', fontSize: 14 }}><strong>Rate Limit:</strong> {active.rateLimit}</div>
            </div>
            <div style={{ background: 'rgba(8,12,28,0.8)', padding: 20, borderRadius: 12, border: '1px solid rgba(0,168,255,0.2)' }}>
              <h4 style={{ color: '#00A8FF', margin: '0 0 10px 0', fontSize: 13, textTransform: 'uppercase' }}>Best Use Cases</h4>
              <div style={{ color: 'white', fontSize: 14, lineHeight: 1.5 }}>{active.useCases}</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 20 }}>
              <button 
                onClick={() => setActiveTab('python')}
                style={{ 
                  padding: '10px 20px', background: 'none', border: 'none', color: activeTab === 'python' ? 'white' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeTab === 'python' ? '2px solid #FF2D2D' : '2px solid transparent', cursor: 'pointer',
                  fontWeight: 600, fontFamily: "'Inter',sans-serif"
                }}
              >Python</button>
              <button 
                onClick={() => setActiveTab('js')}
                style={{ 
                  padding: '10px 20px', background: 'none', border: 'none', color: activeTab === 'js' ? 'white' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeTab === 'js' ? '2px solid #FF2D2D' : '2px solid transparent', cursor: 'pointer',
                  fontWeight: 600, fontFamily: "'Inter',sans-serif"
                }}
              >Node.js</button>
            </div>

            <pre style={{ 
              background: '#0d1117', padding: 20, borderRadius: 12, color: '#e6edf3', 
              fontSize: 14, overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)',
              fontFamily: "'Courier New', Courier, monospace"
            }}>
              <code>
                {activeTab === 'python' ? active.pythonSnippet : active.jsSnippet}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
