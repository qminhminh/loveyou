import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainApp from './components/MainApp';
import AdminPanel from './components/AdminPanel';
import FirebaseTest from './components/FirebaseTest';
import FirebaseDataInitializer from './components/FirebaseDataInitializer';

function App() {
  return (
    <Routes>
      {/* Route chính - trang web app */}
      <Route path="/" element={<MainApp />} />
      
      {/* Route admin - trang upload ảnh */}
      <Route path="/admin" element={<AdminPanel />} />
      
      {/* Route test - kiểm tra Firebase */}
      <Route path="/test" element={<FirebaseTest />} />
      
      {/* Route init - khởi tạo dữ liệu */}
      <Route path="/init" element={<FirebaseDataInitializer />} />
      
      {/* Redirect mặc định về trang chính */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;