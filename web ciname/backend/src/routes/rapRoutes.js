// src/routes/rapRoutes.js
const express = require('express');
const router = express.Router();
const rapController = require('../controllers/rapController');

// Định nghĩa các route
router.get('/LayThongTinHeThongRap', rapController.layThongTinHeThongRap);
router.get('/LayThongTinCumRap', rapController.layThongTinCumRap);

// Thêm route này để khớp với Frontend (nếu Frontend gọi tên dài này)
router.get('/LayThongTinCumRapTheoHeThong', rapController.layThongTinCumRap);

router.get('/LayThongTinLichChieuPhim', rapController.layThongTinLichChieuPhim);
router.get('/LayThongTinLichChieuHeThongRap', rapController.layThongTinLichChieuHeThongRap);
//router.get('/LayThongTinLichChieuPhim',rapController.layThongTinLichChieuPhim);
router.get('/LayThongTinRapTheoCum', rapController.layThongTinRapTheoCum);

module.exports = router;
