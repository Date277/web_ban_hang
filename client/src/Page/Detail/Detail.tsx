import { useEffect, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../helpers";
import Swal from "sweetalert2";

interface Product {
  name: string;
  title: string;
  price: number;
  sale: number;
  img: string;
}

function Detail() {
  const [product, setProduct] = useState<Product>({
    name: "",
    title: "",
    price: 0,
    sale: 0,
    img: "",
  });

  let [quantity, setQuantity] = useState(0);
  let { product_id } = useParams();
  let dispatch = useDispatch();

  // Render product
  const renderProduct = () => {
    axios
      .get(`http://localhost:3000/api/v1/products/${product_id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    renderProduct();
  }, []);

  // Tăng số lượng
  const handleDown = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Giảm số lượng
  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user") as any);
    console.log(user);
    if (user) {
      if (quantity === 0) {
        Swal.fire("Lỗi!", "Hãy chọn số lượng sản phẩm.", "error");
        return; // Stop further execution if quantity is 0
      } else {
        let buyProduct = {
          ...product,
          clickNumber: quantity,
        };
        dispatch({ type: "ADD_TO_CART", payload: buyProduct });
        setQuantity(() => 0);
        Swal.fire(
          "Thành Công!",
          "Sản phẩm đã được thêm vào giỏ hàng!",
          "success"
        );
      }
    } else {
      Swal.fire("Xin lỗi!", "Đăng nhập để mua hàng", "warning");
    }
  };

  return (
    <div>
      <Header />
      <div className="detail">
        <div className="detail-image">
          <img src={product.img} />
        </div>
        <div className="combo">
          <h1>{product.name}</h1>
          <h5>
            {product.sale && formatCurrency(product.price * (1 - product.sale))}
            <s style={{ marginLeft: "10px" }}>
              {formatCurrency(product.price)}
            </s>
          </h5>

          <p>{product.title}</p>
          <hr style={{ marginTop: "15px" }} />
          <div className="input-number">
            <div className="payment-item">
              <button value="-" onClick={handleDown} className="btnbut">
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                style={{ width: "40px" }}
                value={quantity + 1}
                type="text"
              />
              <button
                value="+"
                onClick={() => setQuantity(quantity + 1)}
                className="btnbut"
              >
                <i className="fa-solid fa-plus"></i>{" "}
              </button>
            </div>
            <button onClick={handleAddToCart} className="btnbuy">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
