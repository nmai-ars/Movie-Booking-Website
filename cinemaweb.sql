-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2025 at 12:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinemaweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `ma_banner` bigint(20) UNSIGNED NOT NULL,
  `ma_phim` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `ma_ve` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `ma_lich_chieu` bigint(20) UNSIGNED NOT NULL,
  `ngay_dat` datetime NOT NULL,
  `tong_tien` int(11) NOT NULL,
  `danh_sach_ghe` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`ma_ve`, `user_id`, `ma_lich_chieu`, `ngay_dat`, `tong_tien`, `danh_sach_ghe`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-12-20 01:29:04', 75000, '[{\"maGhe\":7,\"tenGhe\":\"B2\",\"maRap\":1,\"loaiGhe\":\"Thuong\",\"stt\":12,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(2, 1, 6, '2025-12-20 01:43:50', 75000, '[{\"maGhe\":15,\"tenGhe\":\"C5\",\"maRap\":1,\"loaiGhe\":\"Vip\",\"stt\":25,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(3, 1, 6, '2025-12-20 01:48:20', 75000, '[{\"maGhe\":10,\"tenGhe\":\"B5\",\"maRap\":1,\"loaiGhe\":\"Thuong\",\"stt\":15,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(4, 1, 6, '2025-12-20 01:49:14', 75000, '[{\"maGhe\":11,\"tenGhe\":\"C1\",\"maRap\":1,\"loaiGhe\":\"Vip\",\"stt\":21,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(5, 1, 1, '2025-12-22 16:38:21', 75000, '[{\"maGhe\":12,\"tenGhe\":\"C2\",\"maRap\":1,\"loaiGhe\":\"Vip\",\"stt\":22,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(6, 1, 1, '2025-12-22 17:53:32', 225000, '[{\"maGhe\":94,\"tenGhe\":\"B8\",\"maRap\":1,\"loaiGhe\":\"Vip\",\"stt\":26,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null},{\"maGhe\":99,\"tenGhe\":\"B13\",\"maRap\":1,\"loaiGhe\":\"Vip\",\"stt\":31,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null},{\"maGhe\":118,\"tenGhe\":\"C14\",\"maRap\":1,\"loaiGhe\":\"Thuong\",\"stt\":50,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(7, 4, 1, '2025-12-22 17:57:51', 75000, '[{\"maGhe\":157,\"tenGhe\":\"E17\",\"maRap\":1,\"loaiGhe\":\"Thuong\",\"stt\":89,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL),
(8, 1, 1, '2025-12-22 18:16:42', 150000, '[{\"maGhe\":1,\"tenGhe\":\"A1\",\"maRap\":1,\"loaiGhe\":\"Thuong\",\"stt\":1,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null},{\"maGhe\":2,\"tenGhe\":\"A2\",\"maRap\":1,\"loaiGhe\":\"Thuong\",\"stt\":2,\"giaVe\":75000,\"daDat\":false,\"taiKhoanNguoiDat\":null}]', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `maRap` bigint(20) UNSIGNED NOT NULL,
  `tenRap` varchar(255) NOT NULL,
  `ma_cum_rap` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`maRap`, `tenRap`, `ma_cum_rap`) VALUES
(1, 'Rạp 1', 'bhd-star-cineplex-3-2'),
(2, 'Rạp 2', 'bhd-star-cineplex-3-2'),
(3, 'rạp 3', 'bhd-star-cineplex-3-2'),
(4, 'Rạp 1', 'cgv-vincom-da-nang'),
(5, 'Rạp 2', 'cgv-vincom-da-nang'),
(6, 'Rạp 3', 'cgv-vincom-da-nang'),
(7, 'Rạp 4', 'cgv-vincom-da-nang'),
(8, 'Rạp 1', 'cgv-vinh-trung-plaza'),
(9, 'Rạp 2', 'cgv-vinh-trung-plaza'),
(10, 'Rạp 3', 'cgv-vinh-trung-plaza'),
(11, 'Rạp 1', 'lotte-cinema-da-nang'),
(12, 'Rạp 2', 'lotte-cinema-da-nang'),
(13, 'Rạp 3', 'lotte-cinema-da-nang'),
(14, 'Rạp 4', 'lotte-cinema-da-nang'),
(15, 'Rạp 1', 'galaxy-da-nang'),
(16, 'Rạp 2', 'galaxy-da-nang'),
(17, 'Rạp 3', 'galaxy-da-nang'),
(18, 'Rạp 1', 'bhd-star-dn'),
(19, 'Rạp 2', 'bhd-star-dn'),
(20, 'Rạp 3', 'bhd-star-dn');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_clusters`
--

CREATE TABLE `cinema_clusters` (
  `ma_cum_rap` varchar(255) NOT NULL,
  `ten_cum_rap` varchar(255) NOT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinema_clusters`
--

INSERT INTO `cinema_clusters` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
('bhd-star-cineplex-3-2', 'BHD Star Cineplex - 3/2', 'L5-Vincom 3/2, 3C Đường 3/2, Đà Nẵng', 'BHDStar'),
('bhd-star-dn', 'BHD Đà Nẵng', 'BHD Đà Nẵng', 'BHDStar'),
('cgv-vincom-da-nang', 'CGV - Vincom Đà Nẵng', 'Tầng 4, TTTM Vincom Đà Nẵng, Ngô Quyền, Q. Sơn Trà', 'CGV'),
('cgv-vinh-trung-plaza', 'CGV - Vĩnh Trung Plaza', '255-257 Hùng Vương, Q. Thanh Khê', 'CGV'),
('galaxy-da-nang', 'Galaxy - Đà Nẵng', 'Tầng 3 Coop Mart, 478 Điện Biên Phủ, Q. Thanh Khê', 'Galaxy'),
('lotte-cinema-da-nang', 'Lotte Cinema - Đà Nẵng', 'Tầng 5 Lotte Mart, 6 Nại Nam, P. Hòa Cường Bắc, Q. Hải Châu', 'LotteCinima');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_systems`
--

CREATE TABLE `cinema_systems` (
  `ma_he_thong_rap` varchar(255) NOT NULL,
  `ten_he_thong_rap` varchar(255) NOT NULL,
  `bi_danh` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cinema_systems`
--

INSERT INTO `cinema_systems` (`ma_he_thong_rap`, `ten_he_thong_rap`, `bi_danh`, `logo`) VALUES
('BHDStar', 'BHD Star Cineplex', 'bhd-star-cineplex', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png'),
('CGV', 'CGV Cinema', 'cgv-cinema', 'https://tse3.mm.bing.net/th/id/OIP.2ye5v11jgduCipL4omiMJgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
('CineStar', 'CineStar', 'cinestar', 'https://tse3.mm.bing.net/th/id/OIP.WRhErvZv_0e6WsJeJwnYFAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
('Galaxy', 'Galaxy Cinema', 'galaxy-cinema', 'https://homepage.momocdn.net/cinema/momo-upload-api-211123095138-637732578984425272.png'),
('LotteCinima', 'Lotte Cinema', 'lotte-cinema', 'https://blogreviews.vn/wp-content/uploads/2023/04/logo-lotte-cinema.jpg'),
('MegaGS', 'MegaGS', 'megags', 'https://yt3.ggpht.com/ytc/AKedOLQCFfpHVO0ayqUUYlB5xG2JjCKvzXqO0mrO-ma0=s900-c-k-c0x00ffffff-no-rj');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_11_26_080619_create_users_table_update', 1),
(6, '2025_11_26_151511_create_movies_table', 1),
(7, '2025_11_26_151655_create_banners_table', 1),
(8, '2025_11_26_152714_create_cinema_systems_table', 1),
(9, '2025_11_26_152803_create_cinema_clusters_table', 1),
(10, '2025_11_26_152804_create_cinemas_table', 1),
(11, '2025_11_26_152915_create_showtimes_table', 1),
(12, '2025_11_26_152916_create_bookings_table', 1),
(13, '2025_11_26_152917_create_seats_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `ma_phim` bigint(20) UNSIGNED NOT NULL,
  `ten_phim` varchar(255) NOT NULL,
  `bi_danh` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `ma_nhom` varchar(255) NOT NULL DEFAULT 'GP09',
  `ngay_khoi_chieu` datetime DEFAULT NULL,
  `danh_gia` int(11) NOT NULL DEFAULT 0,
  `dang_chieu` tinyint(1) NOT NULL DEFAULT 0,
  `sap_chieu` tinyint(1) NOT NULL DEFAULT 0,
  `hot` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`ma_phim`, `ten_phim`, `bi_danh`, `trailer`, `hinh_anh`, `mo_ta`, `ma_nhom`, `ngay_khoi_chieu`, `danh_gia`, `dang_chieu`, `sap_chieu`, `hot`, `created_at`, `updated_at`) VALUES
(1001, 'Avengers: Endgame', 'avengers-endgame', 'https://www.youtube.com/embed/TcMBFSGVi1c', 'https://th.bing.com/th/id/R.e955a1a4702bca3ea4da44898ee872dd?rik=y3Q%2bP3rY9f%2bAhA&riu=http%3a%2f%2fcdn.collider.com%2fwp-content%2fuploads%2f2019%2f03%2favengers-endgame-poster.jpg&ehk=UoQckDV4roR6H27tbcXLyQV5qobxoM7kNAwoXFgcWhk%3d&risl=&pid=ImgRaw&r=0', 'Siêu anh hùng Marvel đối đầu Thanos.', 'GP09', '2025-01-01 00:00:00', 10, 1, 0, 1, '2025-12-06 11:46:54', '2025-12-06 11:46:54'),
(1002, 'Spider-Man: No Way Home', 'spider-man', 'https://www.youtube.com/embed/JfVOs4VSpmA', 'https://mondoshop.com/cdn/shop/products/Taylor_Spider-Man_NWH_PeterTwo_large_8a56b9d6-4d76-401a-bad9-73f2fbd8a6b1.jpg?v=1661784995', 'Người nhện và đa vũ trụ.', 'GP09', '2025-02-14 00:00:00', 9, 1, 0, 1, '2025-12-06 11:46:54', '2025-12-06 11:46:54'),
(123669, 'Kẻ Ăn Hồn', 'keanhon', 'https://www.youtube.com/watch?v=gq2xKJXYZ80', '1766173627387-462252230-photo-10-16993265023391102073575.webp', 'Kẻ Ăn Hồn xoay quanh những sự kiện kỳ bí xảy ra tại Làng Địa Ngục, một nơi gắn liền với truyền thuyết ma thuật cổ xưa. Phim kể về hàng loạt cái chết lạ lùng liên quan đến nghi lễ \"5 mạng đổi bình Rượu Sọ Người\", một bí thuật huyền bí có khả năng ban sức mạnh siêu nhiên.', 'GP09', '2025-12-01 00:00:00', 9, 0, 0, 0, NULL, NULL),
(123671, 'Thanh Gươm Diệt Quỷ', 'demoslayer', 'https://www.youtube.com/watch?v=rf0hW__Skow&t=2s', '1766397884431-757782056-demon.webp', 'Gia đình bị thảm sát còn em gái trúng lời nguyền sau cuộc tấn công của ác quỷ, Tanjiro bước vào hành trình đầy hiểm nguy để đưa cô bé trở lại làm người và báo thù.', 'GP09', '0000-00-00 00:00:00', 8, 0, 0, 0, NULL, NULL),
(123672, 'Thỏ Ơi', 'thooi', 'https://www.youtube.com/watch?v=y_RHFh30QAM&t=1s', '1766398059637-888424576-Tho_oi_poster.jpg', 'First look trailer phim tết Thỏ ơi! của Trấn Thành vừa trình làng hôm nay 11/12 đã hé lộ rất nhiều gương mặt quen thuộc của làng giải trí.', 'GP09', '0000-00-00 00:00:00', 9, 0, 0, 0, NULL, NULL),
(123673, 'Bộ Tứ Báo Thủ', 'btbt', 'https://www.youtube.com/watch?v=y_RHFh30QAM&t=1s', '1766398173074-899157735-btbt.webp', 'Bộ tứ báo thủ là phim điện ảnh Việt Nam do Trấn Thành đạo diễn và đóng chính. Phim xoay quanh Quỳnh Anh và Quốc Anh, một cặp đôi yêu nhau nhưng rạn nứt khi Quỳnh Anh nghi bạn trai có quan hệ với người phụ nữ giàu có tên Karen. Để giúp Quỳnh Anh “đánh ghen” và hàn gắn tình cảm, nhóm bạn thân – gồm bốn người tính cách vụng về và ồn ào.', 'GP09', '0000-00-00 00:00:00', 7, 0, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `ma_ghe` bigint(20) UNSIGNED NOT NULL,
  `ten_ghe` varchar(255) NOT NULL,
  `loai_ghe` varchar(255) NOT NULL DEFAULT 'Thuong',
  `maRap` bigint(20) UNSIGNED NOT NULL,
  `stt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `maRap`, `stt`) VALUES
(1, 'A1', 'Thuong', 1, 1),
(2, 'A2', 'Thuong', 1, 2),
(3, 'A3', 'Thuong', 1, 3),
(4, 'A4', 'Thuong', 1, 4),
(5, 'A5', 'Thuong', 1, 5),
(6, 'A6', 'Thuong', 1, 6),
(7, 'A7', 'Thuong', 1, 7),
(8, 'A8', 'Thuong', 1, 8),
(9, 'A9', 'Thuong', 1, 9),
(10, 'A10', 'Thuong', 1, 10),
(11, 'A11', 'Thuong', 1, 11),
(12, 'A12', 'Thuong', 1, 12),
(13, 'A13', 'Thuong', 1, 13),
(14, 'A14', 'Thuong', 1, 14),
(15, 'A15', 'Thuong', 1, 15),
(66, 'A16', 'Thuong', 1, 16),
(67, 'A17', 'Thuong', 1, 17),
(68, 'A18', 'Thuong', 1, 18),
(87, 'B1', 'Thuong', 1, 19),
(88, 'B2', 'Thuong', 1, 20),
(89, 'B3', 'Thuong', 1, 21),
(90, 'B4', 'Thuong', 1, 22),
(91, 'B5', 'Thuong', 1, 23),
(92, 'B6', 'Vip', 1, 24),
(93, 'B7', 'Vip', 1, 25),
(94, 'B8', 'Vip', 1, 26),
(95, 'B9', 'Vip', 1, 27),
(96, 'B10', 'Vip', 1, 28),
(97, 'B11', 'Vip', 1, 29),
(98, 'B12', 'Vip', 1, 30),
(99, 'B13', 'Vip', 1, 31),
(100, 'B14', 'Thuong', 1, 32),
(101, 'B15', 'Thuong', 1, 33),
(102, 'B16', 'Thuong', 1, 34),
(103, 'B17', 'Thuong', 1, 35),
(104, 'B18', 'Thuong', 1, 36),
(105, 'C1', 'Thuong', 1, 37),
(106, 'C2', 'Thuong', 1, 38),
(107, 'C3', 'Thuong', 1, 39),
(108, 'C4', 'Thuong', 1, 40),
(109, 'C5', 'Thuong', 1, 41),
(110, 'C6', 'Vip', 1, 42),
(111, 'C7', 'Vip', 1, 43),
(112, 'C8', 'Vip', 1, 44),
(113, 'C9', 'Vip', 1, 45),
(114, 'C10', 'Vip', 1, 46),
(115, 'C11', 'Vip', 1, 47),
(116, 'C12', 'Vip', 1, 48),
(117, 'C13', 'Vip', 1, 49),
(118, 'C14', 'Thuong', 1, 50),
(119, 'C15', 'Thuong', 1, 51),
(120, 'C16', 'Thuong', 1, 52),
(121, 'C17', 'Thuong', 1, 53),
(122, 'C18', 'Thuong', 1, 54),
(123, 'D1', 'Thuong', 1, 55),
(124, 'D2', 'Thuong', 1, 56),
(125, 'D3', 'Thuong', 1, 57),
(126, 'D4', 'Thuong', 1, 58),
(127, 'D5', 'Thuong', 1, 59),
(128, 'D6', 'Vip', 1, 60),
(129, 'D7', 'Vip', 1, 61),
(130, 'D8', 'Vip', 1, 62),
(131, 'D9', 'Vip', 1, 63),
(132, 'D10', 'Vip', 1, 64),
(133, 'D11', 'Vip', 1, 65),
(134, 'D12', 'Vip', 1, 66),
(135, 'D13', 'Vip', 1, 67),
(136, 'D14', 'Thuong', 1, 68),
(137, 'D15', 'Thuong', 1, 69),
(138, 'D16', 'Thuong', 1, 70),
(139, 'D17', 'Thuong', 1, 71),
(140, 'D18', 'Thuong', 1, 72),
(141, 'E1', 'Thuong', 1, 73),
(142, 'E2', 'Thuong', 1, 74),
(143, 'E3', 'Thuong', 1, 75),
(144, 'E4', 'Thuong', 1, 76),
(145, 'E5', 'Thuong', 1, 77),
(146, 'E6', 'Thuong', 1, 78),
(147, 'E7', 'Thuong', 1, 79),
(148, 'E8', 'Thuong', 1, 80),
(149, 'E9', 'Thuong', 1, 81),
(150, 'E10', 'Thuong', 1, 82),
(151, 'E11', 'Thuong', 1, 83),
(152, 'E12', 'Thuong', 1, 84),
(153, 'E13', 'Thuong', 1, 85),
(154, 'E14', 'Thuong', 1, 86),
(155, 'E15', 'Thuong', 1, 87),
(156, 'E16', 'Thuong', 1, 88),
(157, 'E17', 'Thuong', 1, 89),
(158, 'E18', 'Thuong', 1, 90),
(159, 'A1', 'Thuong', 2, 91),
(160, 'A2', 'Thuong', 2, 92),
(161, 'A3', 'Thuong', 2, 93),
(162, 'A4', 'Thuong', 2, 94),
(163, 'A5', 'Thuong', 2, 95),
(164, 'A6', 'Thuong', 2, 96),
(165, 'A7', 'Thuong', 2, 97),
(166, 'A8', 'Thuong', 2, 98),
(167, 'A9', 'Thuong', 2, 99),
(168, 'A10', 'Thuong', 2, 100),
(169, 'A11', 'Thuong', 2, 101),
(170, 'A12', 'Thuong', 2, 102),
(171, 'A13', 'Thuong', 2, 103),
(172, 'A14', 'Thuong', 2, 104),
(173, 'A15', 'Thuong', 2, 105),
(174, 'A16', 'Thuong', 2, 106),
(175, 'A17', 'Thuong', 2, 107),
(176, 'A18', 'Thuong', 2, 108),
(177, 'B1', 'Thuong', 2, 109),
(178, 'B2', 'Thuong', 2, 110),
(179, 'B3', 'Thuong', 2, 111),
(180, 'B4', 'Thuong', 2, 112),
(181, 'B5', 'Thuong', 2, 113),
(182, 'B6', 'Vip', 2, 114),
(183, 'B7', 'Vip', 2, 115),
(184, 'B8', 'Vip', 2, 116),
(185, 'B9', 'Vip', 2, 117),
(186, 'B10', 'Vip', 2, 118),
(187, 'B11', 'Vip', 2, 119),
(188, 'B12', 'Vip', 2, 120),
(189, 'B13', 'Vip', 2, 121),
(190, 'B14', 'Thuong', 2, 122),
(191, 'B15', 'Thuong', 2, 123),
(192, 'B16', 'Thuong', 2, 124),
(193, 'B17', 'Thuong', 2, 125),
(194, 'B18', 'Thuong', 2, 126),
(195, 'C1', 'Thuong', 2, 127),
(196, 'C2', 'Thuong', 2, 128),
(197, 'C3', 'Thuong', 2, 129),
(198, 'C4', 'Thuong', 2, 130),
(199, 'C5', 'Thuong', 2, 131),
(200, 'C6', 'Vip', 2, 132),
(201, 'C7', 'Vip', 2, 133),
(202, 'C8', 'Vip', 2, 134),
(203, 'C9', 'Vip', 2, 135),
(204, 'C10', 'Vip', 2, 136),
(205, 'C11', 'Vip', 2, 137),
(206, 'C12', 'Vip', 2, 138),
(207, 'C13', 'Vip', 2, 139),
(208, 'C14', 'Thuong', 2, 140),
(209, 'C15', 'Thuong', 2, 141),
(210, 'C16', 'Thuong', 2, 142),
(211, 'C17', 'Thuong', 2, 143),
(212, 'C18', 'Thuong', 2, 144),
(213, 'D1', 'Thuong', 2, 145),
(214, 'D2', 'Thuong', 2, 146),
(215, 'D3', 'Thuong', 2, 147),
(216, 'D4', 'Thuong', 2, 148),
(217, 'D5', 'Thuong', 2, 149),
(218, 'D6', 'Vip', 2, 150),
(219, 'D7', 'Vip', 2, 151),
(220, 'D8', 'Vip', 2, 152),
(221, 'D9', 'Vip', 2, 153),
(222, 'D10', 'Vip', 2, 154),
(223, 'D11', 'Vip', 2, 155),
(224, 'D12', 'Vip', 2, 156),
(225, 'D13', 'Vip', 2, 157),
(226, 'D14', 'Thuong', 2, 158),
(227, 'D15', 'Thuong', 2, 159),
(228, 'D16', 'Thuong', 2, 160),
(229, 'D17', 'Thuong', 2, 161),
(230, 'D18', 'Thuong', 2, 162),
(231, 'E1', 'Thuong', 2, 163),
(232, 'E2', 'Thuong', 2, 164),
(233, 'E3', 'Thuong', 2, 165),
(234, 'E4', 'Thuong', 2, 166),
(235, 'E5', 'Thuong', 2, 167),
(236, 'E6', 'Thuong', 2, 168),
(237, 'E7', 'Thuong', 2, 169),
(238, 'E8', 'Thuong', 2, 170),
(239, 'E9', 'Thuong', 2, 171),
(240, 'E10', 'Thuong', 2, 172),
(241, 'E11', 'Thuong', 2, 173),
(242, 'E12', 'Thuong', 2, 174),
(243, 'E13', 'Thuong', 2, 175),
(244, 'E14', 'Thuong', 2, 176),
(245, 'E15', 'Thuong', 2, 177),
(246, 'E16', 'Thuong', 2, 178),
(247, 'E17', 'Thuong', 2, 179),
(248, 'E18', 'Thuong', 2, 180);

-- --------------------------------------------------------

--
-- Table structure for table `showtimes`
--

CREATE TABLE `showtimes` (
  `ma_lich_chieu` bigint(20) UNSIGNED NOT NULL,
  `maRap` bigint(20) UNSIGNED NOT NULL,
  `ma_phim` bigint(20) UNSIGNED NOT NULL,
  `ngay_chieu_gio` datetime NOT NULL,
  `gia_ve` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`ma_lich_chieu`, `maRap`, `ma_phim`, `ngay_chieu_gio`, `gia_ve`, `created_at`, `updated_at`) VALUES
(1, 1, 1001, '2025-01-01 10:00:00', 75000, NULL, NULL),
(2, 1, 1001, '2025-01-01 13:00:00', 90000, NULL, NULL),
(3, 1, 1001, '2025-12-31 23:43:35', 95000, NULL, NULL),
(4, 3, 1001, '2025-12-30 23:43:47', 95000, NULL, NULL),
(5, 1, 1001, '2025-12-07 08:09:38', 75000, NULL, NULL),
(6, 1, 1002, '2025-12-20 06:06:06', 75000, NULL, NULL),
(7, 2, 1001, '2026-01-01 16:00:00', 75000, NULL, NULL),
(8, 11, 1001, '2026-01-19 12:00:00', 95000, NULL, NULL),
(9, 20, 123669, '2026-01-21 18:00:00', 95000, NULL, NULL),
(10, 3, 123671, '2025-12-22 17:11:38', 75000, NULL, NULL),
(11, 1, 123672, '2025-12-22 17:14:02', 75000, NULL, NULL),
(12, 2, 123673, '2025-12-19 20:12:22', 75000, NULL, NULL),
(13, 11, 1001, '2025-12-22 18:17:42', 95000, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tai_khoan` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `ma_loai_nguoi_dung` varchar(255) NOT NULL DEFAULT 'KhachHang',
  `ma_nhom` varchar(255) NOT NULL DEFAULT 'GP09',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `password`, `ma_loai_nguoi_dung`, `ma_nhom`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'nhugg.410@gmail.com', 'nhung', 'nhugg.410@gmail.com', '0325537516', 'nhung', 'QuanTri', 'GP09', NULL, '2025-12-06 12:23:48', '2025-12-06 12:23:48'),
(2, 'ttnm', 'Trần Thị Ngọc Mai', 'maitran@gmail.com', '0325537544', 'ttnm', 'QuanTri', 'GP09', NULL, NULL, NULL),
(3, 'lhmi', 'Lê Hà Mi', 'miiiimeomeo@gmail.com', '0325537544', 'lhmi', 'QuanTri', 'GP09', NULL, NULL, NULL),
(4, 'concobebe', 'nhung', 'mai@gmail.com', '0325537516', '123', 'KhachHang', 'GP09', NULL, NULL, NULL),
(7, 'nhum', 'Nhung', 'nhum.4@gmail.com', '0325537516', '123', 'KhachHang', 'GP09', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`ma_banner`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`ma_ve`),
  ADD KEY `bookings_user_id_foreign` (`user_id`),
  ADD KEY `bookings_ma_lich_chieu_foreign` (`ma_lich_chieu`);

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`maRap`),
  ADD KEY `cinemas_ma_cum_rap_foreign` (`ma_cum_rap`);

--
-- Indexes for table `cinema_clusters`
--
ALTER TABLE `cinema_clusters`
  ADD PRIMARY KEY (`ma_cum_rap`),
  ADD KEY `cinema_clusters_ma_he_thong_rap_foreign` (`ma_he_thong_rap`);

--
-- Indexes for table `cinema_systems`
--
ALTER TABLE `cinema_systems`
  ADD PRIMARY KEY (`ma_he_thong_rap`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`ma_phim`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`ma_ghe`),
  ADD KEY `seats_ma_rap_foreign` (`maRap`);

--
-- Indexes for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`ma_lich_chieu`),
  ADD KEY `showtimes_ma_rap_foreign` (`maRap`),
  ADD KEY `showtimes_ma_phim_foreign` (`ma_phim`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_tai_khoan_unique` (`tai_khoan`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `ma_banner` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `ma_ve` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `maRap` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `ma_phim` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123675;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `ma_ghe` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `ma_lich_chieu` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ma_lich_chieu_foreign` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `showtimes` (`ma_lich_chieu`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD CONSTRAINT `cinemas_ma_cum_rap_foreign` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cinema_clusters` (`ma_cum_rap`) ON DELETE CASCADE;

--
-- Constraints for table `cinema_clusters`
--
ALTER TABLE `cinema_clusters`
  ADD CONSTRAINT `cinema_clusters_ma_he_thong_rap_foreign` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `cinema_systems` (`ma_he_thong_rap`) ON DELETE CASCADE;

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ma_rap_foreign` FOREIGN KEY (`maRap`) REFERENCES `cinemas` (`maRap`) ON DELETE CASCADE;

--
-- Constraints for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ma_phim_foreign` FOREIGN KEY (`ma_phim`) REFERENCES `movies` (`ma_phim`) ON DELETE CASCADE,
  ADD CONSTRAINT `showtimes_ma_rap_foreign` FOREIGN KEY (`maRap`) REFERENCES `cinemas` (`maRap`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
