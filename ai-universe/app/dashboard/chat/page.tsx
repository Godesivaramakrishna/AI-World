'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchWithAuth } from '../../../utils/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Best free AI image generator?",
  "ChatGPT vs Claude comparison",
  "AI tools for coding under $20?",
  "Free text to speech API?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Universe Assistant. I can help you discover, compare, and choose the best AI tools for your specific needs. What are you looking for today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const newMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetchWithAuth('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Backend might be down.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, color: 'white', margin: '0 0 8px 0' }}>Smart AI Assistant</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Inter',sans-serif" }}>Get personalized tool recommendations and comparisons.</p>
      </div>

      <div style={{
        flex: 1, background: 'rgba(8,12,28,0.7)', border: '1px solid rgba(255,45,45,0.2)',
        borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)'
      }}>
        {/* Chat window */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '14px 18px', borderRadius: 16,
                background: msg.role === 'user' ? '#FF2D2D' : 'rgba(255,255,255,0.05)',
                color: 'white', fontSize: 15, lineHeight: 1.6, fontFamily: "'Inter',sans-serif",
                border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                boxShadow: msg.role === 'user' ? '0 0 15px rgba(255,45,45,0.3)' : 'none',
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 16,
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '14px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)' }}>
          {/* Prompt chips */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
            {SUGGESTED_PROMPTS.map(p => (
              <button 
                key={p} 
                onClick={() => sendMessage(p)}
                style={{
                  whiteSpace: 'nowrap', padding: '6px 12px', borderRadius: 20,
                  background: 'rgba(255,45,45,0.1)', border: '1px solid rgba(255,45,45,0.3)',
                  color: '#FF2D2D', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <form 
            onSubmit={e => { e.preventDefault(); sendMessage(input); }}
            style={{ display: 'flex', gap: 10 }}
          >
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about AI tools..."
              style={{
                flex: 1, padding: '14px 20px', borderRadius: 24, background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 15, outline: 'none',
                fontFamily: "'Inter',sans-serif"
              }}
              onFocus={e => e.target.style.borderColor = '#FF2D2D'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              style={{
                width: 50, height: 50, borderRadius: '50%', background: '#FF2D2D', border: 'none',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', opacity: (loading || !input.trim()) ? 0.5 : 1, transition: 'all 0.2s'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
