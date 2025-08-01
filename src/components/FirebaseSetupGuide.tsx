import React from 'react';
import { Settings, Database, Cloud, Code, Copy } from 'lucide-react';

const FirebaseSetupGuide: React.FC = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã copy vào clipboard!');
  };

  const isConfigured = firebaseConfig.apiKey !== "your-api-key";

  if (isConfigured) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Settings className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Thiết Lập Firebase
          </h1>
          <p className="text-pink-600 text-lg">
            Để sử dụng tính năng upload ảnh, bạn cần thiết lập Firebase trước
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hướng dẫn thiết lập */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-2 text-pink-500" />
              Bước 1: Tạo Firebase Project
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p>Truy cập <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Firebase Console</a></p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p>Tạo project mới hoặc chọn project có sẵn</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p>Thêm web app vào project</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  4
                </div>
                <div>
                  <p>Bật Firestore Database và Storage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cấu hình */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Code className="w-6 h-6 mr-2 text-pink-500" />
              Bước 2: Cấu hình Environment
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-700">Tạo file <code className="bg-gray-100 px-2 py-1 rounded">.env</code> trong thư mục gốc và thêm:</p>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <button
                  onClick={() => copyToClipboard(`VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id`)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre>{`VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id`}</pre>
              </div>
              
              <p className="text-sm text-gray-600">
                Thay thế các giá trị bằng thông tin thực từ Firebase Console
              </p>
            </div>
          </div>
        </div>

        {/* Rules Configuration */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Cloud className="w-6 h-6 mr-2 text-pink-500" />
            Bước 3: Cấu hình Rules
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Firestore Rules</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <button
                  onClick={() => copyToClipboard(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memories/{document} {
      allow read, write: if true;
    }
  }
}`)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memories/{document} {
      allow read, write: if true;
    }
  }
}`}</pre>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Storage Rules</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <button
                  onClick={() => copyToClipboard(`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /memories/{allPaths=**} {
      allow read, write: if true;
    }
  }
}`)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre>{`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /memories/{allPaths=**} {
      allow read, write: if true;
    }
  }
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Lưu ý */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Lưu ý quan trọng:</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Đảm bảo file <code className="bg-yellow-100 px-1 rounded">.env</code> được thêm vào <code className="bg-yellow-100 px-1 rounded">.gitignore</code></li>
            <li>• Rules hiện tại cho phép tất cả người dùng đọc/ghi (chỉ dùng cho development)</li>
            <li>• Nên thêm authentication để bảo mật trong production</li>
            <li>• Sau khi cấu hình xong, restart server để áp dụng thay đổi</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirebaseSetupGuide; 