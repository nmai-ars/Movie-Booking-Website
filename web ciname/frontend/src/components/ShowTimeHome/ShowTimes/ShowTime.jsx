import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./ShowTime.scss";

export default function ShowTime(props) {
  let { rap, maCumRap } = props;
  var moment = require("moment");

  // --- [THÊM ĐOẠN NÀY] Hàm xử lý link ảnh ---
  const getImgUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("https")) {
      return url;
    }
    // Fallback về localhost nếu là tên file
    return `http://localhost:88/hinhanh/${url}`;
  };
  // -----------------------------------------
  const renderShowTime = (phim) => {
    return (
      <ul className="d-flex flex-wrap">
        {phim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
          return (
            <li className="timeshow__item" key={index}>
              <NavLink
                className="timeshow__link"
                to={`/booking/${lichChieu.maLichChieu}`}
              >
                <span className="time__begin">
                  {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  };
  const renderMovie = () => {
    if (rap.maCumRap === maCumRap) {
      return rap.danhSachPhim?.map((phim, index) => {
        
        // --- [THÊM ĐOẠN NÀY] Xử lý link ảnh ---
        let imgUrl = phim.hinhAnh;
        if (imgUrl && !imgUrl.startsWith("http") && !imgUrl.startsWith("https")) {
          // Nếu không phải link online, nối thêm domain backend vào
          imgUrl = `http://localhost:88/hinhanh/${imgUrl}`;
        }
        // -------------------------------------

        return (
          <li className="film__item" key={index}>
            <a
              className="film__link"
              data-toggle="collapse"
              href={`#${"id" + phim.maPhim + index}`}
              role="button"
              aria-expanded="false"
              aria-controls={phim.maPhim}
            >
              <div className="row">
                <div className="film__img col-2">
                  {/* Thay phim.hinhAnh bằng biến imgUrl đã xử lý */}
                  <img src={imgUrl} alt={phim.tenPhim} />
                </div>
                <div className="film__title col-10">
                  <span className="age--C">2D</span>
                  <span className="film__name">{phim.tenPhim}</span>
                  <p className="film__timming">99 phút - 7 - IMDb 6.9</p>
                </div>
              </div>
            </a>
            <div className="collapse" id={"id" + phim.maPhim + index}>
              <div className="collapse__content">{renderShowTime(phim)}</div>
            </div>
          </li>
        );
      });
    }
  };
  return <Fragment>{renderMovie()}</Fragment>;
}
