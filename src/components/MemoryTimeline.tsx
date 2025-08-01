import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar, MapPin } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  location?: string;
  image: string;
}

interface MemoryTimelineProps {
  onNext: () => void;
}

const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ onNext }) => {
  const [currentMemory, setCurrentMemory] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const memories: Memory[] = [
    {
      id: 1,
      title: "Lần đầu gặp nhau",
      date: "15/03/2023",
      description: "Khoảnh khắc đầu tiên anh nhìn thấy em, tim anh đã biết ngay đó là định mệnh...",
      location: "Quán cà phê nhỏ",
      image: "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Tin nhắn đầu tiên",
      date: "18/03/2023",
      description: "Anh run run gõ từng chữ, sợ em sẽ không trả lời. Nhưng em đã trả lời, và trái tim anh như được thắp sáng...",
      image: "https://images.pexels.com/photos/1262971/pexels-photo-1262971.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Buổi hẹn đầu tiên",
      date: "25/03/2023",
      description: "Chúng ta cùng đi xem phim, anh thậm chí không nhớ phim gì vì chỉ chăm chú nhìn nụ cười của em...",
      location: "Rạp chiếu phim",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Lần đầu nắm tay",
      date: "02/04/2023",
      description: "Khi anh nắm lấy tay em, cả thế giới như ngừng lại. Ấm áp và hoàn hảo...",
      location: "Công viên",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      title: "Kỷ niệm đặc biệt",
      date: "20/05/2023",
      description: "Ngày chúng ta cùng xem hoàng hôn, em nói rằng em muốn có thêm nhiều khoảnh khắc như thế này...",
      location: "Bãi biển",
      image: "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  const nextMemory = () => {
    if (currentMemory < memories.length - 1) {
      setCurrentMemory(currentMemory + 1);
    }
  };

  const prevMemory = () => {
    if (currentMemory > 0) {
      setCurrentMemory(currentMemory - 1);
    }
  };

  const currentMem = memories[currentMemory];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Title */}
      <div className={`text-center mb-12 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          Hành Trình Của Chúng Ta
        </h2>
        <p className="text-pink-600 text-lg opacity-80">
          Từng kỷ niệm đẹp mà anh muốn giữ mãi bên em...
        </p>
      </div>

      {/* Memory Card */}
      <div className={`max-w-4xl w-full transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 hover:shadow-pink-200/50 transition-all duration-500 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-full -translate-y-20 translate-x-20" />
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl transform group-hover:rotate-2 transition-transform duration-500">
                <img 
                  src={currentMem.image} 
                  alt={currentMem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Polaroid Effect */}
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-white rounded-2xl shadow-lg -z-10 transform rotate-3" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-pink-100 rounded-2xl shadow-md -z-20 transform rotate-6" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center text-pink-500 space-x-3">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{currentMem.date}</span>
              </div>
              
              <h3 
                className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                {currentMem.title}
              </h3>
              
              {currentMem.location && (
                <div className="flex items-center text-purple-500 space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{currentMem.location}</span>
                </div>
              )}
              
              <p className="text-gray-700 text-lg leading-relaxed">
                {currentMem.description}
              </p>
              
              <div className="flex items-center space-x-2 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    className="w-4 h-4 text-pink-400 animate-pulse" 
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between w-full max-w-4xl mt-8">
        <button
          onClick={prevMemory}
          disabled={currentMemory === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-white/70 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Trước</span>
        </button>

        {/* Memory Indicators */}
        <div className="flex space-x-2">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMemory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMemory 
                  ? 'bg-pink-500 scale-125' 
                  : 'bg-pink-200 hover:bg-pink-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={currentMemory === memories.length - 1 ? onNext : nextMemory}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span>{currentMemory === memories.length - 1 ? 'Tiếp tục' : 'Sau'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MemoryTimeline;