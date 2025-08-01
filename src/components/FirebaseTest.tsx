import React, { useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

const FirebaseTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);

  const testFirebaseConnection = async () => {
    setIsTesting(true);
    setTestResult('🔄 Đang test kết nối Firebase...\n');

    try {
      // Test 1: Kết nối Firestore
      setTestResult(prev => prev + '📡 Test 1: Kết nối Firestore...\n');
      const querySnapshot = await getDocs(collection(db, 'memories'));
      setTestResult(prev => prev + `✅ Firestore OK - Có ${querySnapshot.size} documents\n`);

      // Test 2: Thêm document test
      setTestResult(prev => prev + '📝 Test 2: Thêm document test...\n');
      const testDoc = await addDoc(collection(db, 'memories'), {
        title: 'Test Connection',
        date: new Date().toISOString().split('T')[0],
        description: 'Đây là test kết nối Firebase',
        location: 'Test',
        imageUrl: 'https://via.placeholder.com/400x400',
        createdAt: new Date()
      });
      setTestResult(prev => prev + `✅ Thêm document thành công - ID: ${testDoc.id}\n`);

      // Test 3: Xóa document test
      setTestResult(prev => prev + '🗑️ Test 3: Xóa document test...\n');
      await deleteDoc(doc(db, 'memories', testDoc.id));
      setTestResult(prev => prev + '✅ Xóa document thành công\n');

      // Test 4: Test Storage
      setTestResult(prev => prev + '☁️ Test 4: Test Storage...\n');
      const testBlob = new Blob(['test'], { type: 'text/plain' });
      const storageRef = ref(storage, `test/${Date.now()}_test.txt`);
      await uploadBytes(storageRef, testBlob);
      const downloadURL = await getDownloadURL(storageRef);
      setTestResult(prev => prev + `✅ Storage OK - URL: ${downloadURL}\n`);

      setTestResult(prev => prev + '🎉 TẤT CẢ TEST THÀNH CÔNG! Firebase hoạt động bình thường.\n');

    } catch (error) {
      console.error('Test error:', error);
      setTestResult(prev => prev + `❌ LỖI: ${error instanceof Error ? error.message : 'Lỗi không xác định'}\n`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Firebase Connection Test
          </h1>
          <p className="text-pink-600">Kiểm tra kết nối Firebase</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <button
            onClick={testFirebaseConnection}
            disabled={isTesting}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isTesting ? '🔄 Đang test...' : '🧪 Bắt đầu Test Firebase'}
          </button>

          {testResult && (
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-line">
              {testResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest; 