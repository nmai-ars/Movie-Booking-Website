import React, { Component, Fragment } from "react";
// import "./EditUserModal.scss";
import { groupID } from "../../../config/setting";
import { qLyAdminService } from "../../../services/QuanLyAdminService";
import swal from "sweetalert";

export default class EditUserModal extends Component {
  state = {
    values: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: groupID,
    },
    errors: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
  };

  // Dùng componentDidUpdate để cập nhật form khi bấm chọn người dùng khác
  componentDidUpdate(prevProps) {
    // Kiểm tra xem người dùng được chọn có thay đổi không
    if (this.props.user !== prevProps.user && this.props.user) {
      let { user } = this.props;
      this.setState({
        values: {
          hoTen: user.hoTen || "",
          taiKhoan: user.taiKhoan || "",
          matKhau: user.matKhau || "",
          email: user.email || "",
          soDT: user.soDt || "", // API thường trả về soDt
          maLoaiNguoiDung: user.maLoaiNguoiDung || "KhachHang",
          maNhom: groupID,
        },
        errors: {
          hoTen: "",
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDT: "",
          maLoaiNguoiDung: "",
        },
      });
    }
  }

  handleChangeInput = (event) => {
    var { value, name } = event.target;
    let newValues = { ...this.state.values, [name]: value };
    let newErrors = {
      ...this.state.errors,
      [name]: value === "" ? "Không được bỏ trống!" : "",
    };

    if (name === "email") {
      let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      newErrors.email = regexEmail.test(value) ? "" : "Email không hợp lệ";
    }
    this.setState({ values: newValues, errors: newErrors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let { values, errors } = this.state;
    
    // Kiểm tra rỗng và lỗi
    for (let key in values) { if (values[key] === "") valid = false; }
    for (let key in errors) { if (errors[key] !== "") valid = false; }

    if (!valid) {
      swal({
        title: "Dữ liệu không hợp lệ",
        text: "Vui lòng kiểm tra lại các trường thông tin",
        icon: "error",
        button: "OK",
      });
      return;
    }

    qLyAdminService
      .capNhatThongTinNguoiDung(values)
      .then((res) => {
        swal({
          title: "Sửa thành công",
          icon: "success",
          button: "OK",
        }).then(() => {
             // Reload trang sau khi bấm OK
             window.location.reload();
        });
      })
      .catch((err) => {
        // Fix lỗi màn hình trắng khi API lỗi
        let errorMsg = "Lỗi cập nhật!";
        if(err && err.response && err.response.data) {
            errorMsg = err.response.data;
        }
        swal({
          title: errorMsg,
          text: "Vui lòng thử lại",
          icon: "warning",
          button: "OK",
        });
      });
  };

  renderModal = () => {
    // Chỉ render nếu có user để tránh lỗi
    if(!this.props.user) return null;

    return (
      <div
        className="modal fade"
        id="ModalEditUser" // ID CỐ ĐỊNH DUY NHẤT
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sửa thông tin người dùng</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Tài khoản</label>
                  <input
                    className="form-control"
                    name="taiKhoan"
                    value={this.state.values.taiKhoan}
                    disabled
                    style={{ backgroundColor: "#e9ecef" }}
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    className="form-control"
                    name="matKhau"
                    value={this.state.values.matKhau}
                    onChange={this.handleChangeInput}
                  />
                  <small className="text-danger">{this.state.errors.matKhau}</small>
                </div>
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    className="form-control"
                    name="hoTen"
                    value={this.state.values.hoTen}
                    onChange={this.handleChangeInput}
                  />
                  <small className="text-danger">{this.state.errors.hoTen}</small>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={this.state.values.email}
                    onChange={this.handleChangeInput}
                  />
                  <small className="text-danger">{this.state.errors.email}</small>
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    className="form-control"
                    name="soDT"
                    value={this.state.values.soDT}
                    onChange={this.handleChangeInput}
                  />
                  <small className="text-danger">{this.state.errors.soDT}</small>
                </div>
                <div className="form-group">
                  <label>Loại người dùng</label>
                  <select
                    className="form-control"
                    name="maLoaiNguoiDung"
                    value={this.state.values.maLoaiNguoiDung}
                    onChange={this.handleChangeInput}
                  >
                    <option value="KhachHang">Khách Hàng</option>
                    <option value="QuanTri">Quản Trị</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Cập nhật</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <Fragment>{this.renderModal()}</Fragment>;
  }
}