import { useEffect, useState } from "react";
import "./Pay.css";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useDispatch } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { formatCurrency } from "../../helpers";
import axios from "axios";

function CheckOut() {
  let cart = JSON.parse(localStorage.getItem("cart") as any);

  const [searchParams] = useSearchParams();
  let queryString = searchParams.get("id");
  // console.log(queryString);

  const [order, setOrder] = useState({});

  const dispatch = useDispatch();

  // Lấy order của user
  const renderOrder = async () => {
    await axios
      .get(`http://localhost:3000/api/v1/orders/${queryString}`)
      .then((res) => {
        let data = res.data.rowOrders;
        // console.log(res.data.rowOrders[0].order);

        let fetchOrder = {
          orderId: data[0].order.order_id,
          orderName: data[0].order.order_name,
          email: data[0].order.email,
          phone: data[0].order.phone,
          address: data[0].order.address,
          ward: data[0].order.ward,
          district: data[0].order.district,
          province: data[0].order.province,
          products: [],
        } as any;
        // console.log(fetchOrder);

        data.forEach((e: any) => {
          fetchOrder.products.push({
            productId: e.product_id,
            number: e.number,
            stock: e.stock,
            price: e.price,
            sale: e.sale,
          });
        });
        console.log(fetchOrder);

        setOrder({ ...fetchOrder });
        dispatch({
          type: "ORDER_TO_CART",
          payload: fetchOrder.products,
        });
      })
      .catch((err) => console.log(err));
  };

  console.log(order);

  useEffect(() => {
    if (queryString) {
      renderOrder();
    }
  }, [queryString]);

  return (
    <div>
      <Header />
      <div>
        <div className="cart-tongg">
          <Outlet context={order} />
          <div className="cart1 ">
            <div className="cart22 centered">
              <h4>Tóm tắt đơn hàng</h4>
              <hr />
              <div className="textline">
                {cart.length > 0 &&
                  cart.map((e: any) => (
                    <div style={{ margin: "5px" }}>
                      <b>
                        {e.clickNumber} x {e.name}
                      </b>
                    </div>
                  ))}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckOut;
