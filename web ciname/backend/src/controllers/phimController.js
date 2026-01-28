const db = require('../config/db');

// 1. Lấy danh sách phim
exports.layDanhSachPhim = (req, res) => {
    const maNhom = req.query.manhom || 'GP09';
    const query = "SELECT * FROM movies WHERE ma_nhom = ?";
    db.query(query, [maNhom], (err, results) => {
        if (err) return res.status(500).send("Lỗi lấy danh sách phim");
        
        // Map tên cột DB -> camelCase Frontend
        const phims = results.map(phim => ({
            maPhim: phim.ma_phim,
            tenPhim: phim.ten_phim,
            biDanh: phim.bi_danh,
            trailer: phim.trailer,
            hinhAnh: phim.hinh_anh,
            moTa: phim.mo_ta,
            maNhom: phim.ma_nhom,
            ngayKhoiChieu: phim.ngay_khoi_chieu,
            danhGia: phim.danh_gia,
            hot: phim.hot,
            dangChieu: phim.dang_chieu,
            sapChieu: phim.sap_chieu
        }));
        res.json(phims);
    });
};

// 2. Thêm phim (Có upload)
exports.themPhimUploadHinh = (req, res) => {
    if (!req.file) return res.status(400).send("Vui lòng chọn hình ảnh!");

    const { tenPhim, biDanh, trailer, moTa, maNhom, ngayKhoiChieu, danhGia, hot, dangChieu, sapChieu } = req.body;
    const tenHinhAnh = req.file.filename;

    const query = `INSERT INTO movies (ten_phim, bi_danh, trailer, hinh_anh, mo_ta, ma_nhom, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    // Convert 'true'/'false' string sang boolean
    const isHot = hot === 'true' || hot === true;
    const isDangChieu = dangChieu === 'true' || dangChieu === true;
    const isSapChieu = sapChieu === 'true' || sapChieu === true;

    db.query(query, [tenPhim, biDanh, trailer, tenHinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia, isHot, isDangChieu, isSapChieu], (err, result) => {
        if (err) return res.status(500).send("Lỗi thêm phim: " + err.message);
        res.json({ message: "Thêm thành công", content: req.body });
    });
};

// 3. Cập nhật phim (QUAN TRỌNG: Logic giữ ảnh cũ)
// API: POST /QuanLyPhim/CapNhatPhimUpload
exports.capNhatPhim = (req, res) => {
    const { maPhim, tenPhim, biDanh, trailer, moTa, maNhom, ngayKhoiChieu, danhGia, hot, dangChieu, sapChieu } = req.body;

    if (!maPhim) return res.status(400).send("Thiếu mã phim!");

    // [FIX 3] Logic giữ ảnh cũ:
    // - Nếu user chọn ảnh mới -> req.file có dữ liệu -> Lấy tên file mới
    // - Nếu user KHÔNG chọn ảnh -> req.file là null -> Lấy tên ảnh cũ từ body gửi lên
    let tenHinhAnh = req.body.hinhAnh; 
    if (req.file) {
        tenHinhAnh = req.file.filename;
    }

    const query = `
        UPDATE movies 
        SET ten_phim=?, bi_danh=?, trailer=?, hinh_anh=?, mo_ta=?, ma_nhom=?, ngay_khoi_chieu=?, danh_gia=?, hot=?, dang_chieu=?, sap_chieu=?
        WHERE ma_phim=?
    `;

    // Convert boolean từ string sang bit
    const isHot = hot === 'true' || hot === true;
    const isDangChieu = dangChieu === 'true' || dangChieu === true;
    const isSapChieu = sapChieu === 'true' || sapChieu === true;

    const params = [tenPhim, biDanh, trailer, tenHinhAnh, moTa, maNhom, ngayKhoiChieu, danhGia, isHot, isDangChieu, isSapChieu, maPhim];

    db.query(query, params, (err, result) => {
        if (err) {
            console.log("Lỗi update:", err);
            return res.status(500).send("Lỗi cập nhật: " + err.message);
        }
        if (result.affectedRows === 0) return res.status(404).send("Không tìm thấy phim!");
        
        res.json({ message: "Cập nhật thành công", content: { ...req.body, hinhAnh: tenHinhAnh } });
    });
};

// 4. Xóa phim (Xử lý khóa ngoại)
exports.xoaPhim = (req, res) => {
    // [FIX 1] Bắt cả 2 trường hợp MaPhim (hoa) hoặc maPhim (thường) để tránh lỗi null
    const maPhim = req.query.MaPhim || req.query.maPhim;

    if (!maPhim) return res.status(400).send("Thiếu mã phim cần xóa (MaPhim)");

    const query = "DELETE FROM movies WHERE ma_phim = ?";

    db.query(query, [maPhim], (err, result) => {
        if (err) {
            // [FIX 2] Bắt lỗi ràng buộc khóa ngoại (Foreign Key)
            if (err.errno === 1451) {
                return res.status(400).send("Không thể xóa: Phim này đang có Lịch Chiếu hoặc Vé đã đặt. Hãy xóa lịch chiếu trước!");
            }
            console.log("Lỗi xóa phim:", err);
            return res.status(500).send("Lỗi Server khi xóa phim");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Phim không tồn tại hoặc đã bị xóa");
        }

        res.send("Xóa phim thành công");
    });
};

// 5. Upload ảnh lẻ (nếu cần)
exports.uploadHinhAnhPhim = (req, res) => {
    if (!req.file) return res.status(400).send("Chưa chọn file!");
    res.json({ message: "Upload thành công", content: req.file.filename });
};