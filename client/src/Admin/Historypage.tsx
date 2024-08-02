import { useEffect, useState } from "react";
import "./ProductAdmin.css";
import axios from "axios";
import PaginationHistory from "./PaginationHistory";
import { formatCurrency } from "../helpers/index";
import Modal from "react-bootstrap/Modal";

interface IOrders {
  order_id: number;
  user_id: number;
  name: string;
  email: string;
  phone: number;
  nameProduct: string;
  quantity: number;
  price: number;
}

interface IListOrder {
  order_id: number;
  user_id: number;
  order_name: string;
  phone: number;
  address: string;
  status: string;
}

function Historypage() {
  // show chi tiết order
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("user") as any);
  // const userId = user[0].users_id;

  const [orders, setOrders] = useState<IOrders[]>([]);
  const [userOrder, setUserOrder] = useState([]);

  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(10);

  // Lấy toàn bộ order user và phân trang
  const fetchOrder = async (pageIndex: number, pageNumber: number) => {
    await axios
      .get(
        `http://localhost:3000/api/v1/orders/pagination?page_index=${pageIndex}&page_number=${pageNumber}`
      )
      .then((res) => {
        console.log(res.data.data);
        
        setOrders(res.data.data);
        setTotal(res.data.length);
      })
      .catch((err) => console.log(err));
  };
  // console.log(total);

  useEffect(() => {
    fetchOrder(1, 5);
  }, [total]);

  // Thay đổi trạng thái giao hàng
  const changeStatus = async (order_id: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/orders/${order_id}`, {
        status: newStatus,
      });

      const updatedListOrder = orders.map((order) =>
        order.order_id === order_id ? { ...order, status: newStatus } : order
      );
      setOrders(updatedListOrder);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
    }
  };

  // Xem chi tiết order
  const handleView = async (e: any) => {
    await axios
      .get(`http://localhost:3000/api/v1/order-details/${e}`)
      .then((res) => {
        setUserOrder(res.data.rows);
      })
      .catch((err) => console.log(err));
  };
  // console.log(userOrder);

  const quantityByProductId: any = {};

  userOrder.forEach((product: any) => {
    const productId = product.product.product_id;
    const quantity = Number(product.number);
    // console.log(quantity);

    if (quantityByProductId[productId]) {
      quantityByProductId[productId] += quantity;
    } else {
      quantityByProductId[productId] = quantity;
    }
  });

  const aggregatedOrder = Object.keys(quantityByProductId).map(
    (productId: any) => {
      const matchingProduct: any = userOrder.find(
        (item: any) =>
          // console.log(item)

          item.product.product_id === Number(productId)
      );
      // console.log(matchingProduct);

      return {
        product_id: parseInt(productId),
        name: matchingProduct.product.name,
        price: matchingProduct.product.price,
        sale: matchingProduct.product.sale,
        img: matchingProduct.product.img,
        quantity: quantityByProductId[productId],
      };
    }
  );

  // Xóa order
  const handleDelete = async (id: number) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/api/v1/orders/${id}`)
      .then((res) => {
        setOrders((prevUsers) =>
          prevUsers.filter((order: any) => order.order_id !== id)
        );
        setTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="row mb-3">
        <h1>History Detail</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              {/* <th scope="col">User ID</th> */}
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col"></th>
              <th scope="col" colSpan={2}>
                Action
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((e: any, i) => (
              <tr key={i}>
                <td>{e.order_id}</td>
                {/* <td>{e.user_id}</td> */}
                <td>{e.order_name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.address}</td>
                <td onClick={() => handleView(e.order_id)}>
                  <button className="btn-detail" onClick={handleShow}>
                    Chi tiết
                  </button>
                </td>
                <td>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(newstatus: any) =>
                      changeStatus(e.order_id, newstatus.target.value)
                    }
                  >
                    {e.status === "Chờ xác nhận" ? (
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                    ) : (
                      <option disabled value="Chờ xác nhận">
                        Chờ xác nhận
                      </option>
                    )}

                    {e.status === "Xác nhận" ? (
                      <option value="Xác nhận">Xác nhận</option>
                    ) : (
                      <option
                        disabled={e.status !== "Chờ xác nhận"}
                        value="Xác nhận"
                      >
                        Xác nhận
                      </option>
                    )}

                    {e.status === "Đang giao hàng" ||
                    e.status === "Xác nhận" ? (
                      <option value="Đang giao hàng">Đang giao hàng</option>
                    ) : (
                      <option
                        disabled={e.status !== "Xác nhận"}
                        value="Đang giao hàng"
                      >
                        Đang giao hàng
                      </option>
                    )}
                    {e.status === "Đã giao hàng" ||
                    e.status === "Đang giao hàng" ? (
                      <option value="Đã giao hàng">Đã giao hàng</option>
                    ) : (
                      <option disabled={e} value="Đã giao hàng">
                        Đã giao hàng
                      </option>
                    )}
                  </select>
                </td>
                <td>
                  <button
                    style={{ width: "139px" }}
                    className="btn btn-success"
                  >
                    {e.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(e.order_id)}
                    style={{ width: "128px" }}
                    className="btn btn-danger"
                  >
                    Hủy đơn hàng
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationHistory
          total={total}
          pageNumber={pageNumber}
          fetchOrder={fetchOrder}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết mua hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart1">
            <div className="cart-combo1">
              <table className="table">
                <thead>
                  <tr className="table-light">
                    <th scope="col">Name</th>
                    <th scope="col" rowSpan={3}>
                      Price
                    </th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregatedOrder.map((product, i) => (
                    <tr key={i}>
                      <td>{product.name}</td>
                      <td>
                        {formatCurrency(product.price * (1 - product.sale))}
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        <img
                          style={{ width: "70px", height: "70px" }}
                          src={product.img}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>

                    <td rowSpan={2}>
                      {formatCurrency(
                        aggregatedOrder.reduce(
                          (total, product) =>
                            total +
                            product.price *
                              (1 - product.sale) *
                              product.quantity,
                          0
                        )
                      )}
                    </td>
                    <td>
                      {aggregatedOrder.reduce(
                        (total, product) => total + product.quantity,
                        0
                      )}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Historypage;
