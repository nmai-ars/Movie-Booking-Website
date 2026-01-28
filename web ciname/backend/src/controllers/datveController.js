// src/controllers/datVeController.js
const db = require('../config/db');

// API: /QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=...
// API: /QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=...
exports.layDanhSachPhongVe = (req, res) => {
    const maLichChieu = req.query.MaLichChieu;

    // 1. Lấy thông tin lịch chiếu và phim (Giữ nguyên)
    const queryInfo = `
        SELECT st.*, m.ten_phim, m.hinh_anh, c.tenRap, cc.ten_cum_rap, cc.dia_chi 
        FROM showtimes st
        JOIN movies m ON st.ma_phim = m.ma_phim
        JOIN cinemas c ON st.maRap = c.maRap
        JOIN cinema_clusters cc ON c.ma_cum_rap = cc.ma_cum_rap
        WHERE st.ma_lich_chieu = ?
    `;

    db.query(queryInfo, [maLichChieu], (err, infoResults) => {
        if (err || infoResults.length === 0) return res.status(404).send("Lỗi lấy thông tin phòng vé");
        
        const info = infoResults[0];

        // 2. Lấy danh sách ghế của Rạp này (Giữ nguyên)
        const queryGhe = `
            SELECT s.ma_ghe, s.ten_ghe, s.loai_ghe, s.stt, s.maRap
            FROM seats s
            WHERE s.maRap = ?
            ORDER BY s.stt
        `;

        db.query(queryGhe, [info.maRap], (err, gheResults) => {
            if (err) return res.status(500).send("Lỗi lấy ghế");

            // [MỚI] 3. Lấy danh sách các vé ĐÃ ĐẶT cho lịch chiếu này từ bảng bookings
            const queryBooked = `SELECT danh_sach_ghe FROM bookings WHERE ma_lich_chieu = ?`;

            db.query(queryBooked, [maLichChieu], (err, bookingResults) => {
                if (err) return res.status(500).send("Lỗi lấy thông tin đặt vé");

                // Tổng hợp tất cả mã ghế đã đặt vào một mảng duy nhất
                // Vì danh_sach_ghe lưu dạng JSON string '[{"maGhe":1},...]' nên cần parse ra
                let bookedSeatIds = [];
                bookingResults.forEach(row => {
                    try {
                        const gheDaDat = JSON.parse(row.danh_sach_ghe); // Parse JSON
                        // Lấy ra maGhe và đẩy vào mảng bookedSeatIds
                        gheDaDat.forEach(ghe => bookedSeatIds.push(ghe.maGhe));
                    } catch (e) {
                        console.log("Lỗi parse JSON ghế:", e);
                    }
                });

                // 4. Map danh sách ghế và kiểm tra trạng thái daDat
                const danhSachGhe = gheResults.map(ghe => {
                    // Kiểm tra xem mã ghế hiện tại có nằm trong danh sách đã đặt không
                    const isBooked = bookedSeatIds.includes(ghe.ma_ghe);

                    return {
                        maGhe: ghe.ma_ghe,
                        tenGhe: ghe.ten_ghe,
                        maRap: ghe.maRap,
                        loaiGhe: ghe.loai_ghe,
                        stt: ghe.stt,
                        giaVe: info.gia_ve,
                        daDat: isBooked, // [QUAN TRỌNG] Gán true nếu đã đặt, false nếu chưa
                        taiKhoanNguoiDat: null 
                    };
                });

                res.json({
                    thongTinPhim: {
                        maLichChieu: info.ma_lich_chieu,
                        tenCumRap: info.ten_cum_rap,
                        tenRap: info.tenRap,
                        diaChi: info.dia_chi,
                        tenPhim: info.ten_phim,
                        hinhAnh: info.hinh_anh,
                        ngayChieu: info.ngay_chieu_gio,
                        gioChieu: info.ngay_chieu_gio 
                    },
                    danhSachGhe: danhSachGhe
                });
            });
        });
    });
};

// API: /quanlydatve/datve (POST)
exports.datVe = (req, res) => {
    // Frontend gửi: { maLichChieu, danhSachVe: [{maGhe, giaVe}], taiKhoanNguoiDung }
    // Cần lấy token header để xác thực user (nếu có jwt), ở đây làm đơn giản.
    const { maLichChieu, danhSachVe, taiKhoanNguoiDung } = req.body;
    
    // Logic lưu vào bảng bookings...
    // Vì bảng bookings của bạn lưu "danh_sach_ghe" dạng text, ta làm đơn giản:
    
    const tongTien = danhSachVe.reduce((total, ve) => total + ve.giaVe, 0);
    const chuoiGhe = JSON.stringify(danhSachVe); // Lưu tạm JSON vào column text
    
    // Cần lấy user_id từ taiKhoanNguoiDung
    const queryUser = "SELECT id FROM users WHERE tai_khoan = ?";
    db.query(queryUser, [taiKhoanNguoiDung], (err, userRes) => {
        if(err || userRes.length === 0) return res.status(400).send("User không tồn tại");
        
        const userId = userRes[0].id;
        const queryBooking = `
            INSERT INTO bookings (user_id, ma_lich_chieu, ngay_dat, tong_tien, danh_sach_ghe)
            VALUES (?, ?, NOW(), ?, ?)
        `;
        
        db.query(queryBooking, [userId, maLichChieu, tongTien, chuoiGhe], (err, result) => {
            if(err) return res.status(500).send("Lỗi đặt vé " + err.message);
            res.send("Đặt vé thành công!");
        });
    });
};
// API: POST /QuanLyDatVe/TaoLichChieu
exports.taoLichChieu = (req, res) => {
    console.log("Dữ liệu nhận được: ", req.body);
    
    // 1. SỬA TÊN BIẾN: Lấy 'ngayChieuGioChieu' (giống Frontend gửi)
    const { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;

    // 2. VALIDATE: Kiểm tra biến 'ngayChieuGioChieu'
    if (!maPhim || !ngayChieuGioChieu || !maRap || !giaVe) {
        return res.status(400).send("Thiếu dữ liệu: maPhim, ngayChieuGioChieu, maRap, giaVe");
    }

    const query = `
        INSERT INTO showtimes (ma_phim, maRap, ngay_chieu_gio, gia_ve) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [maPhim, maRap, ngayChieuGioChieu, giaVe], (err, result) => {
        if (err) {
            console.log("Lỗi:", err);
            // Xử lý các lỗi MySQL thường gặp để Frontend biết đường thông báo
            if (err.code === 'ER_TRUNCATED_WRONG_VALUE' || err.code === 'WARN_DATA_TRUNCATED') {
                return res.status(400).send("Định dạng ngày giờ không hợp lệ (Yêu cầu: YYYY-MM-DD HH:mm:ss)");
            }
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).send("Mã phim hoặc Mã rạp không tồn tại!");
            }
            return res.status(500).send("Lỗi Server: " + err.message);
        }

        res.json({
            message: "Tạo lịch chiếu thành công!",
            content: {
                maLichChieu: result.insertId,
                maPhim,
                maRap,
                ngayChieuGio: ngayChieuGioChieu,
                giaVe
            }
        });
    });
};