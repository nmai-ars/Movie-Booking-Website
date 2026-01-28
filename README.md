HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN WEBSITE MOVIE BOOKING
1. Yêu cầu hệ thống (Prerequisites)
Trước khi cài đặt, hãy đảm bảo máy tính của bạn đã cài:
- Node.js: (Khuyên dùng bản LTS mới nhất, ví dụ v16.x hoặc v18.x trở lên).
- MySQL Server: Có thể dùng qua XAMPP (dễ nhất) hoặc MySQL Workbench.
- Git: (Tùy chọn) Để quản lý mã nguồn.
- Visual Studio Code: Để sửa code.
2. Cài đặt Cơ sở dữ liệu (Database)
Mở XAMPP, bật module Apache và MySQL.
- Truy cập http://localhost/phpmyadmin.
- Tạo một cơ sở dữ liệu mới với tên: cinemaweb (Trùng với tên trong file config backend).
- Chọn tab Import (Nhập), chọn cinema .sql của dự án.
3. Cài đặt & Chạy Backend (Node.js API)
Backend chịu trách nhiệm kết nối Database và cung cấp API cho Frontend.
- Bước 1: Mở terminal (CMD/PowerShell), trỏ vào thư mục backend:
cd backend

- Bước 2: Cài đặt các thư viện (node_modules):
npm install

(Các thư viện chính: express, mysql2, cors, dotenv, multer...)
- Bước 3: Cài đặt thư viện upload file(ảnh), và send mail cho backend
npm install multer
npm install nodemailer

- Bước 4: Cấu hình biến môi trường (.env) trong thư mục backend (ngang hàng với package.json) với nội dung sau(có thể sửa port tương ứng) vào
Đoạn mã :
# Cấu hình Server
PORT=8080
# Cấu hình Database MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=  
DB_NAME=cinemaweb
DB_PORT=3306

- Bước 5: Chạy Server
npm start

*Nếu thành công, màn hình sẽ hiện: ✅ Server is running at: http://localhost:8080 và Đã kết nối MySQL....
4. Cài đặt & Chạy Frontend (ReactJS)
Frontend là giao diện người dùng để đặt vé và quản lý.
- Bước 1: Mở một terminal MỚI (không tắt terminal backend), trỏ vào thư mục frontend:
cd frontend

- Bước 2: Cài đặt thư viện:
npm install

Lưu ý: Nếu gặp lỗi liên quan đến node-sass hoặc phiên bản, hãy thử lệnh: npm install --legacy-peer-deps
- Bước 3: Kiểm tra cấu hình kết nối API Mở file src/config/setting.js (hoặc file chứa cấu hình domain), đảm bảo domain trỏ đúng về port của Backend:
export const domain = 'http://localhost:8080/api'; // Hoặc 'http://localhost:8080' tùy vào cách bạn định nghĩa route trong server.jsexport const groupID = 'GP09'; 
Bước 4: Chạy dự án React:
npm start

Trình duyệt sẽ tự động mở tại địa chỉ: http://localhost:3000.
5. Tài khoản Đăng nhập (Mẫu)
Để kiểm tra các chức năng Admin và Khách hàng, sử dụng các tài khoản có sẵn trong Database (hoặc đăng ký mới):
- Tài khoản Admin (Quản trị): Là tài khoản mà trong bảng users có cột ma_loai_nguoi_dung = 'QuanTri')
