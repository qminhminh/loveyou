import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

const CelebrationPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Show main message after initial animation
    setTimeout(() => setShowMessage(true), 1000);

    // Create fireworks effect
    const fireworkInterval = setInterval(() => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      };
      
      setFireworks(prev => [...prev, newFirework]);
      
      // Remove firework after animation
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 2000);
    }, 500);

    // Create continuous heart rain
    const heartRain = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.innerHTML = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
          heart.style.position = 'fixed';
          heart.style.left = Math.random() * window.innerWidth + 'px';
          heart.style.top = '-50px';
          heart.style.fontSize = '2rem';
          heart.style.pointerEvents = 'none';
          heart.style.zIndex = '9999';
          heart.style.animation = 'heartFall 4s linear forwards';
          document.body.appendChild(heart);

          setTimeout(() => {
            if (document.body.contains(heart)) {
              document.body.removeChild(heart);
            }
          }, 4000);
        }, i * 200);
      }
    }, 800);

    return () => {
      clearInterval(fireworkInterval);
      clearInterval(heartRain);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300">
      {/* Fireworks */}
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="absolute animate-ping"
          style={{ left: firework.x, top: firework.y }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full opacity-75" />
        </div>
      ))}

      {/* Floating Background Elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-celebration opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {i % 3 === 0 ? (
            <Heart className="w-6 h-6 text-pink-500" />
          ) : i % 3 === 1 ? (
            <Sparkles className="w-5 h-5 text-purple-500" />
          ) : (
            <Star className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center relative z-10 max-w-4xl mx-auto">
        {/* Giant Heart */}
        <div className="mb-12 animate-heartbeat">
          <Heart 
            className="w-32 h-32 text-pink-500 mx-auto animate-pulse"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(244, 114, 182, 0.8))',
            }}
          />
        </div>

        {/* Success Message */}
        {showMessage && (
          <div className="animate-fade-in-up space-y-8">
            <h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent leading-tight"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              Yêu Em Nhiều Lắm! 💕
            </h1>
            
            <div className="space-y-6">
              <p 
                className="text-3xl md:text-4xl text-gray-700 leading-relaxed"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                Từ giờ chúng ta là của nhau rồi nhé! 
              </p>
              
              <p className="text-xl md:text-2xl text-pink-600 opacity-90">
                Anh hứa sẽ yêu thương và chăm sóc em mãi mãi 💖
              </p>
              
              <div className="flex justify-center space-x-4 mt-12">
                {['💕', '💖', '💗', '💝', '💘'].map((emoji, i) => (
                  <span 
                    key={i} 
                    className="text-4xl animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Message */}
            <div className="mt-16 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl">
              <p 
                className="text-2xl text-gray-800 leading-relaxed"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                "Tình yêu không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng. 
                Và anh muốn cùng em nhìn về tương lai, nơi có chúng ta bên nhau..." 💫
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes heartFall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes heartbeat {
          0%, 50%, 100% { transform: scale(1) }
          25% { transform: scale(1.1) }
          75% { transform: scale(1.05) }
        }
        
        @keyframes float-celebration {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-40px) rotate(180deg) scale(1.2);
            opacity: 0.7;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-float-celebration {
          animation: float-celebration 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CelebrationPage;