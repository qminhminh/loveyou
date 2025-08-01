# 💕 Love You - Web App

Một web app đẹp mắt để chia sẻ những kỷ niệm đặc biệt với người yêu.

## 🚀 Tính năng

- ✨ Giao diện đẹp mắt với hiệu ứng animation
- 📸 Upload và quản lý ảnh kỷ niệm
- 🎵 Nhạc nền lãng mạn
- 📱 Responsive design
- 🔐 Admin panel để quản lý nội dung

## 🛠️ Cài đặt

### 1. Clone và cài đặt dependencies

```bash
git clone <repository-url>
cd loveyou
npm install
```

### 2. Thiết lập Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới
3. Thêm web app vào project
4. Bật các service sau:
   - **Firestore Database**: Để lưu thông tin kỷ niệm
   - **Storage**: Để lưu trữ ảnh

### 3. Cấu hình Firebase

1. Copy thông tin cấu hình từ Firebase Console
2. Mở file `src/firebase/config.ts`
3. Thay thế `firebaseConfig` bằng thông tin thực tế:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Cấu hình Firestore Rules

Trong Firebase Console > Firestore Database > Rules, thêm rules sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memories/{document} {
      allow read, write: if true; // Cho phép đọc/ghi cho tất cả (có thể thay đổi sau)
    }
  }
}
```

### 5. Cấu hình Storage Rules

Trong Firebase Console > Storage > Rules, thêm rules sau:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /memories/{allPaths=**} {
      allow read, write: if true; // Cho phép đọc/ghi cho tất cả (có thể thay đổi sau)
    }
  }
}
```

## 🎯 Sử dụng

### Chạy ứng dụng

```bash
npm run dev
```

### Truy cập Admin Panel

Có 2 cách để truy cập admin panel:

1. **Click vào nút Settings** (biểu tượng bánh răng) ở góc trên bên trái
2. **Thêm `?admin=true` vào URL**: `http://localhost:5173?admin=true`

### Upload ảnh kỷ niệm

1. Truy cập Admin Panel
2. Click "Chọn ảnh" để upload ảnh
3. Điền thông tin:
   - **Tiêu đề**: Tên kỷ niệm
   - **Ngày tháng**: Ngày xảy ra
   - **Địa điểm**: Nơi xảy ra (tùy chọn)
   - **Mô tả**: Chi tiết về kỷ niệm
4. Click "Lưu Kỷ Niệm"

### Xem kỷ niệm

- Các kỷ niệm sẽ hiển thị trong trang "Hành Trình Của Chúng Ta"
- Sắp xếp theo thứ tự mới nhất
- Có thể xóa kỷ niệm trong Admin Panel

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── AdminPanel.tsx      # Panel quản lý admin
│   ├── MemoryTimeline.tsx  # Hiển thị kỷ niệm
│   ├── WelcomeScreen.tsx   # Màn hình chào
│   └── ...                 # Các component khác
├── firebase/
│   └── config.ts          # Cấu hình Firebase
├── App.tsx                # Component chính
└── main.tsx              # Entry point
```

## 🔧 Công nghệ sử dụng

- **React 18** với TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase** - Backend (Firestore + Storage)
- **Lucide React** - Icons

## 🎨 Tùy chỉnh

### Thay đổi theme màu

Chỉnh sửa các class CSS trong Tailwind để thay đổi màu sắc:

```css
/* Ví dụ: Thay đổi từ pink sang blue */
from-pink-500 to-purple-600 → from-blue-500 to-indigo-600
bg-pink-100 → bg-blue-100
```

### Thêm tính năng mới

1. Tạo component mới trong `src/components/`
2. Import và sử dụng trong `App.tsx`
3. Cập nhật navigation nếu cần

## 🚀 Deploy

### Deploy lên Firebase Hosting

1. Cài đặt Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login và init project:
```bash
firebase login
firebase init hosting
```

3. Build và deploy:
```bash
npm run build
firebase deploy
```

### Deploy lên Vercel

1. Push code lên GitHub
2. Kết nối repository với Vercel
3. Deploy tự động

## 📝 Lưu ý

- Đảm bảo cấu hình Firebase đúng trước khi sử dụng
- Có thể thêm authentication để bảo vệ admin panel
- Backup dữ liệu thường xuyên
- Tối ưu ảnh trước khi upload để giảm dung lượng

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết. 