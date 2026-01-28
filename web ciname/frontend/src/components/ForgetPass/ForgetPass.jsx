import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom"; // 1. Thêm useHistory vào đây
import "./ForgetPass.scss";
import axios from "axios";
import swal from "sweetalert";

const ForgetPass = (props) => {
  const history = useHistory(); // 2. Khai báo hook history
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (event) => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!email.match(regexEmail)) {
      setError("Email không hợp lệ!");
      return;
    }

    setIsLoading(true);

    axios({
      method: "POST",
      url: "http://localhost:88/api/QuanLyNguoiDung/LayLaiMatKhau",
      data: { email: email },
    })
      .then((res) => {
        setIsLoading(false);
        swal({
          title: "Thành công!",
          text: "Mật khẩu mới đã được gửi vào email. Vui lòng kiểm tra hộp thư.",
          icon: "success",
          button: "OK",
        }).then(() => {
            // 3. Sử dụng history đã khai báo ở trên để chuyển trang
            // Chuyển về login
            history.push("/login"); 
            
            // Hoặc nếu muốn về trang chủ (3000) thì dùng:
            // history.push("/"); 
        });
      })
      .catch((err) => {
        setIsLoading(false);
        let msg = "Có lỗi xảy ra!";
        if (err.response && err.response.data) {
           msg = typeof err.response.data === 'string' ? err.response.data : err.response.data.message;
        }
        swal({
          title: "Lỗi",
          text: msg || "Email này chưa được đăng ký trong hệ thống!",
          icon: "error",
          button: "OK",
        });
      });
  };

  return (
    <section className="backgroundBodyUser">
      <div className="container-fluid">
        <div className="forgetForm">
          <NavLink className="img__link" to="/">
            <div className="img__logo">
              <img
                src="https://i0.wp.com/thegamehaus.com/wp-content/uploads/2020/05/Volibear_Emote.png?resize=256%2C256&ssl=1"
                alt="logo"
              />
              <span className="text-logo">NM CINEMA</span>
            </div>
          </NavLink>
          
          <div className="formMessage">
            Nhập địa chỉ email bạn đã đăng ký.<br />
            Chúng tôi sẽ gửi mật khẩu mới cho bạn.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="input"
                name="email"
                placeholder="Nhập Email của bạn"
                value={email}
                onChange={handleChangeInput}
              />
              <span className="text-danger">{error}</span>
            </div>

            <div className="form-group">
              <button 
                className="btnLogin" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Gửi yêu cầu"}
              </button>
            </div>

            <div className="form-group">
              <NavLink className="text-light" to="/login">
                Quay lại Đăng nhập
              </NavLink>
            </div>
          </form>

          <NavLink className="close__btn" to="/"></NavLink>
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;