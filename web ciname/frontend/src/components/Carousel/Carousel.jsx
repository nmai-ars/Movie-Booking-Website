import React from "react";
import { useDispatch } from "react-redux"; // 1. Import hook
import "../Carousel/Carousel.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import BookTicket from "../BookTicket/BookTicket";

export default function Carousel() {
  const dispatch = useDispatch(); // 2. Khai báo dispatch

  // Hàm xử lý khi bấm nút Play
  const openModal = (urlVideo) => {
    dispatch({
      type: 'SET_DATA_MODAL', // <--- LƯU Ý: Bạn cần thay chữ này bằng action type đúng trong Redux của bạn (ví dụ: 'OPEN_MODAL')
      payload: {
        open: true,
        url: urlVideo
      }
    });
  };

  return (
    <div className="hotMovie">
      <div className="hotMovie__content">
        <OwlCarousel
          loop
          nav
          autoplay
          items={1}
          className="myHotMovieCarousel owl-carousel owl-theme"
        >
          {/* ITEM 1 */}
          <div className="item">
            <div className="item__img">
              <img
                className="img-fluid"
                src="https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
                alt="banner"
              />
              {/* 3. Thêm onClick vào đây */}
              {/* <div 
                className="background__overlay" 
                onClick={() => openModal("https://www.youtube.com/watch?v=6trOfA4vwq8")}
                style={{cursor: 'pointer'}} // Thêm style con trỏ chuột cho đẹp
              >
                <i className="fa fa-play carousel__button" />
              </div> */}
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="item">
            <div className="item__img">
              <img
                className="img-fluid"
                src="https://movienew.cybersoft.edu.vn/hinhanh/demon-slayer_gp02.jpg"
                alt="banner"
              />
              {/* <div 
                className="background__overlay"
                onClick={() => openModal("https://www.youtube.com/watch?v=5EqVDyqhMko")}
                style={{cursor: 'pointer'}}
              >
                <i className="fa fa-play carousel__button" />
              </div> */}
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="item">
            <div className="item__img">
              <img
                className="img-fluid"
                src="https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png"
                alt="banner"
              />
              {/* <div 
                className="background__overlay"
                onClick={() => openModal("https://www.youtube.com/watch?v=Zw9lINmT-zc")}
                style={{cursor: 'pointer'}}
              >
                <i className="fa fa-play carousel__button" />
              </div> */}
            </div>
          </div>
        </OwlCarousel>
      </div>
      <BookTicket />
    </div>
  );
}