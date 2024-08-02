import { useEffect, useState } from "react";
import "./Shop.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { formatCurrency } from "../../helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../../axios/axiosConfig";

interface Category {
  description: string;
}

interface Categoies {
  product_id: number;
  name: string;
  title: string;
  price: number;
  number: number;
  sale: number;
  img: string;
  category: Category;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
  user_id: number;
}

function Shop() {
  let [productsUudai, setProductsUudai] = useState<Categoies[]>([]);
  let [productsMonmoi, setProductsMonmoi] = useState<Categoies[]>([]);
  let [productsCombo, setProductsCombo] = useState<Categoies[]>([]);

  // Render products theo category
  const renderProducts = () => {
    axios
      .get(`http://localhost:3000/api/v1/products/category?category=uu-dai`)
      .then((res) => setProductsUudai(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/api/v1/products/category?category=mon-moi`)
      .then((res) => setProductsMonmoi(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/api/v1/products/category?category=burger`)
      .then((res) => setProductsCombo(res.data.data))
      .catch((err) => console.log(err));
  };

  console.log(productsMonmoi);

  useEffect(() => {
    renderProducts();
  }, []);

  const [user, setUser] = useState<IUser[]>([]);

  const navigate = useNavigate();

  // Lấy user và lock user nếu đang đăng nhập
  const fetchUser = async () => {
    let userLogin = JSON.parse((localStorage.getItem("user") as any) ?? "");
    let userId = userLogin.users_id;

    await axiosConfig
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data);
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

  const handleContinue = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="titles">
          <b>
            {productsUudai?.length > 0 && productsUudai[0].category.description}
          </b>
        </h1>
        <div className="container ">
          {productsUudai.map((e) => (
            <Card className="card">
              <Link
                to={`/detail/${e.product_id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Card.Img variant="top" src={e.img} />
                <Card.Body className="dodai">
                  <div className="text">
                    <Card.Title>{e.name}</Card.Title>
                  </div>
                  <div className="text1">
                    <Card.Title className="sale-price">
                      {e.sale && formatCurrency(e.price * (1 - e.sale))}
                    </Card.Title>
                    <Card.Title>
                      <s>{formatCurrency(e.price)}</s>
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="title"> {e.title}</div>
              </Link>

              <Link to={`/detail/${e.product_id}`} className="btnbuy">
                <Button
                  onClick={handleContinue}
                  className="btnbuy"
                  variant="danger"
                >
                  CHI TIẾT
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      {/* <div>
        <h1 className="titles">
          <b>
            {productsMonmoi.length > 0 &&
              productsMonmoi[0].category.description}
          </b>
        </h1>
        <div className="container ">
          {productsMonmoi.map((e) => (
            <Card className="card">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                to={`/detail/${e.product_id}`}
              >
                <Card.Img variant="top" src={e.img} />
                <Card.Body className="dodai">
                  <div className="text">
                    <Card.Title>{e.name} </Card.Title>
                  </div>
                  <div className="text1">
                    <Card.Title className="sale-price">
                      {" "}
                      {e.sale && formatCurrency(e.price * (1 - e.sale))}
                    </Card.Title>
                    <Card.Title>
                      <s>{formatCurrency(e.price)}</s>
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="title">{e.title}</div>
              </Link>

              <Link to={`/detail/${e.product_id}`} className="btnbuy">
                <Button
                  onClick={handleContinue}
                  className="btnbuy"
                  variant="danger"
                >
                  CHI TIẾT
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h1 className="titles">
          <b>
            {productsCombo.length > 0 && productsCombo[0].category.description}
          </b>
        </h1>
        <div className="container ">
          {productsCombo.map((e) => (
            <Card className="card">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
                to={`/detail/${e.product_id}`}
              >
                <Card.Img variant="top" src={e.img} />
                <Card.Body className="dodai">
                  <div className="text">
                    <Card.Title>{e.name} </Card.Title>
                  </div>
                  <div className="text1">
                    <Card.Title className="sale-price">
                      {" "}
                      {e.sale && formatCurrency(e.price * (1 - e.sale))}
                    </Card.Title>
                    <Card.Title>
                      <s>{formatCurrency(e.price)}</s>
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="title">{e.title}</div>
              </Link>
              <>
                <Link to={`/detail/${e.product_id}`} className="btnbuy">
                  <Button
                    onClick={handleContinue}
                    className="btnbuy"
                    variant="danger"
                  >
                    CHI TIẾT
                  </Button>
                </Link>
              </>
            </Card>
          ))}
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

export default Shop;
