import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Lấy cart trên local
  let cart =
    (localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart") as any)) ??
    [];

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const token = JSON.parse(localStorage.getItem("token") as any) || {};
  // console.log(token);

  // Lấy token theo user
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${token.users_id}`)
      .then((res) => {
        setUser(res.data);
        setUserName(res.data.name);
        setLoggedIn(true);
      })
      .catch((err: any) => {
        console.log(err);
        setLoggedIn(false);
      });
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      localStorage.removeItem("user");
      Swal.fire({
        title: "Đăng xuất sẽ xóa giỏ hàng ",
        text: "Bạn đồng ý chứ!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý  !",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "CLEAR_CART" });
          Swal.fire("Đăng xuất!", "Bạn đã đăng xuất.", "success");
          navigate("/login");
        }
      });
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const items = loggedIn
    ? [
        {
          key: "1",
          label: (
            <a
              style={{ cursor: "pointer" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userName}
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Đăng xuất
            </a>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <Link to="/register">
              <a target="_blank" rel="noopener noreferrer">
                <Link to="/login">Đăng kí</Link>
              </a>
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link to="/login">
              <a target="_blank" rel="noopener noreferrer">
                <Link to="/login">Đăng nhập</Link>
              </a>
            </Link>
          ),
        },
      ];

  return (
    <div>
      <div className="header fixed-top">
        <div className="header1 ">
          <div className="kfc col-7">
            <NavLink to="/">
              <img
                src="https://kfcvn-static.cognizantorderserv.com/images/web/kfc-logo.svg?v=5.0"
                alt=""
              />
            </NavLink>
            <h2>
              <NavLink className="black" to="/shop">
                Thực Đơn
              </NavLink>
            </h2>
            <h2>Khuyến Mãi</h2>
            <h2>Dịch vụ</h2>
            <h2>
              <NavLink to="/history" style={{ color: "black" }}>
                Lịch sử mua hàng
              </NavLink>
            </h2>
          </div>
          <div className="login col-3">
            <NavLink to="/cart">
              <div className="a-href">
                {cart.length > 0 ? (
                  cart.reduce(
                    (pre: any, cur: any) => (pre += cur.clickNumber),
                    0
                  )
                ) : (
                  <div>0</div>
                )}
              </div>
            </NavLink>
            <div style={{ marginRight: "30px" }} className="username">
              <div className="username1">
                {/* <Link to="/login"> */}
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <i className="fa-solid fa-user"></i>
                    </Space>
                  </a>
                </Dropdown>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
