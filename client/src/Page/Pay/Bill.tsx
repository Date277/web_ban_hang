import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Pay.css";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

function Bill() {
  let context: any = useOutletContext();
  console.log(context);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = (e: any) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="carttt">
      <div className="cart">
        <div>
          <b>KFC MANOR HÀ NỘI</b>
        </div>
        <div>Tòa nhà The Manor, Mễ Trì, P.Mỹ Đình 1, TP Hà Nội</div>
      </div>
      <div className="cart">
        <h2>
          <b>THÊM THÔNG TIN CHI TIẾT:</b>
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={context.orderName}
              type="text"
              name="fullName"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={context.email}
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={context.phone}
              type="text"
              placeholder="Phone Number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={context.address}
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={context.province}
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={context.district}
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={context.ward}
              type="text"
              placeholder="Địa chỉ"
            />
          </Form.Group> */}

          <Button
            onClick={handleContinue}
            className="btnbuy"
            variant="danger"
            type="submit"
          >
            Xác nhận đơn hàng
          </Button>
        </Form>
      </div>
      <div className="cart">
        <h1>
          <b>PHƯƠNG THỨC THANH TOÁN</b>
        </h1>
        <div className="pays">
          <div className="pay">
            Thanh toán bằng ATM/Visa/Master và Ví ZaloPay (Miễn phí giao hàng)
          </div>
          <img
            src="https://static.kfcvietnam.com.vn/images/web/ZaloPay_icon.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Bill;
