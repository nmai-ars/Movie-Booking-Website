import React, { Fragment, useEffect, useState } from "react";
import "./User.scss";
import ModalUser from "../ModalUser/ModalUser";
import EditModal from "../EditUserModal/EditUserModal"; // Import modal sửa
import { qLyAdminService } from "../../../services/QuanLyAdminService";
import swal from "sweetalert";

export default function User() {
  let [listNguoiDung, setListNguoiDung] = useState([]);
  let [userEdit, setUserEdit] = useState(null); // State lưu người dùng đang được sửa
  let [searchTerm, setSearchTerm] = useState("");
  let [danhSachHienThi, setDanhSachHienThi] = useState([]);

  // Hàm lấy danh sách từ API
  const getListUser = () => {
    qLyAdminService.layDanhSachNguoiDung()
      .then((res) => {
        if (res && res.data) {
          setListNguoiDung(res.data);
          setDanhSachHienThi(res.data);
        }
      })
      .catch((err) => {
        console.log("Lỗi lấy danh sách:", err);
      });
  };

  useEffect(() => {
    getListUser();
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    if (listNguoiDung.length > 0) {
      let results = listNguoiDung.filter((u) => 
        u.taiKhoan.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDanhSachHienThi(results);
    }
  }, [searchTerm, listNguoiDung]);

  const xoaNguoiDung = (taiKhoan) => {
    qLyAdminService.xoaNguoiDung(taiKhoan)
      .then(() => {
        swal("Đã xóa!", "Xóa thành công", "success");
        getListUser();
      })
      .catch((err) => {
        swal("Lỗi", err.response?.data || "Không xóa được", "error");
      });
  };

  const renderTable = () => {
    return danhSachHienThi.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.taiKhoan}</td>
          <td>{user.hoTen}</td>
          <td>{user.email}</td>
          <td>{user.soDt}</td>
          <td>{user.maLoaiNguoiDung}</td>
          <td>
            {/* Nút Sửa: Click vào sẽ set state userEdit và mở Modal */}
            <button
              className="btn btn-primary mr-2"
              data-toggle="modal"
              data-target="#ModalEditUser" // Trỏ tới ID cố định
              onClick={() => setUserEdit(user)}
            >
              <i className="fa fa-edit"></i>
            </button>

            {/* Nút Xóa */}
            <button
              className="btn btn-danger"
              onClick={() => {
                swal({
                  title: "Xóa người dùng này?",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) xoaNguoiDung(user.taiKhoan);
                });
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <div className="container-fluid mt-3">
        <h3>Quản lý người dùng</h3>
        <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-success" data-toggle="modal" data-target="#UserModal">
                Thêm người dùng
            </button>
            <input 
                className="form-control w-50" 
                placeholder="Tìm kiếm tài khoản..." 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>STT</th>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số ĐT</th>
              <th>Loại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {renderTable()}
          </tbody>
        </table>
      </div>

      {/* --- ĐẶT MODAL Ở NGOÀI VÒNG LẶP (CHỈ 1 CÁI DUY NHẤT) --- */}
      <EditModal user={userEdit} />
      <ModalUser />
    </Fragment>
  );
}