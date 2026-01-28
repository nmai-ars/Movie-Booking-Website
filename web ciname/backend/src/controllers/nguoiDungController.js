// src/controllers/nguoiDungController.js
const db = require('../config/db');
const nodemailer = require("nodemailer");

// --- API KHÁCH HÀNG (Đăng nhập/Đăng ký) ---

exports.dangNhap = (req, res) => {
    const { taiKhoan, matKhau } = req.body;
    const query = "SELECT * FROM users WHERE tai_khoan = ? AND password = ?";
    db.query(query, [taiKhoan, matKhau], (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi Server" });
        if (results.length === 0) return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        const user = results[0];
        res.status(200).json({
            taiKhoan: user.tai_khoan,
            hoTen: user.ho_ten,
            email: user.email,
            soDT: user.so_dt,
            maNhom: user.ma_nhom,
            maLoaiNguoiDung: user.ma_loai_nguoi_dung,
            accessToken: "dummy-token" 
        });
    });
};

exports.dangKy = (req, res) => {
    const { taiKhoan, matKhau, email, soDT, maNhom, hoTen } = req.body;
    const query = `INSERT INTO users (tai_khoan, password, email, so_dt, ma_nhom, ho_ten, ma_loai_nguoi_dung) VALUES (?, ?, ?, ?, ?, ?, 'KhachHang')`;
    db.query(query, [taiKhoan, matKhau, email, soDT, maNhom || 'GP09', hoTen], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi đăng ký" });
        res.status(200).json({ message: "Đăng ký thành công" });
    });
};

exports.thongTinTaiKhoan = (req, res) => {
    const { taiKhoan } = req.body;
    const query = "SELECT * FROM users WHERE tai_khoan = ?";
    db.query(query, [taiKhoan], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Không tìm thấy user");
        res.json(results[0]);
    });
};

// --- API ADMIN (Quản lý người dùng) ---

// 1. Thêm người dùng (Admin)
exports.themNguoiDung = (req, res) => {
    const { taiKhoan, matKhau, email, soDT, maNhom, hoTen, maLoaiNguoiDung } = req.body;
    const query = `INSERT INTO users (tai_khoan, password, email, so_dt, ma_nhom, ho_ten, ma_loai_nguoi_dung) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // Mặc định là KhachHang nếu không chọn
    const loaiND = maLoaiNguoiDung || 'KhachHang'; 
    
    db.query(query, [taiKhoan, matKhau, email, soDT, maNhom || 'GP09', hoTen, loaiND], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.status(400).send("Tài khoản hoặc Email đã tồn tại");
            return res.status(500).send("Lỗi thêm người dùng");
        }
        res.status(200).send("Thêm thành công");
    });
};

// 2. Lấy danh sách người dùng
// GET /api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09
exports.layDanhSachNguoiDung = (req, res) => {
    const maNhom = req.query.MaNhom || 'GP09';
    const query = "SELECT tai_khoan as taiKhoan, ho_ten as hoTen, email, so_dt as soDt, ma_nhom as maNhom, ma_loai_nguoi_dung as maLoaiNguoiDung FROM users WHERE ma_nhom = ?";
    
    db.query(query, [maNhom], (err, results) => {
        if (err) return res.status(500).send("Lỗi lấy danh sách");
        res.json(results);
    });
};

// 3. Cập nhật thông tin người dùng
// PUT /api/QuanLyNguoiDung/CapNhatThongTinNguoiDung
exports.capNhatThongTinNguoiDung = (req, res) => {
    const { taiKhoan, matKhau, email, soDT, maNhom, hoTen, maLoaiNguoiDung } = req.body;
    
    const query = `
        UPDATE users 
        SET email = ?, so_dt = ?, ho_ten = ?, ma_loai_nguoi_dung = ? 
        WHERE tai_khoan = ?
    `;
    // Lưu ý: Thường mật khẩu sẽ cập nhật API riêng hoặc cần logic hash lại. Ở đây tạm thời không update pass để tránh lỗi.
    
    db.query(query, [email, soDT, hoTen, maLoaiNguoiDung, taiKhoan], (err, result) => {
        if (err) return res.status(500).send("Lỗi cập nhật: " + err.message);
        res.status(200).send("Cập nhật thành công");
    });
};

// 4. Xóa người dùng
// DELETE /api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=...
exports.xoaNguoiDung = (req, res) => {
    const taiKhoan = req.query.TaiKhoan;
    // Xóa user (cần cẩn thận nếu user đã đặt vé, có thể lỗi khóa ngoại. Nên xóa bookings trước hoặc dùng ON DELETE CASCADE trong DB)
    const query = "DELETE FROM users WHERE tai_khoan = ?";
    
    db.query(query, [taiKhoan], (err, result) => {
        if (err) return res.status(500).send("Không thể xóa người dùng này (có thể do ràng buộc dữ liệu)");
        res.status(200).send("Xóa thành công");
    });
};


// Hàm lấy lại mật khẩu
exports.layLaiMatKhau = (req, res) => {
    const { email } = req.body;

    // 1. Kiểm tra xem email có tồn tại trong DB không
    const queryCheck = "SELECT * FROM users WHERE email = ?";
    db.query(queryCheck, [email], (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi hệ thống" });
        if (result.length === 0) {
            return res.status(404).json({ message: "Email không tồn tại trong hệ thống" });
        }

        // 2. Tạo mật khẩu mới ngẫu nhiên (8 ký tự)
        const newPassword = Math.random().toString(36).slice(-8);

        // 3. Cập nhật mật khẩu mới vào Database
        // Lưu ý: Nếu DB bạn mã hóa pass thì đoạn này phải hash newPassword trước khi update
        const queryUpdate = "UPDATE users SET password = ? WHERE email = ?";
        db.query(queryUpdate, [newPassword, email], async (errUpdate, resUpdate) => {
            if (errUpdate) return res.status(500).json({ message: "Không thể cập nhật mật khẩu" });

            // 4. Gửi mail thông báo mật khẩu mới
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "naimblossomhomestay@gmail.com", // Email gửi của bạn
                    pass: "lpaq bsko nvev gciu", // Mật khẩu ứng dụng của bạn
                },
            });

            let mailOptions = {
                from: '"NM CINEMA Support" <naimblossomhomestay@gmail.com>',
                to: email,
                subject: "Cấp lại mật khẩu - NM CINEMA",
                html: `
                  <h3>Xin chào ${result[0].ho_ten},</h3>
                  <p>Chúng tôi đã nhận được yêu cầu lấy lại mật khẩu của bạn.</p>
                  <p>Mật khẩu mới của bạn là: <b style="font-size: 18px; color: red;">${newPassword}</b></p>
                  <p>Vui lòng đăng nhập và đổi lại mật khẩu ngay để bảo mật.</p>
                  <br/>
                  <p>Trân trọng,<br/>Đội ngũ NM Cinema</p>
                `,
            };

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: "Mật khẩu mới đã được gửi" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Lỗi gửi mail" });
            }
        });
    });
};