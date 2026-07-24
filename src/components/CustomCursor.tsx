import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, select, textarea, [data-interactive="true"]');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer subtle halo ring */}
      <div
        className="absolute rounded-full border border-amber-500/40 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          backgroundColor: isHovered ? 'rgba(212, 136, 33, 0.08)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isMouseDown ? 0.8 : 1})`,
        }}
      />
      {/* Inner precise dot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-amber-500 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(229,169,60,0.8)]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isMouseDown ? 1.5 : isHovered ? 1.2 : 1})`,
        }}
      />
    </div>
  );
};
