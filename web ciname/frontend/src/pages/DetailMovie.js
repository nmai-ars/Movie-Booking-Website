import React, { useState, Fragment, useEffect } from "react"; // [1] Đổi useMemo thành useEffect
import { qLyPhimService } from "../services/QuanLyPhimServices";
import MovieInfo from "../components/DetailMovie/MovieInfo/MovieInfo";
import ShowTime from "../components/DetailMovie/ShowTime/ShowTime";
import SpinnerLoading from "../components/SpinnerLoading/SpinnerLoading";

const DetailMovie = (props) => {
  // Khai báo state
  const [phim, setPhim] = useState(null); // Nên để null thay vì [] để dễ kiểm tra
  const [loading, setLoading] = useState(true);

  // Lấy mã phim từ URL (Do App.js đặt path="/moviedetail/:maphim")
  // Nên props.match.params.maphim là CHÍNH XÁC
  const maPhim = props.match.params.maphim;

  // [2] Dùng useEffect để gọi API (Thay vì useMemo)
  useEffect(() => {
    // [3] QUAN TRỌNG: Kiểm tra nếu có mã phim mới gọi API
    if (maPhim) {
      qLyPhimService
        .layThongTinPhim(maPhim)
        .then((result) => {
          // Giả lập delay loading (nếu cần)
          setTimeout(() => {
            setPhim(result.data);
            setLoading(false);
          }, 1500);
        })
        .catch((err) => {
          console.log("Lỗi lấy thông tin phim:", err);
          setLoading(false);
        });
    }
  }, [maPhim]); // Chỉ chạy lại khi maPhim thay đổi

  return (
    <Fragment>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          {/* Kiểm tra phim tồn tại rồi mới render */}
          {phim && <MovieInfo phimItem={phim} />}
          {phim && <ShowTime phim={phim} maPhim={maPhim} />}
        </>
      )}
    </Fragment>
  );
};

export default DetailMovie;