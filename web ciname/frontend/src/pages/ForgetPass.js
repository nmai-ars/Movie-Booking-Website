import React from "react";
import ForgetPassForm from "../components/ForgetPass/ForgetPass";
import { userLogin } from "../config/setting";

const ForgetPass = (props) => {
  // Kiểm tra: Nếu đã đăng nhập (có localStorage) thì không cho vào trang Quên mật khẩu
  // Đá về trang chủ "/"
  if (localStorage.getItem(userLogin)) {
    props.history.push("/");
  }

  // Nếu chưa đăng nhập thì hiện Form Quên mật khẩu
  // Truyền props xuống dưới tên là "navigator" để component con dùng history.push
  return <ForgetPassForm navigator={props} />;
};

export default ForgetPass;