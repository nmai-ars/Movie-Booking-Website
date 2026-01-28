import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Register/Register.scss";
import { qlyNguoiDung } from "../../services/QuanLyNguoiDungServices";
import { groupID } from "../../config/setting";
import swal from "sweetalert";
import axios from "axios"; // 1. Đừng quên import axios

export default class Register extends Component {
  state = {
    values: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "", // Giữ nguyên soDT để khớp với Backend hiện tại của bạn
      maLoaiNguoiDung: "KhachHang",
      maNhom: groupID,
    },
    errors: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
    },
  };

  // 2. Hàm gửi mail (Đã chỉnh Port 8080 theo server.js của bạn)
  sendWelcomeEmail = (email, hoTen) => {
    axios({
      method: "POST",
      url: "http://localhost:88/api/send-welcome-email",
      data: {
        toEmail: email,
        userName: hoTen,
      },
    })
      .then((res) => {
        console.log("Mail đã được gửi thành công!");
      })
      .catch((err) => {
        console.log("Lỗi gửi mail:", err);
      });
  };

  handleChangeInput = (event) => {
    var { value, name } = event.target;
    let newValues = { ...this.state.values, [name]: value };
    let newErrors = {
      ...this.state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };

    if (name === "email") {
      let regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (value.match(regexEmail)) {
        newErrors.email = "";
      } else {
        newErrors.email = "Email không hợp lệ";
      }
    }
    
    // Validate số điện thoại
    if (name === "soDT") {
        let regexNumber = /^[0-9]+$/;
        if (value.match(regexNumber)) {
            newErrors.soDT = "";
        } else if (value !== "") {
            newErrors.soDT = "Số điện thoại chỉ được chứa số";
        }
    }

    this.setState({ values: newValues, errors: newErrors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let { values, errors } = this.state;
    for (let key in values) {
      if (values[key] === "") valid = false;
    }
    for (let key in errors) {
      if (errors[key] !== "") valid = false;
    }
    if (!valid) {
      swal({ title: "Thông tin không hợp lệ", icon: "error", button: "OK" });
      return;
    }

    let { navigator } = this.props;
    
    // Gọi API Đăng ký
    qlyNguoiDung
      .dangKy(values)
      .then((res) => {
        // 3. GỌI HÀM GỬI MAIL KHI ĐĂNG KÝ THÀNH CÔNG
        this.sendWelcomeEmail(values.email, values.hoTen);

        swal({
          title: "Đăng ký thành công",
          text: "Chào mừng bạn đến với NM Movie!",
          icon: "success",
          button: "OK",
        });
        navigator.history.push("/login");
      })
      .catch((err) => {
        // Xử lý hiển thị lỗi từ server (để tránh hiện [object Object])
        console.log("Lỗi đăng ký:", err.response);
        let message = "Đăng ký thất bại!";
        
        if (err.response && err.response.data) {
             if (typeof err.response.data === 'string') {
                 message = err.response.data;
             } else if (err.response.data.message) {
                 message = err.response.data.message; // Lấy message từ JSON backend trả về
             }
        }

        swal({
          title: message,
          text: "Vui lòng kiểm tra lại thông tin (Tài khoản/Email có thể đã tồn tại)",
          icon: "warning",
          button: "OK",
        });
      });
  };

  render() {
    return (
      <section className="backgroundBody">
        <div className="container-fluid">
          <div className="registerForm">
            <div className="img__logo">
              <NavLink className="img__link" to="/">
                <img
                  src="https://i0.wp.com/thegamehaus.com/wp-content/uploads/2020/05/Volibear_Emote.png?resize=256%2C256&ssl=1"
                  alt="logo"
                />
                <span className="text-logo">NM CINEMA</span>
              </NavLink>
            </div>
            <div className="formSocial">
              <form className="formRegister">
                <div className="form-group">
                  <input
                    className="input"
                    name="taiKhoan"
                    placeholder="Tên tài khoản"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.taiKhoan}</span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="matKhau"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.matKhau}</span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="hoTen"
                    type="text"
                    placeholder="Họ tên"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.hoTen}</span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
                <div className="form-group">
                  <input
                    className="input"
                    name="soDT"
                    type="text"
                    placeholder="Số điện thoại"
                    onChange={this.handleChangeInput}
                  />
                  <span className="text-danger">{this.state.errors.soDT}</span>
                </div>
                <div className="form-group">
                  <button
                    className="btnLogin"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Đăng ký
                  </button>
                </div>
                <div className="form-group">
                  <NavLink className="text-light" to="/login">
                    Bạn đã có tài khoản?
                  </NavLink>
                </div>
              </form>
            </div>
            <NavLink className="close__btn" to="/"></NavLink>
          </div>
        </div>
      </section>
    );
  }
}