import React from 'react';

interface SectionIndicatorProps {
  number: string;
}

export default function SectionIndicator({ number }: SectionIndicatorProps) {
  return (
    <div style={{
      position: 'absolute', 
      left: '20px', 
      top: '50%', 
      transform: 'translateY(-50%)',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '12px', 
      zIndex: 10,
    }}>
      {/* Muted Section Number rotated -90deg */}
      <span style={{ 
        fontFamily: "'Orbitron', sans-serif", 
        fontSize: '0.7rem', 
        letterSpacing: '0.2em', 
        color: 'rgba(255,255,255,0.3)', 
        transform: 'rotate(-90deg)',
        display: 'inline-block',
        marginBottom: '4px'
      }}>
        {number}
      </span>
      
      {/* Small Red Dot */}
      <div style={{ 
        width: '6px', 
        height: '6px', 
        borderRadius: '50%', 
        background: '#FF2D2D', 
        boxShadow: '0 0 8px rgba(255,45,45,0.8)' 
      }} />
      
      {/* Vertical Line */}
      <div style={{ 
        width: '1px', 
        height: '60px', 
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' 
      }} />
    </div>
  );
}
