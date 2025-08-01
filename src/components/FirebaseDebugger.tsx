import React, { useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

const FirebaseDebugger: React.FC = () => {
  const [debugResult, setDebugResult] = useState<string>('');
  const [isDebugging, setIsDebugging] = useState(false);

  const runFullDebug = async () => {
    setIsDebugging(true);
    setDebugResult('🔍 BẮT ĐẦU DEBUG FIREBASE...\n\n');

    try {
      // 1. Test Firestore Connection
      setDebugResult(prev => prev + '📡 BƯỚC 1: Test kết nối Firestore...\n');
      const querySnapshot = await getDocs(collection(db, 'memories'));
      setDebugResult(prev => prev + `✅ Firestore OK - Có ${querySnapshot.size} documents\n`);
      
      if (querySnapshot.size > 0) {
        setDebugResult(prev => prev + '📄 Danh sách documents:\n');
        querySnapshot.docs.forEach((doc, index) => {
          const data = doc.data();
          setDebugResult(prev => prev + `  ${index + 1}. ID: ${doc.id}\n`);
          setDebugResult(prev => prev + `     Title: ${data.title}\n`);
          setDebugResult(prev => prev + `     ImageURL: ${data.imageUrl}\n`);
        });
      } else {
        setDebugResult(prev => prev + '📭 Collection "memories" TRỐNG!\n');
      }

      // 2. Test Storage Connection
      setDebugResult(prev => prev + '\n☁️ BƯỚC 2: Test kết nối Storage...\n');
      const storageRef = ref(storage, 'memories');
      const result = await listAll(storageRef);
      setDebugResult(prev => prev + `✅ Storage OK - Có ${result.items.length} files\n`);
      
      if (result.items.length > 0) {
        setDebugResult(prev => prev + '📁 Danh sách files:\n');
        result.items.forEach((item, index) => {
          setDebugResult(prev => prev + `  ${index + 1}. ${item.name}\n`);
        });
      } else {
        setDebugResult(prev => prev + '📭 Folder "memories" TRỐNG!\n');
      }

      // 3. Tạo dữ liệu test nếu cần
      if (querySnapshot.size === 0) {
        setDebugResult(prev => prev + '\n🚀 BƯỚC 3: Tạo dữ liệu test...\n');
        
        const testMemory = {
          title: "Test Memory",
          date: new Date().toISOString().split('T')[0],
          description: "Đây là test memory để kiểm tra Firebase",
          location: "Test Location",
          imageUrl: "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg?auto=compress&cs=tinysrgb&w=800",
          createdAt: new Date()
        };

        const docRef = await addDoc(collection(db, 'memories'), testMemory);
        setDebugResult(prev => prev + `✅ Đã tạo document test - ID: ${docRef.id}\n`);
        
        // Kiểm tra lại
        const newSnapshot = await getDocs(collection(db, 'memories'));
        setDebugResult(prev => prev + `✅ Bây giờ có ${newSnapshot.size} documents\n`);
      }

      setDebugResult(prev => prev + '\n🎉 DEBUG HOÀN THÀNH!\n');
      setDebugResult(prev => prev + '📋 KẾT LUẬN:\n');
      
      if (querySnapshot.size === 0) {
        setDebugResult(prev => prev + '❌ VẤN ĐỀ: Firestore chưa có dữ liệu\n');
        setDebugResult(prev => prev + '💡 GIẢI PHÁP: Đã tạo dữ liệu test\n');
      } else {
        setDebugResult(prev => prev + '✅ Firestore có dữ liệu\n');
      }
      
      if (result.items.length === 0) {
        setDebugResult(prev => prev + '❌ VẤN ĐỀ: Storage chưa có ảnh\n');
        setDebugResult(prev => prev + '💡 GIẢI PHÁP: Upload ảnh qua admin panel\n');
      } else {
        setDebugResult(prev => prev + '✅ Storage có ảnh\n');
      }

    } catch (error) {
      console.error('Debug error:', error);
      setDebugResult(prev => prev + `❌ LỖI: ${error instanceof Error ? error.message : 'Lỗi không xác định'}\n`);
    } finally {
      setIsDebugging(false);
    }
  };

  const checkFirestoreOnly = async () => {
    setDebugResult('🔍 Kiểm tra Firestore...\n');
    
    try {
      const querySnapshot = await getDocs(collection(db, 'memories'));
      setDebugResult(prev => prev + `📊 Có ${querySnapshot.size} documents trong collection "memories"\n`);
      
      if (querySnapshot.size > 0) {
        setDebugResult(prev => prev + '📄 Chi tiết:\n');
        querySnapshot.docs.forEach((doc, index) => {
          const data = doc.data();
          setDebugResult(prev => prev + `${index + 1}. ${data.title} (${data.date})\n`);
          setDebugResult(prev => prev + `   Image: ${data.imageUrl}\n`);
        });
      } else {
        setDebugResult(prev => prev + '📭 Collection trống! Cần tạo dữ liệu.\n');
      }
    } catch (error) {
      setDebugResult(prev => prev + `❌ Lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}\n`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Firebase Debugger
          </h1>
          <p className="text-pink-600">Debug chi tiết Firebase Firestore và Storage</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={checkFirestoreOnly}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
            >
              🔍 Kiểm tra Firestore
            </button>
            
            <button
              onClick={runFullDebug}
              disabled={isDebugging}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDebugging ? '🔄 Đang debug...' : '🚀 Debug Toàn Bộ'}
            </button>
          </div>

          {debugResult && (
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-line max-h-96 overflow-y-auto">
              {debugResult}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Hướng dẫn debug:</h3>
            <ol className="text-blue-700 text-sm space-y-1">
              <li>1. Click "Kiểm tra Firestore" để xem dữ liệu hiện tại</li>
              <li>2. Click "Debug Toàn Bộ" để kiểm tra chi tiết và tự động sửa lỗi</li>
              <li>3. Xem kết quả và làm theo hướng dẫn</li>
              <li>4. Sau khi debug xong, refresh trang chính</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDebugger; 