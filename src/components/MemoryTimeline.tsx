import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar, MapPin } from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  imageUrl: string;
  createdAt: Date;
}

interface MemoryTimelineProps {
  onNext: () => void;
}

const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ onNext }) => {
  const [currentMemory, setCurrentMemory] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dữ liệu mặc định để hiển thị ngay lập tức
  const fallbackMemories: Memory[] = [
    {
      id: '1',
      title: "Lần đầu gặp nhau",
      date: "15/03/2023",
      description: "Khoảnh khắc đầu tiên anh nhìn thấy em, tim anh đã biết ngay đó là định mệnh. Em mặc chiếc váy trắng, nụ cười tỏa sáng như ánh nắng ban mai...",
      location: "Quán cà phê nhỏ",
      imageUrl: "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg?auto=compress&cs=tinysrgb&w=800",
      createdAt: new Date()
    },
    {
      id: '2',
      title: "Tin nhắn đầu tiên",
      date: "18/03/2023",
      description: "Anh run run gõ từng chữ, sợ em sẽ không trả lời. Nhưng em đã trả lời, và trái tim anh như được thắp sáng. Từ đó, mỗi tin nhắn đều là một món quà quý giá...",
      imageUrl: "https://images.pexels.com/photos/1262971/pexels-photo-1262971.jpeg?auto=compress&cs=tinysrgb&w=800",
      createdAt: new Date()
    },
    {
      id: '3',
      title: "Buổi hẹn đầu tiên",
      date: "25/03/2023",
      description: "Chúng ta cùng đi xem phim, anh thậm chí không nhớ phim gì vì chỉ chăm chú nhìn nụ cười của em. Khoảnh khắc đó, anh biết mình đã yêu em từ lâu rồi...",
      location: "Rạp chiếu phim",
      imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      createdAt: new Date()
    },
    {
      id: '4',
      title: "Lần đầu nắm tay",
      date: "02/04/2023",
      description: "Khi anh nắm lấy tay em, cả thế giới như ngừng lại. Ấm áp và hoàn hảo. Em không rút tay ra, và anh biết đó là dấu hiệu của tình yêu...",
      location: "Công viên",
      imageUrl: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      createdAt: new Date()
    },
    {
      id: '5',
      title: "Kỷ niệm đặc biệt",
      date: "20/05/2023",
      description: "Ngày chúng ta cùng xem hoàng hôn, em nói rằng em muốn có thêm nhiều khoảnh khắc như thế này. Anh hứa sẽ tạo ra vô vàn khoảnh khắc đẹp cho em...",
      location: "Bãi biển",
      imageUrl: "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=800",
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    setShowContent(true);
    
    // Hiển thị dữ liệu mặc định ngay lập tức
    setMemories(fallbackMemories);
    setLoading(false);
    
    // Sau đó thử load từ Firebase trong background
    loadMemoriesFromFirebase();
  }, []);

  const loadMemoriesFromFirebase = async () => {
    try {
      console.log('🔄 Bắt đầu tải dữ liệu từ Firebase...');
      
      // Timeout 5 giây
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      const firebasePromise = getDocs(collection(db, 'memories'));
      
      const querySnapshot = await Promise.race([firebasePromise, timeoutPromise]) as any;
      console.log('✅ Lấy được dữ liệu từ Firestore:', querySnapshot.size, 'documents');
      
      if (querySnapshot.size === 0) {
        console.log('📭 Firestore trống, tạo dữ liệu mặc định...');
        await createDefaultMemories();
        return;
      }
      
      const memoriesData = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date()
        };
      }) as Memory[];
      
      // Sắp xếp theo ngày tạo mới nhất
      const sortedMemories = memoriesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setMemories(sortedMemories);
      console.log('✅ Đã cập nhật với dữ liệu từ Firebase:', sortedMemories.length, 'kỷ niệm');
      
    } catch (error) {
      console.error('❌ Lỗi khi tải dữ liệu từ Firebase:', error);
      // Giữ nguyên dữ liệu mặc định nếu có lỗi
      console.log('🔄 Giữ nguyên dữ liệu mặc định');
    }
  };

  const createDefaultMemories = async () => {
    try {
      console.log('🔄 Tạo dữ liệu mặc định trong Firebase...');
      
      const defaultMemories = [
        {
          id: 'default-1',
          title: "Lần đầu gặp nhau",
          date: "2024-01-15",
          description: "Khoảnh khắc đầu tiên anh nhìn thấy em, tim anh đã biết ngay đó là định mệnh. Em mặc chiếc váy trắng, nụ cười tỏa sáng như ánh nắng ban mai...",
          location: "Quán cà phê nhỏ",
          imageUrl: "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          id: 'default-2',
          title: "Tin nhắn đầu tiên",
          date: "2024-01-18",
          description: "Anh run run gõ từng chữ, sợ em sẽ không trả lời. Nhưng em đã trả lời, và trái tim anh như được thắp sáng. Từ đó, mỗi tin nhắn đều là một món quà quý giá...",
          imageUrl: "https://images.pexels.com/photos/1262971/pexels-photo-1262971.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          id: 'default-3',
          title: "Buổi hẹn đầu tiên",
          date: "2024-01-25",
          description: "Chúng ta cùng đi xem phim, anh thậm chí không nhớ phim gì vì chỉ chăm chú nhìn nụ cười của em. Khoảnh khắc đó, anh biết mình đã yêu em từ lâu rồi...",
          location: "Rạp chiếu phim",
          imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          id: 'default-4',
          title: "Lần đầu nắm tay",
          date: "2024-02-02",
          description: "Khi anh nắm lấy tay em, cả thế giới như ngừng lại. Ấm áp và hoàn hảo. Em không rút tay ra, và anh biết đó là dấu hiệu của tình yêu...",
          location: "Công viên",
          imageUrl: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          id: 'default-5',
          title: "Kỷ niệm đặc biệt",
          date: "2024-02-20",
          description: "Ngày chúng ta cùng xem hoàng hôn, em nói rằng em muốn có thêm nhiều khoảnh khắc như thế này. Anh hứa sẽ tạo ra vô vàn khoảnh khắc đẹp cho em...",
          location: "Bãi biển",
          imageUrl: "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        }
      ];

      const addPromises = defaultMemories.map(memory => 
        addDoc(collection(db, 'memories'), memory)
      );
      
      await Promise.all(addPromises);
      console.log('✅ Đã tạo', defaultMemories.length, 'kỷ niệm mặc định trong Firebase');
      
      // Cập nhật UI với dữ liệu mới
      setMemories(defaultMemories);
      
    } catch (error) {
      console.error('❌ Lỗi khi tạo dữ liệu mặc định:', error);
      // Giữ nguyên dữ liệu mặc định nếu có lỗi
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-pink-600">Đang tải kỷ niệm...</p>
          {error && (
            <p className="text-red-500 text-sm mt-2">Lỗi: {error}</p>
          )}
        </div>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Chưa có kỷ niệm nào</h2>
          <p className="text-gray-600 mb-8">Hãy thêm những kỷ niệm đẹp của chúng ta</p>
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    );
  }

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
                  src={currentMem.imageUrl} 
                  alt={currentMem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    console.error('❌ Lỗi tải ảnh:', currentMem.imageUrl);
                    e.currentTarget.src = 'https://via.placeholder.com/400x400/pink/white?text=Ảnh+không+tải+được';
                  }}
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