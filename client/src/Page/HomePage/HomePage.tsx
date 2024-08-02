import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";
import ListProduct from "../ListProduct/ListProduct";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: number;
  status: number;
  user_id: number;
}

function HomePage() {
  const [user, setUser] = useState<IUser[]>([]);

  const navigate = useNavigate();

  // Lấy user và lock user nếu đang đăng nhập
  const fetchUser = async () => {
    let userLogin = JSON.parse((localStorage.getItem("user") as any) ?? "");
    let userId = userLogin.users_id;

    await axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        if (res.data.status === "1") {
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
      <div className="carousel">
        <Carousel interval={2000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="	https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Homde-phase2.webp?v=gXdqeg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/DuaSoRi.webp?v=gXdqeg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/tnag.webp?v=gXdqeg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <ListProduct />
      <Footer />
    </div>
  );
}

export default HomePage;
