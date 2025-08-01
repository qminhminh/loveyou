import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const welcomeText = "Chào em, cô gái khiến tim anh rung động mỗi ngày...";

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 1000);
    const timer2 = setTimeout(() => setShowButton(true), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200/50 via-purple-200/30 to-pink-300/40" />
      
      {/* Animated Heart */}
      <div className="mb-12 relative">
        <Heart 
          className="w-24 h-24 text-pink-400 animate-pulse"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.5))',
            animation: 'heartbeat 2s ease-in-out infinite'
          }}
        />
        <div className="absolute inset-0 w-24 h-24">
          <Heart className="w-24 h-24 text-pink-300 animate-ping opacity-75" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        {showText && (
          <h1 
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent leading-tight"
            style={{ 
              fontFamily: 'Times New Roman, serif',
              animation: 'typewriter 3s steps(40) 1s both'
            }}
          >
            {welcomeText}
          </h1>
        )}
      </div>

      {/* Continue Button */}
      {showButton && (
        <div className="mt-16 animate-fade-in-up">
          <button
            onClick={onNext}
            className="group bg-gradient-to-r from-pink-400 to-purple-500 text-white px-12 py-4 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 hover:scale-110 relative overflow-hidden"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            <span className="relative z-10 text-lg">Bắt đầu hành trình</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ChevronDown className="inline-block ml-2 w-5 h-5 animate-bounce" />
          </button>
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <Heart className="w-6 h-6 text-pink-300" />
      </div>
      <div className="absolute top-40 right-32 animate-float-delayed">
        <Heart className="w-4 h-4 text-purple-300" />
      </div>
      <div className="absolute bottom-32 left-32 animate-float">
        <Heart className="w-5 h-5 text-pink-400" />
      </div>

      <style jsx>{`
        @keyframes typewriter {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes heartbeat {
          0%, 50%, 100% { transform: scale(1) }
          25% { transform: scale(1.1) }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) }
          50% { transform: translateY(-20px) rotate(10deg) }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg) }
          50% { transform: translateY(-15px) rotate(-10deg) }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;