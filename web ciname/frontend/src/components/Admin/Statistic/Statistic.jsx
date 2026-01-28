import React, { useEffect, useState } from "react";
import "./Statistic.scss";
import { qLyPhimService } from "../../../services/QuanLyPhimServices";

export default function Statistic() {
  let [lstHeThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    qLyPhimService
      .layHeThongRap()
      .then((result) => {
        // Kiểm tra xem dữ liệu trả về có đúng là mảng không trước khi set
        if (Array.isArray(result.data)) {
           setHeThongRap(result.data);
        } else {
           console.log("Dữ liệu API không đúng định dạng:", result.data);
        }
      })
      .catch((err) => {
        // SỬA LỖI: Kiểm tra tồn tại response trước khi log
        if (err.response && err.response.data) {
           console.log(err.response.data);
        } else {
           console.log(err);
        }
      });
  }, []);

  const renderRap = () => {
    // Thêm dấu ? để không bị lỗi nếu lstHeThongRap bị null/undefined
    return lstHeThongRap?.map((rap, index) => {
      return (
        <dd className={`percentage percentage-${index + 50}`} key={index}>
          <span className="text">
            {rap.tenHeThongRap}
            {/* Thêm check tồn tại logo */}
            {rap.logo && (
                <img
                  src={rap.logo}
                  style={{ width: 40, height: 40 }}
                  alt={rap.tenHeThongRap}
                />
            )}
          </span>
        </dd>
      );
    });
  };

  return (
    <dl>
      <dt>Rạp phim được đặt vé nhiều nhất 2025</dt>
      {renderRap()}
    </dl>
  );
}