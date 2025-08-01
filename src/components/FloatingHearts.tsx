import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const colors = ['text-pink-300', 'text-purple-300', 'text-red-300', 'text-rose-300'];
  const sizes = [16, 20, 24, 28];

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 8000 + Math.random() * 4000
      };

      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, newHeart.duration);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-up opacity-60"
          style={{
            left: heart.x,
            bottom: 0,
            animationDuration: `${heart.duration}ms`,
            animationTimingFunction: 'ease-out'
          }}
        >
          <Heart 
            className={`${heart.color} animate-pulse`}
            style={{ 
              width: heart.size, 
              height: heart.size,
              filter: 'drop-shadow(0 0 10px rgba(244, 114, 182, 0.3))'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;