import React from "react";
import "./MovieItem.scss";
import ModalTrailer from "../ModalTrailer/ModalTrailer";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

// [1] Import domain nếu muốn dùng dynamic, hoặc hardcode localhost:88
// import { domain } from "../../config/setting"; 

export default function MovieItem({ phimItem }) {
  var moment = require("moment");
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);

  // --- [PHẦN SỬA LỖI HÌNH ẢNH] ---
  const renderHinhAnh = () => {
    // Nếu không có hình, trả về hình rỗng hoặc placeholder
    if (!phimItem.hinhAnh) return "";

    // Nếu hình đã là link online (https://...) thì giữ nguyên
    if (phimItem.hinhAnh.startsWith("http") || phimItem.hinhAnh.startsWith("https")) {
      return phimItem.hinhAnh;
    }
    
    // Nếu là hình upload (chỉ có tên file), nối thêm domain backend vào
    // Lưu ý: '/hinhanh/' phụ thuộc vào cách bạn cấu hình app.use(express.static...) bên Backend
    // Nếu bên backend bạn để: app.use(express.static('public')), thì bỏ chữ /hinhanh đi
    return `http://localhost:88/hinhanh/${phimItem.hinhAnh}`; 
  };
  
  const bgImage = renderHinhAnh();
  // -------------------------------

  return (
    <div className="movie-card col-md-6 col-sm-12">
      <NavLink className="card-link" to={`/moviedetail/${phimItem.maPhim}`}>
        <div className="card-content">
          <div className="content-left">
            <div className="left-header-movie">
              <h1 className="movie-name">{phimItem.tenPhim}</h1>
              <h4 className="group-id">{phimItem.maNhom}</h4>
              <p className="during-time">120 phút</p>
              <p className="date-time">
                {moment(phimItem.ngayKhoiChieu).format("DD-MM-yyyy")}
              </p>
            </div>
            <div className="below-header">
              <p className="description">{phimItem.moTa}</p>
            </div>
          </div>
          <LazyLoad throttle={200}>
            <CSSTransition
              key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={1000}
              transitionEnter={false}
              transitionLeave={false}
            >
              {/* [2] Thay thế url trực tiếp bằng biến bgImage đã xử lý ở trên */}
              <div
                className="content-right"
                style={{ backgroundImage: `url(${bgImage})` }}
              ></div>
            </CSSTransition>
          </LazyLoad>
        </div>
      </NavLink>
      <div className="play-trailer" onClick={handleToggle}>
        <i className="play-icon fa fa-play"></i>
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