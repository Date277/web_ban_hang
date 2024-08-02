import { useEffect, useState } from "react";
import "./Cart.css";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../helpers";
import CartItem from "./CartItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
  user_id: number;
}

function Cart() {
  const cart = useSelector((state: any) => state.cartReducer.cart);

  let navigate = useNavigate();

  const handleCheckout = (e: any) => {
    e.preventDefault();
    if (cart.length > 0) {
      navigate("/checkout/step-1");
      window.scrollTo(0, 0);
    } else {
      Swal.fire(
        "Không thành công",
        "Chưa có sản phẩm nào trong giỏ hàng",
        "warning"
      );
    }
  };

  // Đăng xuất nếu user bị khóa
  const [user, setUser] = useState<IUser[]>([]);

  // Lấy user và lock user nếu đang đăng nhập
  const fetchUser = async () => {
    let userLogin = JSON.parse((localStorage.getItem("user") as any) ?? "");
    let userId = userLogin.users_id;
    // console.log(userId);

    await axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);

        if (res.data.status === 1) {
          Swal.fire("User Locked", "Tài khoản của bạn đã bị khóa", "warning");
          localStorage.removeItem("token");
          localStorage.removeItem("cart");
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h1 className="titles">Giỏ hàng của tôi</h1>
        <div className="cart-tongg">
          {cart.length > 0 ? (
            <div className="carttt">
              {cart.map((e: any, i: any) => (
                <CartItem key={i} detail={e} />
              ))}
            </div>
          ) : (
            <p className="  ">Chưa có sản phẩm trong giỏ hàng</p>
          )}
          <div className="cart2">
            <h4> món ăn</h4>
            <h4>{cart.length} món ăn</h4>
            <hr />
            <div className="textline">
              <h3>
                <b>Bạn có Mã giảm giá?</b>
              </h3>
              <div className="input-container">
                <input
                  placeholder="Mã giảm giá"
                  className="input-field"
                  type="text"
                />
                <label htmlFor="input-field" className="input-label">
                  Mã giảm giá
                </label>
                <span className="input-highlight" />
                <button style={{ backgroundColor: "white", color: "black" }}>
                  {" "}
                  Áp Dụng
                </button>
              </div>
              <hr />

              <div className="mony">
                <span>Tổng đơn hàng</span>
                <span>
                  {formatCurrency(
                    cart.reduce((pre: any, cur: any) => {
                      return (pre +=
                        cur.price * (1 - cur.sale) * cur.clickNumber);
                    }, 0)
                  )}
                </span>
              </div>

              <div className="mony1">
                <span>Tổng thanh toán</span>
                <span>
                  {formatCurrency(
                    cart.reduce((pre: any, cur: any) => {
                      return (pre +=
                        cur.price * (1 - cur.sale) * cur.clickNumber);
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <hr />
            <button
              style={{ textDecoration: "none" }}
              onClick={handleCheckout}
              className="mony2"
            >
              <span>Thanh Toán</span>
              <span>
                {formatCurrency(
                  cart.reduce((pre: any, cur: any) => {
                    return (pre +=
                      cur.price * (1 - cur.sale) * cur.clickNumber);
                  }, 0)
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
