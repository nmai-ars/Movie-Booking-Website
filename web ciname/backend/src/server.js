// src/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// ================== 1. KHỞI TẠO APP ==================
const app = express();

// ================== 2. MIDDLEWARE ==================
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Đọc dữ liệu JSON từ client gửi lên

// Cấu hình thư mục ảnh tĩnh (Để xem ảnh sau khi upload)
// Cấu hình thư mục ảnh tĩnh: Khi truy cập link /hinhanh sẽ vào folder public/images
app.use('/hinhanh', express.static(path.join(__dirname, '../public/image')));
// ================== 3. IMPORT ROUTES ==================
// Bây giờ chúng ta chỉ cần import Routes, không cần import Controller ở đây nữa
const phimRoutes = require('./routes/phimRoutes');
const nguoiDungRoutes = require('./routes/nguoiDungRoutes');

// Import 2 file route mới vừa tạo
const rapRoutes = require('./routes/rapRoutes');
const datVeRoutes = require('./routes/datVeRoutes');

// ================== 4. ĐĂNG KÝ ROUTER VỚI APP ==================

// 1. Quản Lý Phim
app.use('/api/QuanLyPhim', phimRoutes); 

// 2. Quản Lý Người Dùng
app.use('/api/QuanLyNguoiDung', nguoiDungRoutes);

// 3. Quản Lý Rạp (Sử dụng rapRoutes mới)
app.use('/api/QuanLyRap', rapRoutes); 

// 4. Quản Lý Đặt Vé (Sử dụng datVeRoutes mới)
app.use('/api/QuanLyDatVe', datVeRoutes);

// ================== 5. KIỂM TRA SERVER ==================
app.get('/', (req, res) => {
    res.send('HELLO! Server Web Movie đang chạy ngon lành 🚀');
});

// ================== 6. CHẠY SERVER ==================
const PORT = process.env.PORT || 88; 

app.listen(PORT, () => {
    console.log(`✅ Server is running at: http://localhost:${PORT}`);
});


// Import nodemailer
const nodemailer = require("nodemailer");

// API gửi mail (Ví dụ dùng Express)
app.post("/api/send-welcome-email", async (req, res) => {
  const { toEmail, userName } = req.body;

  // 1. Cấu hình Transporter với Gmail và App Password
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naimblossomhomestay@gmail.com", // <--- GMAIL CỦA BẠN
      pass: "lpaq bsko nvev gciu", // <--- MẬT KHẨU ỨNG DỤNG (16 ký tự)
    },
  });

  // 2. Nội dung mail
  let mailOptions = {
    from: '"NM CINEMA" <naimblossomhomestay@gmail.com>',
    to: toEmail, // Email người nhận (lấy từ React gửi lên)
    subject: "Chào mừng đến với NM CINEMA",
    html: `
      <h3>Xin chào ${userName},</h3>
      <p>Cảm ơn bạn đã đăng ký tài khoản tại NM CINEMA.</p>
      <p>Tài khoản của bạn đã sẵn sàng. Hãy đăng nhập và đặt vé ngay!</p>
    `,
  };

  // 3. Tiến hành gửi
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Gửi mail thành công");
  } catch (error) {
    console.log(error);
    res.status(500).send("Gửi mail thất bại");
  }
});