# 🎉 Hướng Dẫn Sử Dụng Web App

## 🚀 Cách Chạy Web App

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy web app:**
   ```bash
   npm run dev
   ```

3. **Mở trình duyệt:**
   - Trang chính: `http://localhost:5173/`
   - Admin panel: `http://localhost:5173/admin`
   - Test Firebase: `http://localhost:5173/test`
   - Khởi tạo dữ liệu: `http://localhost:5173/init`
   - Debug Firebase: `http://localhost:5173/debug`
   - **Animation Showcase: `http://localhost:5173/animations`** ✨

## 📱 Các Trang Chính

### 🏠 Trang Chính (`/`)
- Màn hình chào mừng đẹp mắt
- Timeline kỷ niệm với ảnh từ Firebase
- Hiệu ứng animation mượt mà

### 👑 Admin Panel (`/admin`)
- Upload ảnh lên Firebase Storage
- Thêm thông tin kỷ niệm vào Firestore
- Quản lý và xóa kỷ niệm
- Nút "Về trang chính" để quay lại

### 🧪 Test Firebase (`/test`)
- Kiểm tra kết nối Firestore
- Test upload file lên Storage
- Xác nhận Firebase hoạt động bình thường

### 🔧 Khởi Tạo Dữ Liệu (`/init`)
- Xóa dữ liệu cũ trong Firestore
- Tạo 5 kỷ niệm mẫu
- Hữu ích khi database trống

### 🔍 Debug Firebase (`/debug`)
- Kiểm tra chi tiết Firestore và Storage
- Liệt kê documents và files hiện có
- Tự động tạo dữ liệu test nếu cần

### 🌟 Animation Showcase (`/animations`) ✨
- **Xem tất cả 30+ animation mới!**
- Hướng dẫn cách sử dụng
- Demo trực quan các hiệu ứng
- Copy-paste code để sử dụng

## 🎨 Cách Sử Dụng Animation Mới

### ✨ Sparkle & Glow Effects
```jsx
<div className="animate-sparkle">✨</div>
<div className="animate-glow">💖</div>
<div className="animate-rainbow-glow">🌟</div>
```

### 🎭 Morphing & Transform
```jsx
<div className="animate-morph">🔄</div>
<div className="animate-bounce-rotate">🎪</div>
<div className="animate-wave">🌊</div>
```

### 🌊 Liquid & Fluid
```jsx
<div className="animate-liquid">💧</div>
<div className="animate-ripple">🌊</div>
<div className="animate-bubble">🫧</div>
```

### 🎪 Circus & Fun
```jsx
<div className="animate-juggle">🎪</div>
<div className="animate-cartwheel">🤸</div>
<div className="animate-swing">🪀</div>
```

### 🌈 Color & Gradient
```jsx
<div className="animate-color-shift">🌈</div>
<div className="animate-rainbow-border border-4">🎨</div>
<div className="animate-pulse-color">💫</div>
```

### 🎯 Special Effects
```jsx
<div className="animate-magnetic">🧲</div>
<div className="animate-earthquake">🌋</div>
<div className="animate-breathing">🫁</div>
```

### 🎨 Text Effects
```jsx
<span className="animate-text-shimmer">Chữ lấp lánh</span>
<span className="animate-text-bounce">Chữ nảy</span>
<span className="animate-text-rainbow">Chữ cầu vồng</span>
```

### 🎪 Advanced Combined
```jsx
<div className="animate-super-hero">🦸</div>
<div className="animate-magic-sparkle">✨</div>
<div className="animate-love-pulse">💖</div>
```

## 🔧 Troubleshooting

### ❌ Không hiển thị ảnh từ Firebase
1. Vào `/test` để kiểm tra kết nối
2. Vào `/init` để tạo dữ liệu mẫu
3. Vào `/debug` để xem chi tiết

### ⚠️ Lỗi Firebase
- Kiểm tra file `.env` có đúng config không
- Đảm bảo Firestore rules cho phép read/write
- Đảm bảo Storage rules cho phép upload

### 🐛 Lỗi TypeScript
- Tất cả lỗi đã được sửa
- CSS animations đã di chuyển vào `index.css`
- Không còn `<style jsx>` không tương thích

## 🎯 Tips Sử Dụng

1. **Animation Performance:**
   - Sử dụng `transform` và `opacity` cho hiệu suất tốt
   - Tránh animate `width`, `height`, `margin`, `padding`

2. **Responsive Design:**
   - Tất cả animation hoạt động trên mobile
   - Sử dụng Tailwind responsive classes

3. **Customization:**
   - Có thể thay đổi duration trong CSS
   - Thêm `animation-delay` cho hiệu ứng tuần tự

## 🌟 Tính Năng Mới

- ✅ **30+ Animation mới** đẹp mắt
- ✅ **Animation Showcase** trang demo
- ✅ **Hướng dẫn chi tiết** cách sử dụng
- ✅ **Performance tối ưu** với CSS
- ✅ **Responsive** trên mọi thiết bị

---

**🎉 Chúc bạn có một web app thật đẹp và ấn tượng!** 