// src/controllers/rapController.js
const db = require('../config/db');

// API: /QuanLyRap/LayThongTinHeThongRap
exports.layThongTinHeThongRap = (req, res) => {
    db.query("SELECT * FROM cinema_systems", (err, results) => {
        if (err) return res.status(500).send("Lỗi Server");
        const data = results.map(item => ({
            maHeThongRap: item.ma_he_thong_rap,
            tenHeThongRap: item.ten_he_thong_rap,
            biDanh: item.bi_danh,
            logo: item.logo
        }));
        res.json(data);
    });
};

// API: /QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=...
exports.layThongTinCumRap = (req, res) => {
    const maHeThongRap = req.query.maHeThongRap;
    const query = "SELECT * FROM cinema_clusters WHERE ma_he_thong_rap = ?";
    
    db.query(query, [maHeThongRap], (err, results) => {
        if (err) return res.status(500).send("Lỗi Server");
        const data = results.map(item => ({
            maCumRap: item.ma_cum_rap,
            tenCumRap: item.ten_cum_rap,
            diaChi: item.dia_chi,
            danhSachRap: [] // Frontend có thể cần field này dù rỗng
            // maRap: row.maRap,
            // tenRap: row.tenRap
        }));
        res.json(data);
    });
};

// API: /QuanLyRap/LayThongTinLichChieuPhim?MaPhim=...
// Đây là API quan trọng nhất để trang Chi tiết phim hoạt động
exports.layThongTinLichChieuPhim = (req, res) => {
    // [FIX 1] Sửa req.query.MaPhim thành req.query.maPhim (để khớp với URL)
    const maPhim = req.query.maPhim;

    if (!maPhim || maPhim === 'undefined') {
        return res.status(400).send("Mã phim không hợp lệ!");
    }

    // 1. Lấy thông tin phim
    const queryPhim = "SELECT * FROM movies WHERE ma_phim = ?";
    db.query(queryPhim, [maPhim], (err, phimResults) => {
        if (err || phimResults.length === 0) return res.status(404).send("Không tìm thấy phim");

        const phim = phimResults[0];
        
        // 2. Lấy lịch chiếu (Lưu ý: Bảng cinemas dùng maRap, tenRap như bạn đã báo)
        // [FIX 2] Giữ nguyên logic JOIN với c.maRap, c.tenRap
        const queryLich = `
            SELECT 
                st.ma_lich_chieu, st.ngay_chieu_gio, st.gia_ve,
                c.maRap, c.tenRap,
                cc.ma_cum_rap, cc.ten_cum_rap, cc.dia_chi,
                cs.ma_he_thong_rap, cs.ten_he_thong_rap, cs.logo
            FROM showtimes st
            JOIN cinemas c ON st.maRap = c.maRap 
            JOIN cinema_clusters cc ON c.ma_cum_rap = cc.ma_cum_rap
            JOIN cinema_systems cs ON cc.ma_he_thong_rap = cs.ma_he_thong_rap
            WHERE st.ma_phim = ?
        `;

        db.query(queryLich, [maPhim], (err, lichResults) => {
            if (err) return res.status(500).send("Lỗi lấy lịch chiếu");

            const heThongRapChieu = [];

            lichResults.forEach(row => {
                let heThong = heThongRapChieu.find(ht => ht.maHeThongRap === row.ma_he_thong_rap);
                if (!heThong) {
                    heThong = {
                        maHeThongRap: row.ma_he_thong_rap,
                        tenHeThongRap: row.ten_he_thong_rap,
                        logo: row.logo,
                        cumRapChieu: []
                    };
                    heThongRapChieu.push(heThong);
                }

                let cumRap = heThong.cumRapChieu.find(cr => cr.maCumRap === row.ma_cum_rap);
                if (!cumRap) {
                    cumRap = {
                        maCumRap: row.ma_cum_rap,
                        tenCumRap: row.ten_cum_rap,
                        hinhAnh: null,
                        diaChi: row.dia_chi,
                        lichChieuPhim: []
                    };
                    heThong.cumRapChieu.push(cumRap);
                }

                // [FIX 3] Lấy đúng dữ liệu từ cột maRap, tenRap
                cumRap.lichChieuPhim.push({
                    maLichChieu: row.ma_lich_chieu,
                    maRap: row.maRap,     // Lấy từ row.maRap
                    tenRap: row.tenRap,   // Lấy từ row.tenRap
                    ngayChieuGio: row.ngay_chieu_gio,
                    giaVe: row.gia_ve,
                    thoiLuong: 120 
                });
            });

            const finalData = {
                maPhim: phim.ma_phim,
                tenPhim: phim.ten_phim,
                biDanh: phim.bi_danh,
                trailer: phim.trailer,
                hinhAnh: phim.hinh_anh,
                moTa: phim.mo_ta,
                maNhom: phim.ma_nhom,
                ngayKhoiChieu: phim.ngay_khoi_chieu,
                danhGia: phim.danh_gia,
                heThongRapChieu: heThongRapChieu
            };

            res.json(finalData);
        });
    });
};

