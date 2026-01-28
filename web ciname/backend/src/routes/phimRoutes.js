const express = require('express');
const router = express.Router();
const phimController = require('../controllers/phimController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- CẤU HÌNH MULTER ---
const uploadDir = path.join(__dirname, '../../public/image'); 
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ được upload file ảnh!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// --- CÁC ROUTE ---
router.get('/LayDanhSachPhim', phimController.layDanhSachPhim);
router.post('/ThemPhimUploadHinh', upload.single('hinhAnh'), phimController.themPhimUploadHinh);
router.post('/CapNhatPhim', upload.single('hinhAnh'), phimController.capNhatPhim);
router.post('/UploadHinhAnhPhim', upload.single('hinhAnh'), phimController.uploadHinhAnhPhim);
router.delete('/XoaPhim', phimController.xoaPhim);

module.exports = router;