import React from 'react';

const RetroGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden opacity-[0.7] pointer-events-none">
      {/* Moving Dot Pattern */}
      <div 
        className="absolute h-[200%] w-[200%] -left-[50%] -top-[50%] animate-grid-flow"
        style={{
          backgroundImage: `radial-gradient(circle, #1a73e8 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      ></div>
      
      {/* Radial Mask to fade out edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50"></div>
    </div>
  );
};

export default RetroGrid;