// ... (các hàm cũ ở trên)

// API: /QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=...
exports.layThongTinLichChieuHeThongRap = (req, res) => {
    // Query phức tạp nối 4 bảng
    const query = `
        SELECT 
            cs.ma_he_thong_rap, cs.ten_he_thong_rap, cs.logo,
            cc.ma_cum_rap, cc.ten_cum_rap, cc.dia_chi,
            m.ma_phim, m.ten_phim, m.hinh_anh,
            st.ma_lich_chieu, st.ngay_chieu_gio, st.gia_ve
        FROM showtimes st
        JOIN cinemas c ON st.maRap = c.maRap
        JOIN cinema_clusters cc ON c.ma_cum_rap = cc.ma_cum_rap
        JOIN cinema_systems cs ON cc.ma_he_thong_rap = cs.ma_he_thong_rap
        JOIN movies m ON st.ma_phim = m.ma_phim
        ORDER BY cs.ma_he_thong_rap, cc.ma_cum_rap, m.ma_phim
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send("Lỗi lấy lịch chiếu hệ thống: " + err.message);

        const lstHeThongRap = [];
        
        results.forEach(row => {
            let heThong = lstHeThongRap.find(x => x.maHeThongRap === row.ma_he_thong_rap);
            if (!heThong) {
                heThong = {
                    maHeThongRap: row.ma_he_thong_rap,
                    tenHeThongRap: row.ten_he_thong_rap,
                    logo: row.logo,
                    lstCumRap: []
                };
                lstHeThongRap.push(heThong);
            }

            let cumRap = heThong.lstCumRap.find(x => x.maCumRap === row.ma_cum_rap);
            if (!cumRap) {
                cumRap = {
                    maCumRap: row.ma_cum_rap,
                    tenCumRap: row.ten_cum_rap,
                    diaChi: row.dia_chi,
                    danhSachPhim: []
                };
                heThong.lstCumRap.push(cumRap);
            }

            let phim = cumRap.danhSachPhim.find(x => x.maPhim === row.ma_phim);
            if (!phim) {
                phim = {
                    maPhim: row.ma_phim,
                    tenPhim: row.ten_phim,
                    hinhAnh: row.hinh_anh,
                    lstLichChieuTheoPhim: []
                };
                cumRap.danhSachPhim.push(phim);
            }

            phim.lstLichChieuTheoPhim.push({
                maLichChieu: row.ma_lich_chieu,
                maRap: row.maRap,
                ngayChieuGio: row.ngay_chieu_gio,
                giaVe: row.gia_ve
            });
        });

        res.json(lstHeThongRap);
    });
};
// API: /QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09
exports.layThongTinLichChieuHeThongRap = (req, res) => {
    // 1. Lấy mã nhóm từ URL (mặc định GP09 nếu không có)
    const maNhom = req.query.maNhom || 'GP09';

    // 2. Query phức tạp nối 4 bảng và lọc theo ma_nhom
    const query = `
        SELECT 
            cs.ma_he_thong_rap, cs.ten_he_thong_rap, cs.logo,
            cc.ma_cum_rap, cc.ten_cum_rap, cc.dia_chi,
            m.ma_phim, m.ten_phim, m.hinh_anh,
            st.ma_lich_chieu, st.ngay_chieu_gio, st.gia_ve
        FROM showtimes st
        JOIN cinemas c ON st.maRap = c.maRap
        JOIN cinema_clusters cc ON c.ma_cum_rap = cc.ma_cum_rap
        JOIN cinema_systems cs ON cc.ma_he_thong_rap = cs.ma_he_thong_rap
        JOIN movies m ON st.ma_phim = m.ma_phim
        WHERE m.ma_nhom = ? 
        ORDER BY cs.ma_he_thong_rap, cc.ma_cum_rap, m.ma_phim
    `;

    db.query(query, [maNhom], (err, results) => {
        if (err) return res.status(500).send("Lỗi lấy lịch chiếu hệ thống: " + err.message);

        // 3. Xử lý dữ liệu phẳng (Flat Data) -> Lồng nhau (Nested Data)
        const lstHeThongRap = [];
        
        results.forEach(row => {
            // Level 1: Hệ thống rạp
            let heThong = lstHeThongRap.find(x => x.maHeThongRap === row.ma_he_thong_rap);
            if (!heThong) {
                heThong = {
                    maHeThongRap: row.ma_he_thong_rap,
                    tenHeThongRap: row.ten_he_thong_rap,
                    logo: row.logo,
                    lstCumRap: []
                };
                lstHeThongRap.push(heThong);
            }

            // Level 2: Cụm rạp
            let cumRap = heThong.lstCumRap.find(x => x.maCumRap === row.ma_cum_rap);
            if (!cumRap) {
                cumRap = {
                    maCumRap: row.ma_cum_rap,
                    tenCumRap: row.ten_cum_rap,
                    diaChi: row.dia_chi,
                    danhSachPhim: []
                };
                heThong.lstCumRap.push(cumRap);
            }

            // Level 3: Phim
            let phim = cumRap.danhSachPhim.find(x => x.maPhim === row.ma_phim);
            if (!phim) {
                phim = {
                    maPhim: row.ma_phim,
                    tenPhim: row.ten_phim,
                    hinhAnh: row.hinh_anh,
                    lstLichChieuTheoPhim: []
                };
                cumRap.danhSachPhim.push(phim);
            }

            // Level 4: Lịch chiếu
            phim.lstLichChieuTheoPhim.push({
                maLichChieu: row.ma_lich_chieu,
                maRap: row.maRap,
                ngayChieuGio: row.ngay_chieu_gio,
                giaVe: row.gia_ve
            });
        });

        res.json(lstHeThongRap);
    });
};
// API: /QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=BHDStar
exports.layThongTinCumRapTheoHeThong = (req, res) => {
    const maHeThongRap = req.query.maHeThongRap;

    if (!maHeThongRap) {
        return res.status(400).send("Thiếu mã hệ thống rạp (maHeThongRap)");
    }

    // Query lấy thông tin cụm rạp KÈM theo danh sách các rạp con (JOIN bảng rap)
    const query = `
        SELECT 
            cc.ma_cum_rap, cc.ten_cum_rap, cc.dia_chi, 
            c.maRap, c.tenRap
        FROM cinema_clusters cc
        LEFT JOIN cinemas c ON cc.ma_cum_rap = c.ma_cum_rap
        WHERE cc.ma_he_thong_rap = ?
    `;
    
    db.query(query, [maHeThongRap], (err, results) => {
        if (err) return res.status(500).send("Lỗi Server khi lấy cụm rạp");
        
        // Xử lý dữ liệu phẳng (Flat Data) -> Lồng nhau (Nested Data)
        // Mục tiêu: Mỗi cụm rạp sẽ chứa mảng danhSachRap
        const danhSachCumRap = [];

        results.forEach(row => {
            // Kiểm tra xem cụm rạp này đã có trong danh sách chưa
            let cumRap = danhSachCumRap.find(item => item.maCumRap === row.ma_cum_rap);
            
            if (!cumRap) {
                cumRap = {
                    maCumRap: row.ma_cum_rap,
                    tenCumRap: row.ten_cum_rap,
                    diaChi: row.dia_chi,
                    danhSachRap: [] 
                    // maRap: row.maRap,
                    // tenRap: row.tenRap
                };
                danhSachCumRap.push(cumRap);
            }

            // Nếu dòng dữ liệu có thông tin rạp (marap không null), thì push vào mảng con
            if (row.maRap) {
                cumRap.danhSachRap.push({
                    maRap: row.maRap,
                    tenRap: row.tenRap
                });
            }
        });

        res.json(danhSachCumRap);
    });
};
// API: /QuanLyRap/LayThongTinRapTheoCum?maCumRap=...
exports.layThongTinRapTheoCum = (req, res) => {
    // 1. Lấy mã cụm rạp từ URL
    const maCumRap = req.query.maCumRap;

    if (!maCumRap) {
        return res.status(400).send("Vui lòng cung cấp mã cụm rạp (maCumRap)");
    }

    // 2. Query đơn giản từ bảng cinemas
    const query = "SELECT * FROM cinemas WHERE ma_cum_rap = ?";

    db.query(query, [maCumRap], (err, results) => {
        if (err) return res.status(500).send("Lỗi lấy danh sách rạp");

        // 3. Map dữ liệu sang camelCase cho Frontend dễ dùng
        const danhSachRap = results.map(row => ({
            maRap: row.maRap,    
            tenRap: row.tenRap,  
            maCumRap: row.ma_cum_rap
        }));

        res.json(danhSachRap);
    });
};