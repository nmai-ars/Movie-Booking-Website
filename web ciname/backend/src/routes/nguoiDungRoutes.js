// src/routes/nguoiDungRoutes.js
const express = require('express');
const router = express.Router();
const nguoiDungController = require('../controllers/nguoiDungController');

// API Khách hàng
router.post('/DangNhap', nguoiDungController.dangNhap);
router.post('/DangKy', nguoiDungController.dangKy);
router.post('/ThongTinTaiKhoan', nguoiDungController.thongTinTaiKhoan);

// API Admin (Quản lý người dùng)
router.post('/ThemNguoiDung', nguoiDungController.themNguoiDung);
router.get('/LayDanhSachNguoiDung', nguoiDungController.layDanhSachNguoiDung);
router.put('/CapNhatThongTinNguoiDung', nguoiDungController.capNhatThongTinNguoiDung);
router.delete('/XoaNguoiDung', nguoiDungController.xoaNguoiDung);
router.post('/LayLaiMatKhau', nguoiDungController.layLaiMatKhau);

module.exports = router;