import React, { Component } from "react";
import "./News.scss";
export default class News extends Component {
  render() {
    return (
      <section id="news" className="news">
        <div className="container">
          <div id="newsTab">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-24h-tab"
                  data-toggle="pill"
                  href="#pills-24h"
                  role="tab"
                  aria-controls="pills-24h"
                  aria-selected="true"
                >
                  Điện Ảnh 24h
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-review-tab"
                  data-toggle="pill"
                  href="#pills-review"
                  role="tab"
                  aria-controls="pills-review"
                  aria-selected="false"
                >
                  Review
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-promotion-tab"
                  data-toggle="pill"
                  href="#pills-promotion"
                  role="tab"
                  aria-controls="pills-promotion"
                  aria-selected="false"
                >
                  Khuyến Mãi
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-24h"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="tab__content">
                  <div className="card-content row">
                    <div className="example-1 card">
                      <div className="wrapper">
                        <div className="datepost">
                          <span className="daypost">01</span>
                          <span className="monthpost">Tháng 12</span>
                          <span className="yearpost">2025</span>
                        </div>
                        <div className="datanews">
                          <div className="contentnews">
                            <span className="authornews">Nờ Mai</span>
                            <h1 className="titlenews">
                              <a className="title__link" href="/#">
                                Một thành viên của Avengers sẽ "biến chất"?
                              </a>
                            </h1>
                            <p className="text-description">
                              Marvel Studios đang ủ ý tưởng cho quân mình đánh
                              quân ta, khi dự định biến một thành viên cao cấp
                              của nhóm Avengers trở thành phản diện...
                            </p>
                            <label htmlFor="show-menu" className="menu-button">
                              <span />
                            </label>
                          </div>
                          <input type="checkbox" id="show-menu" />
                          <ul className="menu-content">
                            <li className="menu-content-item">
                              <a className="item__link" href="/#">
                                <i className="fa fa-tag"></i>
                              </a>
                            </li>
                            <li className="menu-content-item">
                              <a href="/#" className="item__link fa fa-heart">
                                <span className="item-data">47</span>
                              </a>
                            </li>
                            <li className="menu-content-item">
                              <a href="/#" className="item__link fa fa-comment">
                                <span className="item-data">8</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="example-2 card">
                      <div className="wrapper">
                        <div className="header-post">
                          <div className="datepost">
                            <span className="daypost">16 </span>
                            <span className="monthpost">Tháng 12 </span>
                            <span className="yearpost">2025</span>
                          </div>
                          <ul className="menu-content">
                            <li className="menu-content-item">
                              <a
                                href="/#"
                                className="item__link"
                              >
                                <i className="fa fa-bookmark"></i>
                              </a>
                            </li>
                            <li className="menu-content-item">
                              <a href="/#" className="item__link fa fa-heart">
                                <span className="item-data">18</span>
                              </a>
                            </li>
                            <li className="menu-content-item">
                              <a href="/#" className="item__link fa fa-comment">
                                <span className="item-data">3</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="datanews">
                          <div className="contentnews">
                            <span className="authornews">Paul Pogba</span>
                            <h1 className="titlenews">
                              <a className="title__link" href="/#">
                                Stranger Things: The sound of the Upside Down
                              </a>
                            </h1>
                            <p className="text-description">
                              The antsy bingers of Netflix will eagerly
                              anticipate the digital release of the Survive
                              soundtrack, out today.
                            </p>
                            <a href="/#" className="button-watch">
                              Xem thêm
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="readMore">
                    <button className="btn btn__readmore">XEM THÊM</button>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-review"
                role="tabpanel"
                aria-labelledby="pills-review-tab"
              >
                <div className="tab__content">
                  <div className="row__above row">
                    <div className="row__item col-md-6 col-sm-12">
                      <div className="item__img">
                        <a href="/#">
                          <img
                            className="img-fluid"
                            src="https://wallpaperaccess.com/full/5925555.jpg"
                            alt="hinhanhstorm"
                          />
                        </a>
                      </div>
                      <div className="item__text">
                        <a className="item__title" href="/#">
                          [Review] Stormbreaker và Mjolnir: Loại vũ khí nào của
                          Thor mạnh hơn?
                        </a>
                        <p className="item__description">
                          Tác phẩm mới nhất của Marvel tiếp tục là câu chuyện
                          hài hước và cảm xúc về tình cảm gia đình.
                        </p>
                      </div>
                      <div className="item__icon">
                        <div className="icon__social d-inline">
                          <i className="fa fa-thumbs-up" />
                          <span className="count__number">2</span>
                        </div>
                        <div className="icon__social d-inline">
                          <i className="fa fa-comment-alt" />
                          <span className="count__number">0</span>
                        </div>
                      </div>
                    </div>
                    <div className="row__item col-md-6 col-sm-12">
                      <div className="item__img">
                        <a href="/#">
                          <img
                            className="img-fluid"
                            src="https://th.bing.com/th/id/OIP.FA-XhwdZVZSmaJ5TEDUT0wHaEK?w=331&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                            alt="hinhansds"
                          />
                        </a>
                      </div>
                      <div className="item__text">
                        <a className="item__title" href="/#">
                          [Review] Kẻ Vô Hình - Còn gì đáng sợ hơn kẻ giết người
                          bệnh hoạn vô hình?
                        </a>
                        <p className="item__description">
                          Phiên bản hiện đại của The Invisible Man là một trong
                          những phim kinh dị xuất sắc nhất năm nay.
                        </p>
                      </div>
                      <div className="item__icon">
                        <div className="icon__social d-inline">
                          <i className="fa fa-thumbs-up" />
                          <span className="count__number">0</span>
                        </div>
                        <div className="icon__social d-inline">
                          <i className="fa fa-comment-alt" />
                          <span className="count__number">1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row__below row">
                    <div className="row__left col-md-8">
                      <div className="left__below row">
                        <div className="left__item col-6">
                          <div className="item__img">
                            <img
                              className="img-fluid"
                              src="https://upload.wikimedia.org/wikipedia/vi/b/b3/Tho_oi_poster.jpg"
                              alt="hinhansdsddh"
                            />
                          </div>
                          <div className="item__text">
                            <a className="item__title" href="/#">
                              [Review] Thỏ ơi - Bộ phim điện ảnh hot nhất 
                              Tết 2026
                            </a>
                            <p className="item__description">
                              Một bộ phim điện ảnh Việt Nam thuộc thể loại
                              lãng mạn – giật gân – chính kịch do Trấn Thành đạo diễn 
                              kiêm sản xuất.
                            </p>
                          </div>
                          <div className="item__icon">
                            <div className="icon__social d-inline">
                              <i className="fa fa-thumbs-up" />
                              <span className="count__number">5</span>
                            </div>
                            <div className="icon__social d-inline">
                              <i className="fa fa-comment-alt" />
                              <span className="count__number">1</span>
                            </div>
                          </div>
                        </div>
                        <div className="left__item col-6">
                          <div className="item__img">
                            <img
                              className="img-fluid"
                              src="https://tse2.mm.bing.net/th/id/OIP.i7hKE3TCHJIfQSCBT45o-wHaJP?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
                              alt="hinhaa212anh"
                            />
                          </div>
                          <div className="item__text">
                            <a className="item__title" href="/#">
                              [Review] Mưa đỏ - Máu xương đổ xuống, 
                              đất trời lưu danh.
                            </a>
                            <p className="item__description">
                              Phim truyện Việt Nam về đề tài chiến tranh cách mạng, 
                              lấy cảm hứng và hư cấu từ sự kiện 81 ngày đêm chiến đấu anh dũng,
                              bảo vệ Thành cổ Quảng Trị.
                            </p>
                          </div>
                          <div className="item__icon">
                            <div className="icon__social d-inline">
                              <i className="fa fa-thumbs-up" />
                              <span className="count__number">1</span>
                            </div>
                            <div className="icon__social d-inline">
                              <i className="fa fa-comment-alt" />
                              <span className="count__number">1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row__right col-md-4 col-sm-12">
                      <ul>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://th.bing.com/th/id/OIP.m1Ql7e6E7wF6wW_hcpknxQHaLH?w=115&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                                alt="ad223"
                              />
                            </div>
                            <div className="item__title">
                              [Review] Jujutsu Kaisen 2 - Đã chính thức ra mắt tại các rạp chiếu phim
                              từ tháng 11 đến tháng 12 năm 2025.
                            </div>
                          </a>
                        </li>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://th.bing.com/th/id/OIP.UXZuw3U_oGQzCXyAXqszFAHaKu?w=115&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                                alt="hinhanh"
                              />
                            </div>
                            <div className="item__title">
                              [Review] Sắc Đẹp Dối Trá - Hương Giang kể chuyện
                              đời mình qua phim ảnh
                            </div>
                          </a>
                        </li>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://th.bing.com/th/id/OIP.nW7GmaWtXLj29z6u3hvLMAHaKX?w=115&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                                alt="botubaothu"
                              />
                            </div>
                            <div className="item__title">
                              [Review] Bộ tứ báo thủ - Khi bạn trai cô trở nên thân thiết với một đồng nghiệp mới giàu có,
                              và cô quyết định vạch mặt cô ta.
                            </div>
                          </a>
                        </li>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://th.bing.com/th/id/OIP.9cKQHyTWyLaG6OFZ2Nh4dAHaJQ?w=137&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                                alt="zootopia"
                              />
                            </div>
                            <div className="item__title">
                              [Review] Zootopia 2 - Sự trở lại của Judy Hopps và Nick Wilde
                              cùng thành công vang dội về doanh thu.
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="readMore">
                    <button className="btn btn__readmore">XEM THÊM</button>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-promotion"
                role="tabpanel"
                aria-labelledby="pills-promotion-tab"
              >
                <div className="tab__content">
                  <div className="row__above row">
                    <div className="row__item col-md-6 col-sm-12">
                      <div className="item__img">
                        <a href="/#">
                          <img
                            className="img-fluid"
                            src="https://simg.zalopay.com.vn/zlp-website/assets/1x_CGV_Feb_9_K_0b2c54b7e2.jpg"
                            alt="cgvkm"
                          />
                        </a>
                      </div>
                      <div className="item__text">
                        <a className="item__title" href="/#">
                          CGV - Xem phim chỉ 9K khi thanh
                          toán qua ZaloPay
                        </a>
                        <p className="item__description">
                          Chỉ 9K/vé CGV khi thanh toán bằng ví điện tử ZaloPay và nhận thêm nhiều voucher khuyến mãi khác khi mua vé xem phim CGV.
                        </p>
                      </div>
                      <div className="item__icon">
                        <div className="icon__social d-inline">
                          <i className="fa fa-thumbs-up" />
                          <span className="count__number">2</span>
                        </div>
                        <div className="icon__social d-inline">
                          <i className="fa fa-comment-alt" />
                          <span className="count__number">0</span>
                        </div>
                      </div>
                    </div>
                    <div className="row__item col-md-6 col-sm-12">
                      <div className="item__img">
                        <a href="/#">
                          <img
                            className="img-fluid"
                            src="https://homepage.momocdn.net/blogscontents/momo-amazone-s3-api-251105154829-638979545097856878.jpg"
                            alt="lotte"
                          />
                        </a>
                      </div>
                      <div className="item__text">
                        <a className="item__title" href="/#">
                          Xem Lotte Cinema cuối tuần, giá ưu đãi chỉ 105.000đ/vé 2D. Đặt ngay!
                        </a>
                        <p className="item__description">
                          Deal hời cuối tuần dành cho fan Lotte Cinema khi đặt vé qua MoMo! 
                          Giá chỉ 105.000đ/vé cho 2D ghế thường & VIP, áp dụng thứ 6 - thứ 7 - chủ nhật hàng tuần. Chốt vé ngay!
                        </p>
                      </div>
                      <div className="item__icon">
                        <div className="icon__social d-inline">
                          <i className="fa fa-thumbs-up" />
                          <span className="count__number">0</span>
                        </div>
                        <div className="icon__social d-inline">
                          <i className="fa fa-comment-alt" />
                          <span className="count__number">1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row__below row">
                    <div className="row__left col-md-8">
                      <div className="left__below row">
                        <div className="left__item col-6">
                          <div className="item__img">
                            <img
                              className="img-fluid"
                              src="https://www.bhdstar.vn/wp-content/uploads/2025/05/SUAT-CHIEU-DEM-1.jpg"
                              alt="bhdstar"
                            />
                          </div>
                          <div className="item__text">
                            <a className="item__title" href="/#">
                              ƯU ĐÃI SUẤT CHIẾU ĐÊM, CHỈ TỪ 48K
                            </a>
                            <p className="item__description">
                              Bạn là “cú đêm” chính hiệu? Bạn đang tìm một trải nghiệm thú vị sau 22h?
                              Hãy để BHD Star mang đến cho bạn một đêm hè đúng nghĩa với chương trình Ưu đãi xuất chiếu đêm
                            </p>
                          </div>
                          <div className="item__icon">
                            <div className="icon__social d-inline">
                              <i className="fa fa-thumbs-up" />
                              <span className="count__number">5</span>
                            </div>
                            <div className="icon__social d-inline">
                              <i className="fa fa-comment-alt" />
                              <span className="count__number">1</span>
                            </div>
                          </div>
                        </div>
                        <div className="left__item col-6">
                          <div className="item__img">
                            <img
                              className="img-fluid"
                              src="https://flowerimages.vnpay.vn/flowerimages/52a2e4e0a7ca4e18946ffc9c2330b939.jpg"
                              alt="zaloshs"
                            />
                          </div>
                          <div className="item__text">
                            <a className="item__title" href="/#">
                              Ưu đãi đồng giá siêu hời: 78k có ngay vé xem phim Galaxy
                            </a>
                            <p className="item__description">
                              Đặt vé Galaxy Cinema qua ứng dụng ngân hàng có tích hợp VNPAY, VNPAY App hoặc website vnpay.vn,
                              nhận ngay giá vé đồng giá chỉ 78.000đ – áp dụng cả tuần! Phim hay, giá rẻ – mau đặt vé trải nghiệm ngay! 
                            </p>
                          </div>
                          <div className="item__icon">
                            <div className="icon__social d-inline">
                              <i className="fa fa-thumbs-up" />
                              <span className="count__number">1</span>
                            </div>
                            <div className="icon__social d-inline">
                              <i className="fa fa-comment-alt" />
                              <span className="count__number">1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row__right col-md-4 col-sm-12">
                      <ul>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPGY5k8hD3FJ4OA-Ojuszjr52iocMEFyWXg&s"
                                alt="lotte"
                              />
                            </div>
                            <div className="item__title">
                              Lotte Cinema - Xem phim trong tuần, giá ưu đãi chỉ 99.000đ/vé 2D. Đặt ngay!
                            </div>
                          </a>
                        </li>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Ny8ubhCFz7Acg07g7kxQU5qjmi2SPd8sPw&s"
                                alt="ddcs22"
                              />
                            </div>
                            <div className="item__title">
                              [CGV] Thứ 6 Không Đen Tối - Ưu đãi huỷ diệt
                              11k/vé Anh Trai Yêu Quái
                            </div>
                          </a>
                        </li>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://avatars.githubusercontent.com/u/36770798?s=280&v=4"
                                alt="momo"
                              />
                            </div>
                            <div className="item__title">
                              [MoMo] NHẬP MÃ 'PSM30K' - Giảm ngay 30k khi đặt
                              vé Bộ Tứ Báo Thủ
                            </div>
                          </a>
                        </li>
                        <li className="right__item">
                          <a className="item__link" href="/#">
                            <div className="item__img">
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkH0mX63CZL_sulnH1LXcd_IovPUFQkLn81w&s"
                                alt="megags"
                              />
                            </div>
                            <div className="item__title">
                              [Mega GS] X2 MEGA DAY - THỨ 3, 4 HÀNG TUẦN TẠI MEGA GS CAO THẮNG, ĐÀ NẴNG
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="readMore">
                    <button className="btn btn__readmore">XEM THÊM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
