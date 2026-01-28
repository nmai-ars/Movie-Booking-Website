import React from "react";
import { NavLink } from "react-router-dom";
import "./MovieCarouselItem.scss";
import Skeleton from "react-loading-skeleton";
import ModalTrailer from "../ModalTrailer/ModalTrailer";

export default function MovieCarouselItem({ phimItem }) {
  var moment = require("moment");
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);

  // --- [THÊM ĐOẠN NÀY] Xử lý hiển thị hình ảnh ---
  const renderHinhAnh = () => {
    // Nếu không có hình, trả về hình rỗng
    if (!phimItem.hinhAnh) return "";

    // Nếu hình đã là link online (http/https) thì giữ nguyên (lấy từ API)
    if (phimItem.hinhAnh.startsWith("http") || phimItem.hinhAnh.startsWith("https")) {
      return phimItem.hinhAnh;
    }
    
    // Nếu chỉ là tên file, bạn có thể trỏ về localhost hoặc để link API gốc
    // Ví dụ: trỏ về server backend chạy ở port 88 như trong MovieItem
    return `http://localhost:88/hinhanh/${phimItem.hinhAnh}`; 
  };
  
  const bgImage = renderHinhAnh();
  // ----------------------------------------------
  return (
    <div className="item__movie">
      <div className="item__link">
        <div className="item__img">
          <img src={bgImage} alt={phimItem.tenPhim} />
          <div className="overlay">
            <div
              className="play__button"
              style={{ cursor: "pointer" }}
              onClick={handleToggle}
            >
              <i className="fa fa-play play__icon" />
            </div>
          </div>
          <span className="film__age age--C">{phimItem.maNhom}</span>
          <span className="film__audit">
            <p className="film__point">8</p>
            <i className="fa fa-star film__star" />
            <i className="fa fa-star film__star" />
            <i className="fa fa-star film__star" />
            <i className="fa fa-star film__star" />
          </span>
        </div>
        <div className="item__info">
          <p className="film__name">{phimItem.tenPhim || <Skeleton />}</p>
          <span className="film__during">
            {moment(phimItem.ngayKhoiChieu).format("yy")}
          </span>
          <div className="item__button">
            <NavLink
              className="btn buyTicket__button"
              to={`/moviedetail/${phimItem.maPhim}`}
            >
              ĐẶT VÉ
            </NavLink>
          </div>
        </div>
      </div>
      <ModalTrailer
        trailer={phimItem.trailer}
        maPhim={phimItem.maPhim}
        open={open}
        handleToggle={handleToggle}
      />
    </div>
  );
}
