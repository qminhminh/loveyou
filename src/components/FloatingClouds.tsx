import React, { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';

interface FloatingCloud {
  id: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingClouds: React.FC = () => {
  const [clouds, setClouds] = useState<FloatingCloud[]>([]);

  const sizes = [32, 40, 48, 56];

  useEffect(() => {
    // Create initial clouds
    const initialClouds = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: Math.random() * window.innerHeight * 0.8,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      duration: 20000 + Math.random() * 10000,
      delay: i * 3000
    }));

    setClouds(initialClouds);

    // Add new clouds periodically
    const interval = setInterval(() => {
      const newCloud: FloatingCloud = {
        id: Date.now(),
        y: Math.random() * window.innerHeight * 0.8,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        duration: 20000 + Math.random() * 10000,
        delay: 0
      };

      setClouds(prev => [...prev.slice(-5), newCloud]); // Keep only last 6 clouds
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          className="absolute animate-drift opacity-20"
          style={{
            top: cloud.y,
            left: '-100px',
            animationDuration: `${cloud.duration}ms`,
            animationDelay: `${cloud.delay}ms`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          <Cloud 
            className="text-white"
            style={{ 
              width: cloud.size, 
              height: cloud.size,
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes drift {
          from {
            transform: translateX(-100px);
          }
          to {
            transform: translateX(calc(100vw + 100px));
          }
        }
        
        .animate-drift {
          animation: drift linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingClouds;