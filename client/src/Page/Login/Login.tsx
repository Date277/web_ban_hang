import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

interface IFormError {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<IFormError>({
    email: "",
    password: "",
  });

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  // Lấy giá trị input
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUser((inputUser) => ({
      ...inputUser,
      [name]: value,
    }));
  };
  console.log(loginUser);

  // Sự kiện đăng nhập
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors: IFormError = {
      email: "",
      password: "",
    };

    if (!loginUser.email) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(loginUser.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!loginUser.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (loginUser.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setFormErrors(errors);
    console.log(Object.keys(errors).length);

    if (Object.keys(errors).length !== 0) {
      axios
        .post(`http://localhost:3000/api/v1/auth/signin`, loginUser)
        .then((res) => {
          console.log(res.data);

          if (res.data.status === 200) {
            if (res.data.rows.email === "admin@gmail.com") {
              Swal.fire("Good job!", "Đăng nhập Admin thành công", "success");
              navigate("/admin");
            } else {
              if (res.data.rows.status === "1") {
                Swal.fire(
                  "User Locked",
                  "Tài khoản của bạn đã bị khóa",
                  "warning"
                );
              } else if (res.data.rows.status === "0") {
                Swal.fire("Good job!", "Đăng nhập thành công", "success");
                localStorage.setItem(
                  "token",
                  JSON.stringify(res.data.info)
                );
                localStorage.setItem(
                  "user",
                  JSON.stringify(res.data.rows)
                );
                navigate("/");
              }
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Tài khoản hoặc mật khẩu chưa trùng khớp",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập đầy đủ thông tin",
          });
        });
    }
  };
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
            <h2>Hệ Thống Nhà Hàng</h2>
          </div>
          <div className="login col-3">
            <NavLink to="/cart">
              <div className="a-href">0</div>
            </NavLink>
            <div className="username">
              <Link to="/login" className="username2">
                <div className="username">
                  <i className="fa-solid fa-user"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="img-login1">
        <div>
          <img
            className="anh"
            src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=gOXpk3"
            alt=""
          />
        </div>
        <div className="form-login">
          <h2>ĐĂNG NHẬP</h2>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={loginUser.email}
                  onChange={handleChangeInput}
                  placeholder="Enter email"
                />
                {formErrors.email && (
                  <span className="error-message" style={{ color: "red" }}>
                    {formErrors.email}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={loginUser.password}
                  onChange={handleChangeInput}
                  placeholder="Password"
                />
                {formErrors.password && (
                  <span className="error-message" style={{ color: "red" }}>
                    {formErrors.password}
                  </span>
                )}
              </Form.Group>

              <Button className="btn-login" variant="primary" type="submit">
                Đăng nhập
              </Button>
            </Form>
          </div>
          <div className="buttonn">
            <h4 className="btn-h4">
              <b>Hoặc tiếp tục với</b>
            </h4>
            <button className="btn-8">
              <span>
                <i className="fa-brands fa-facebook-f"></i> Đăng nhập bằng
                facebook
              </span>
            </button>
            <button className="btn-9">
              <span>
                <i className="fa-brands fa-apple"></i> Đăng nhập bằng apple
              </span>
            </button>
            <button className="btn-10">
              <span>
                <i className="fa-brands fa-google"></i> Đăng nhập bằng google
              </span>
            </button>
            <p className="add">
              Bạn đã có tài khoản?
              <NavLink to="/register">
                <b>
                  <u>Đăng kí</u>
                </b>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
