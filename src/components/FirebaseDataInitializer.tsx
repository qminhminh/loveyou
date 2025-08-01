import React, { useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const FirebaseDataInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState<string>('');

  const initializeTestData = async () => {
    setIsInitializing(true);
    setResult('🔄 Đang khởi tạo dữ liệu test...\n');

    try {
      // Xóa dữ liệu cũ (nếu có)
      setResult(prev => prev + '🗑️ Xóa dữ liệu cũ...\n');
      const existingDocs = await getDocs(collection(db, 'memories'));
      const deletePromises = existingDocs.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setResult(prev => prev + `✅ Đã xóa ${existingDocs.size} documents cũ\n`);

      // Tạo dữ liệu test mới
      setResult(prev => prev + '📝 Tạo dữ liệu test mới...\n');
      
      const testMemories = [
        {
          title: "Lần đầu gặp nhau",
          date: "2024-01-15",
          description: "Khoảnh khắc đầu tiên anh nhìn thấy em, tim anh đã biết ngay đó là định mệnh. Em mặc chiếc váy trắng, nụ cười tỏa sáng như ánh nắng ban mai...",
          location: "Quán cà phê nhỏ",
          imageUrl: "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          title: "Tin nhắn đầu tiên",
          date: "2024-01-18",
          description: "Anh run run gõ từng chữ, sợ em sẽ không trả lời. Nhưng em đã trả lời, và trái tim anh như được thắp sáng. Từ đó, mỗi tin nhắn đều là một món quà quý giá...",
          imageUrl: "https://images.pexels.com/photos/1262971/pexels-photo-1262971.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          title: "Buổi hẹn đầu tiên",
          date: "2024-01-25",
          description: "Chúng ta cùng đi xem phim, anh thậm chí không nhớ phim gì vì chỉ chăm chú nhìn nụ cười của em. Khoảnh khắc đó, anh biết mình đã yêu em từ lâu rồi...",
          location: "Rạp chiếu phim",
          imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          title: "Lần đầu nắm tay",
          date: "2024-02-02",
          description: "Khi anh nắm lấy tay em, cả thế giới như ngừng lại. Ấm áp và hoàn hảo. Em không rút tay ra, và anh biết đó là dấu hiệu của tình yêu...",
          location: "Công viên",
          imageUrl: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        },
        {
          title: "Kỷ niệm đặc biệt",
          date: "2024-02-20",
          description: "Ngày chúng ta cùng xem hoàng hôn, em nói rằng em muốn có thêm nhiều khoảnh khắc như thế này. Anh hứa sẽ tạo ra vô vàn khoảnh khắc đẹp cho em...",
          location: "Bãi biển",
          imageUrl: "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        }
      ];

      const addPromises = testMemories.map(memory => 
        addDoc(collection(db, 'memories'), memory)
      );
      
      await Promise.all(addPromises);
      setResult(prev => prev + `✅ Đã tạo ${testMemories.length} kỷ niệm test\n`);

      // Kiểm tra lại
      setResult(prev => prev + '🔍 Kiểm tra dữ liệu...\n');
      const finalDocs = await getDocs(collection(db, 'memories'));
      setResult(prev => prev + `✅ Hiện có ${finalDocs.size} kỷ niệm trong database\n`);

      setResult(prev => prev + '🎉 Khởi tạo thành công! Bây giờ hãy refresh trang chính.\n');

    } catch (error) {
      console.error('Lỗi khởi tạo:', error);
      setResult(prev => prev + `❌ LỖI: ${error instanceof Error ? error.message : 'Lỗi không xác định'}\n`);
    } finally {
      setIsInitializing(false);
    }
  };

  const checkCurrentData = async () => {
    setResult('🔍 Kiểm tra dữ liệu hiện tại...\n');
    
    try {
      const querySnapshot = await getDocs(collection(db, 'memories'));
      setResult(prev => prev + `📊 Hiện có ${querySnapshot.size} kỷ niệm trong database\n`);
      
      if (querySnapshot.size > 0) {
        setResult(prev => prev + '📄 Danh sách kỷ niệm:\n');
        querySnapshot.docs.forEach((doc, index) => {
          const data = doc.data();
          setResult(prev => prev + `${index + 1}. ${data.title} (${data.date})\n`);
        });
      } else {
        setResult(prev => prev + '📭 Chưa có kỷ niệm nào. Hãy click "Khởi tạo dữ liệu test"!\n');
      }
    } catch (error) {
      setResult(prev => prev + `❌ LỖI: ${error instanceof Error ? error.message : 'Lỗi không xác định'}\n`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Firebase Data Initializer
          </h1>
          <p className="text-pink-600">Khởi tạo dữ liệu test cho Firestore</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={checkCurrentData}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
            >
              🔍 Kiểm tra dữ liệu hiện tại
            </button>
            
            <button
              onClick={initializeTestData}
              disabled={isInitializing}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInitializing ? '🔄 Đang khởi tạo...' : '🚀 Khởi tạo dữ liệu test'}
            </button>
          </div>

          {result && (
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-line max-h-96 overflow-y-auto">
              {result}
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">📋 Hướng dẫn:</h3>
            <ol className="text-yellow-700 text-sm space-y-1">
              <li>1. Click "Kiểm tra dữ liệu hiện tại" để xem có gì trong database</li>
              <li>2. Nếu chưa có gì, click "Khởi tạo dữ liệu test"</li>
              <li>3. Sau khi khởi tạo xong, refresh trang chính</li>
              <li>4. Vào trang "Hành Trình Của Chúng Ta" để xem kết quả</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDataInitializer; 