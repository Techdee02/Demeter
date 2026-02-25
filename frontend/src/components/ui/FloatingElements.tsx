'use client';

import { memo } from 'react';

// Lightweight SVG agricultural elements
const Leaf = memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
  </svg>
));
Leaf.displayName = 'Leaf';

const Grain = memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,2C11.5,4 11,6 11,8C11,10 12,12 12,14C12,12 13,10 13,8C13,6 12.5,4 12,2M4.93,5.82C5.58,7.73 6.88,9.31 7.77,10.81C8.35,11.79 8.69,12.73 8.87,13.56C8.56,12.77 8,12 7.19,11.09C5.93,9.65 4.21,8.26 4.93,5.82M19.07,5.82C19.79,8.26 18.07,9.65 16.81,11.09C16,12 15.44,12.77 15.13,13.56C15.31,12.73 15.65,11.79 16.23,10.81C17.12,9.31 18.42,7.73 19.07,5.82M12,22C12,22 9,18 9,15C9,12.69 10.34,12 12,12C13.66,12 15,12.69 15,15C15,18 12,22 12,22Z" />
  </svg>
));
Grain.displayName = 'Grain';

const Sun = memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
  </svg>
));
Sun.displayName = 'Sun';

const Drop = memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" />
  </svg>
));
Drop.displayName = 'Drop';

// Floating element configuration
interface FloatingElement {
  Icon: React.ComponentType<{ className?: string }>;
  position: string;
  size: string;
  color: string;
  delay: string;
  duration: string;
}

const floatingElements: FloatingElement[] = [
  { Icon: Leaf, position: 'top-[8%] left-[5%]', size: 'w-8 h-8', color: 'text-green-400/25', delay: '0s', duration: '7s' },
  { Icon: Grain, position: 'top-[15%] right-[8%]', size: 'w-6 h-6', color: 'text-amber-400/20', delay: '1s', duration: '8s' },
  { Icon: Sun, position: 'top-[35%] left-[3%]', size: 'w-10 h-10', color: 'text-orange-300/15', delay: '2s', duration: '9s' },
  { Icon: Drop, position: 'top-[55%] right-[4%]', size: 'w-5 h-5', color: 'text-blue-400/20', delay: '0.5s', duration: '6s' },
  { Icon: Leaf, position: 'bottom-[25%] left-[6%]', size: 'w-6 h-6', color: 'text-emerald-400/20', delay: '1.5s', duration: '7s' },
  { Icon: Grain, position: 'bottom-[15%] right-[6%]', size: 'w-7 h-7', color: 'text-yellow-500/15', delay: '2.5s', duration: '8s' },
];

export const FloatingDecorations = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {floatingElements.map((element, index) => {
        const { Icon, position, size, color, delay, duration } = element;
        return (
          <div
            key={index}
            className={`absolute ${position} ${size} ${color}`}
            style={{
              animation: `float ${duration} ease-in-out infinite`,
              animationDelay: delay,
            }}
          >
            <Icon className="w-full h-full" />
          </div>
        );
      })}
      
      {/* Subtle gradient orbs */}
      <div 
        className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(232,107,69,0.08) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute bottom-[20%] left-[10%] w-48 h-48 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(52,199,114,0.08) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
    </div>
  );
});

FloatingDecorations.displayName = 'FloatingDecorations';

// Decorative lines for section dividers
export const WaveDivider = memo(({ className = '' }: { className?: string }) => (
  <svg 
    viewBox="0 0 1200 120" 
    preserveAspectRatio="none" 
    className={`w-full h-8 ${className}`}
    fill="currentColor"
  >
    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
  </svg>
));

WaveDivider.displayName = 'WaveDivider';
