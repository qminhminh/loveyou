import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, Sun, Moon, Flower2 } from 'lucide-react';

interface Reason {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface ReasonsWhyProps {
  onNext: () => void;
}

const ReasonsWhy: React.FC<ReasonsWhyProps> = ({ onNext }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  const reasons: Reason[] = [
    {
      id: 1,
      icon: <Sun className="w-8 h-8" />,
      title: "Vì nụ cười của em",
      description: "Làm anh vui cả ngày, như ánh nắng ấm áp soi sáng trái tim anh",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      icon: <Heart className="w-8 h-8" />,
      title: "Vì em luôn bên anh",
      description: "Khi anh cần, em luôn ở đó, là chỗ dựa vững chắc nhất của anh",
      color: "from-pink-400 to-red-500"
    },
    {
      id: 3,
      icon: <Star className="w-8 h-8" />,
      title: "Vì em đặc biệt",
      description: "Em là em, chẳng cần gì hơn cả. Em hoàn hảo trong mắt anh",
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 4,
      icon: <Sparkles className="w-8 h-8" />,
      title: "Vì em tỏa sáng",
      description: "Dù trong hoàn cảnh nào, em vẫn luôn rạng rỡ và tích cực",
      color: "from-blue-400 to-purple-500"
    },
    {
      id: 5,
      icon: <Moon className="w-8 h-8" />,
      title: "Vì em hiểu anh",
      description: "Thậm chí khi anh không nói, em vẫn hiểu anh đang nghĩ gì",
      color: "from-indigo-400 to-blue-500"
    },
    {
      id: 6,
      icon: <Flower2 className="w-8 h-8" />,
      title: "Vì em dịu dàng",
      description: "Giọng nói, cử chỉ của em như những cánh hoa nhẹ nhàng",
      color: "from-green-400 to-emerald-500"
    }
  ];

  useEffect(() => {
    // Animate cards appearing one by one
    reasons.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 300);
    });

    // Show continue button after all cards are visible
    setTimeout(() => {
      setShowButton(true);
    }, reasons.length * 300 + 1000);
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          Tại Sao Anh Yêu Em
        </h2>
        <p className="text-pink-600 text-lg opacity-80 max-w-2xl mx-auto">
          Có hàng triệu lý do, nhưng anh chọn những điều đặc biệt nhất...
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {reasons.map((reason, index) => (
          <div
            key={reason.id}
            className={`transform transition-all duration-1000 ${
              visibleCards.includes(index)
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-20 scale-95'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                {reason.icon}
              </div>
              
              {/* Content */}
              <h3 
                className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                {reason.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {reason.description}
              </p>
              
              {/* Floating Hearts */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
              </div>
              
              {/* Sparkle Effect */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      {showButton && (
        <div className="text-center animate-fade-in-up">
          <button
            onClick={onNext}
            className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 hover:scale-110 overflow-hidden"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            <span className="relative z-10 text-xl">Và còn nhiều hơn thế nữa...</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Button Sparkles */}
            <div className="absolute top-1 left-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            <div className="absolute bottom-1 right-6 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.5s' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReasonsWhy;