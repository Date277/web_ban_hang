import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../helpers";
// import { useParams } from "react-router-dom";
import "./Cart.css";

interface ICartProps {
  detail: any;
}

function CartItem({ detail }: ICartProps) {
  let [quantity, setQuantity] = useState(0);

  let dispatch = useDispatch();
  useEffect(() => {
    setQuantity(() => detail.clickNumber);
  }, [dispatch]);

  const handleUp = (id: number) => {
    setQuantity(quantity + 1);
    dispatch({
      type: "INCREASE_CART_PRODUCT",
      payload: id,
    });
  };

  const handleDown = (id: number) => {
    if ((quantity = 0)) {
      setQuantity(quantity - 1);
      dispatch({
        type: "DESCREASE_CART_PRODUCT",
        payload: id,
      });
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart") as any) || [];
      const itemIndex = cartItems.findIndex(
        (item: any) => item.product_id === id
      );
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
      dispatch({
        type: "DELETE_CART",
        payload: cartItems,
      });
    }
  };

  // Xóa cart item
  const deleteCart = (id: number) => {
    const cartItems = JSON.parse(localStorage.getItem("cart") as any) || [];

    const itemIndex = cartItems.findIndex(
      (item: any) => item.product_id === id
    );

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    dispatch({
      type: "DELETE_CART",
      payload: cartItems,
    });
  };

  return (
    <div>
      <div className="cart1">
        <img className="image-cart" src={detail.img}></img>
        <div className="cart-combo">
          <p style={{ fontWeight: "700" }}> {detail.name} </p>
          <p className="combo-detail">{detail.title} </p>
          <div className="cart-i">
            <button onClick={() => deleteCart(detail.product_id)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <div className="payment-item">
              <button
                value="-"
                onClick={() => handleDown(detail.product_id)}
                className="btnbut"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input style={{ width: "40px" }} value={quantity} type="text" />
              <button
                value="+"
                onClick={() => handleUp(detail.product_id)}
                className="btnbut"
              >
                <i className="fa-solid fa-plus"></i>{" "}
              </button>
            </div>
          </div>
          <p style={{ fontWeight: "700" }}>
            {formatCurrency(detail.price * (1 - detail.sale))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
