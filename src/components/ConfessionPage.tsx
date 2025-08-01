import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ConfessionPageProps {
  onConfess: () => void;
}

const ConfessionPage: React.FC<ConfessionPageProps> = ({ onConfess }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const confessionLines = [
    "Anh không giỏi nói những lời hoa mỹ...",
    "Nhưng anh biết chắc một điều...",
    "Anh muốn ở bên em – hôm nay, ngày mai, và mãi mãi...",
    "Em có đồng ý làm người yêu anh không?"
  ];

  useEffect(() => {
    confessionLines.forEach((_, index) => {
      setTimeout(() => {
        setCurrentLine(index + 1);
      }, (index + 1) * 2000);
    });

    setTimeout(() => {
      setShowButtons(true);
    }, confessionLines.length * 2000 + 1000);
  }, []);

  const handleYesClick = () => {
    // Create heart explosion effect
    const hearts = Array.from({ length: 20 }, (_, i) => {
      return setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '50%';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartExplosion 3s ease-out forwards';
        document.body.appendChild(heart);

        setTimeout(() => {
          document.body.removeChild(heart);
        }, 3000);
      }, i * 100);
    });

    setTimeout(() => {
      onConfess();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/20 to-pink-300/30" />
      
      {/* Floating Hearts Background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-slow opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        >
          <Heart className="w-8 h-8 text-pink-400" />
        </div>
      ))}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Confession Lines */}
        <div className="space-y-8 mb-16">
          {confessionLines.slice(0, currentLine).map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                index < currentLine - 1 ? 'opacity-100' : 'opacity-100'
              }`}
              style={{
                animation: `typewriter 1.5s steps(${line.length}) forwards`,
                animationDelay: `${index * 2}s`
              }}
            >
              {index === confessionLines.length - 1 ? (
                <h2
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent leading-tight"
                  style={{ fontFamily: 'Times New Roman, serif' }}
                >
                  {line}
                </h2>
              ) : (
                <p
                  className="text-2xl md:text-3xl text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Times New Roman, serif' }}
                >
                  {line}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Answer Buttons */}
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <button
              onClick={handleYesClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 hover:scale-110 overflow-hidden"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              <span className="relative z-10 text-2xl flex items-center">
                Có 💕
                <Heart className="ml-2 w-6 h-6 animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Sparkles */}
              {isHovering && (
                <>
                  <Sparkles className="absolute top-1 left-4 w-4 h-4 text-white animate-ping" />
                  <Sparkles className="absolute bottom-1 right-4 w-4 h-4 text-white animate-ping" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </button>

            <button
              onClick={handleYesClick}
              className="group relative px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-300/50 transition-all duration-500 hover:scale-110 overflow-hidden"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              <span className="relative z-10 text-2xl flex items-center">
                Có chứ 💖
                <Heart className="ml-2 w-6 h-6 animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        )}

        {/* Subtitle */}
        {showButtons && (
          <p className="mt-8 text-pink-600 text-lg opacity-80 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            (Anh chỉ chuẩn bị có 2 lựa chọn thôi hihi 😊)
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes typewriter {
          from { 
            width: 0;
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          to { 
            width: 100%;
            opacity: 1;
          }
        }
        
        @keyframes heartExplosion {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.5) rotate(360deg) translateY(-200px);
            opacity: 0;
          }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.1;
          }
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
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConfessionPage;