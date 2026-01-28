// src/routes/datVeRoutes.js
const express = require('express');
const router = express.Router();

const datVeController = require('../controllers/datveController');

// GET: /api/QuanLyDatVe/LayDanhSachPhongVe
router.get('/LayDanhSachPhongVe', datVeController.layDanhSachPhongVe);

// POST: /api/QuanLyDatVe/DatVe
router.post('/DatVe', datVeController.datVe);

// POST: /api/QuanLyDatVe/TaoLichChieu
router.post('/TaoLichChieu', datVeController.taoLichChieu);


module.exports = router;