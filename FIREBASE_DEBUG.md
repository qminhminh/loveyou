# 🔧 Debug Firebase - Hướng Dẫn Khắc Phục

## 🚨 Vấn Đề Hiện Tại
Web app không thể lấy được dữ liệu từ Firebase. Hãy làm theo các bước sau để khắc phục:

## 📋 Bước 1: Kiểm Tra Firebase Console

### 1.1 Truy cập Firebase Console
- Mở: https://console.firebase.google.com/
- Chọn project: `tiktokclone-64c8a`

### 1.2 Kiểm Tra Firestore Database
1. **Vào Firestore Database** (bên trái menu)
2. **Kiểm tra xem có collection "memories" không**
3. **Nếu chưa có, tạo collection mới:**
   - Click "Start collection"
   - Collection ID: `memories`
   - Document ID: `auto-generated`
   - Thêm fields:
     - `title` (string): "Test Memory"
     - `date` (string): "2024-01-01"
     - `description` (string): "Test description"
     - `imageUrl` (string): "https://via.placeholder.com/400x400"
     - `createdAt` (timestamp): Current time

### 1.3 Kiểm Tra Storage
1. **Vào Storage** (bên trái menu)
2. **Kiểm tra xem có folder "memories" không**
3. **Nếu chưa có, tạo folder mới**

## 📋 Bước 2: Kiểm Tra Rules

### 2.1 Firestore Rules
1. **Vào Firestore Database > Rules**
2. **Thay thế rules hiện tại bằng:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memories/{document} {
      allow read, write: if true;
    }
  }
}
```
3. **Click "Publish"**

### 2.2 Storage Rules
1. **Vào Storage > Rules**
2. **Thay thế rules hiện tại bằng:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /memories/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
3. **Click "Publish"**

## 📋 Bước 3: Test Kết Nối

### 3.1 Sử dụng Firebase Test Tool
1. **Truy cập:** `http://localhost:5173/test`
2. **Click "Bắt đầu Test Firebase"**
3. **Xem kết quả trong console**

### 3.2 Kiểm Tra Console Browser
1. **Mở Developer Tools** (F12)
2. **Vào tab Console**
3. **Refresh trang** `http://localhost:5173/`
4. **Xem các log messages**

## 📋 Bước 4: Upload Test Data

### 4.1 Sử dụng Admin Panel
1. **Truy cập:** `http://localhost:5173/admin`
2. **Upload một ảnh test**
3. **Điền thông tin:**
   - Tiêu đề: "Test Memory"
   - Ngày: Hôm nay
   - Mô tả: "Test upload"
4. **Click "Lưu Kỷ Niệm"**

### 4.2 Kiểm Tra Kết Quả
1. **Vào Firebase Console > Firestore**
2. **Xem collection "memories" có document mới không**
3. **Vào Storage xem có ảnh mới không**

## 🐛 Các Lỗi Thường Gặp

### Lỗi 1: "Missing or insufficient permissions"
**Nguyên nhân:** Rules chưa được cấu hình đúng
**Giải pháp:** Cập nhật rules như bước 2

### Lỗi 2: "Firebase App named '[DEFAULT]' already exists"
**Nguyên nhân:** Firebase được khởi tạo nhiều lần
**Giải pháp:** Restart server

### Lỗi 3: "Network error"
**Nguyên nhân:** Kết nối internet hoặc Firebase down
**Giải pháp:** Kiểm tra internet và thử lại

### Lỗi 4: "Collection does not exist"
**Nguyên nhân:** Collection chưa được tạo
**Giải pháp:** Tạo collection như bước 1.2

## 🔍 Debug Commands

### Kiểm tra Firebase config
```javascript
// Trong browser console
console.log('Firebase config:', {
  apiKey: "AIzaSyBhldkoIctivmZSo5t9L-N6EhekiHz_DSQ",
  authDomain: "tiktokclone-64c8a.firebaseapp.com",
  projectId: "tiktokclone-64c8a",
  storageBucket: "tiktokclone-64c8a.appspot.com"
});
```

### Test Firestore connection
```javascript
// Trong browser console
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const db = getFirestore();
getDocs(collection(db, 'memories')).then(snapshot => {
  console.log('Documents:', snapshot.size);
  snapshot.forEach(doc => console.log(doc.data()));
});
```

## 📞 Liên Hệ Hỗ Trợ

Nếu vẫn gặp vấn đề, hãy:
1. **Chụp màn hình lỗi** trong console
2. **Chụp màn hình** Firebase Console
3. **Gửi thông tin** để được hỗ trợ

---

**Chúc bạn khắc phục thành công! 🚀** 