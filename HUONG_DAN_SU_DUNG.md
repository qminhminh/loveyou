# 🎉 Hướng Dẫn Sử Dụng - Love You Web App

## 🚀 Cách Truy Cập

1. **Mở trình duyệt** và truy cập: `http://localhost:5173`
2. **Ứng dụng sẽ hiển thị** giao diện chính với các trang:
   - Trang chào mừng
   - Hành trình kỷ niệm
   - Lý do yêu em
   - Lời tỏ tình

## 🔧 Truy Cập Admin Panel

### Cách duy nhất: Truy cập trực tiếp URL
- **Mở trình duyệt** và truy cập: `http://localhost:5173/admin`
- **Admin panel sẽ hiển thị** trang upload ảnh
- **Click "Về trang chính"** để quay lại web app

## 📸 Upload Ảnh Kỷ Niệm

### Bước 1: Mở Admin Panel
- Truy cập: `http://localhost:5173/admin`

### Bước 2: Upload ảnh
1. **Click "Chọn ảnh"** trong khu vực upload
2. **Chọn file ảnh** từ máy tính
3. **Xem preview** ảnh đã chọn
4. **Click X** nếu muốn chọn lại

### Bước 3: Điền thông tin
- **Tiêu đề**: Tên kỷ niệm (bắt buộc)
- **Ngày tháng**: Ngày xảy ra (bắt buộc)
- **Địa điểm**: Nơi xảy ra (tùy chọn)
- **Mô tả**: Chi tiết về kỷ niệm (bắt buộc)

### Bước 4: Lưu kỷ niệm
- **Click "Lưu Kỷ Niệm"**
- **Chờ upload** hoàn tất
- **Thông báo thành công** sẽ hiện ra

## 👀 Xem Kỷ Niệm

### Trong Admin Panel
- **Danh sách bên phải** hiển thị tất cả kỷ niệm
- **Sắp xếp theo thứ tự** mới nhất trước
- **Click nút X** để xóa kỷ niệm

### Trong Web App Chính
- **Trang "Hành Trình Của Chúng Ta"** hiển thị kỷ niệm
- **Dùng nút mũi tên** để chuyển đổi
- **Click chấm tròn** để chuyển nhanh

## 🎵 Điều Khiển Nhạc

- **Nút nhạc** ở góc trên bên phải
- **Click để bật/tắt** nhạc nền
- **Nhạc sẽ phát** trong toàn bộ ứng dụng

## 🎨 Tính Năng Khác

### Navigation
- **Chấm tròn bên phải**: Chuyển nhanh giữa các trang
- **Thanh tiến độ**: Hiển thị % hoàn thành ở dưới

### Hiệu Ứng
- **Tim bay**: Hiệu ứng tim bay trong nền
- **Mây bay**: Hiệu ứng mây trôi
- **Animation**: Chuyển trang mượt mà

## 🔒 Bảo Mật

### Firebase đã được cấu hình với:
- **Firestore Database**: Lưu thông tin kỷ niệm
- **Storage**: Lưu trữ ảnh
- **Rules**: Cho phép đọc/ghi (development)

### Lưu ý bảo mật:
- **Chỉ admin mới upload** được ảnh (truy cập qua /admin)
- **Dữ liệu được lưu** trên Firebase
- **Ảnh được tối ưu** tự động

## 🛠️ Troubleshooting

### Nếu upload không được:
1. **Kiểm tra kết nối internet**
2. **Đảm bảo ảnh không quá lớn** (nên dưới 5MB)
3. **Thử lại** sau vài giây

### Nếu ảnh không hiển thị:
1. **Refresh trang**
2. **Kiểm tra URL ảnh** trong admin panel
3. **Upload lại** nếu cần

### Nếu admin panel không mở:
1. **Kiểm tra URL** có đúng `http://localhost:5173/admin` không
2. **Đảm bảo server đang chạy**
3. **Refresh trang**

## 📱 Responsive Design

- **Desktop**: Hiển thị đầy đủ tính năng
- **Tablet**: Tự động điều chỉnh layout
- **Mobile**: Tối ưu cho màn hình nhỏ

## 🎯 Tips Sử Dụng

1. **Tối ưu ảnh** trước khi upload (nén, resize)
2. **Đặt tên có ý nghĩa** cho kỷ niệm
3. **Thêm địa điểm** để dễ nhớ
4. **Mô tả chi tiết** để tạo cảm xúc
5. **Sắp xếp theo thời gian** hợp lý

## 🚀 Deploy

### Để deploy lên web:
1. **Build project**: `npm run build`
2. **Upload lên hosting** (Vercel, Netlify, Firebase Hosting)
3. **Cấu hình domain** nếu cần

### Lưu ý khi deploy:
- **Admin panel** sẽ có URL: `your-domain.com/admin`
- **Trang chính** sẽ có URL: `your-domain.com`

## 🔗 URLs Quan Trọng

- **Trang chính**: `http://localhost:5173/`
- **Admin Panel**: `http://localhost:5173/admin`

---

**Chúc bạn có những kỷ niệm đẹp với người yêu! 💕** 