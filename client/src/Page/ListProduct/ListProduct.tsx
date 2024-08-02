import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import "./ListProduct.css";

function ListProduct() {
  const handleContinue = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div style={{ marginTop: "7%" }}>
        <h2 className="section">DANH MỤC MÓN ĂN</h2>
        <div className=" mb-3">
          <NavLink to="/shop">
            <div className="listfood">
              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/KHUYEN%20MAI.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Ưu Đãi
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>
              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/MON%20MOI.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Món Mới
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/COMBO%201%20NGUOI.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Combo 1 Người
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/COMBO%20NHOM.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Combo Nhóm
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/GA.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Gà Rán - Gà Quay
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/COM.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Burger - Cơm - Mì Ý
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/MON%20AN%20NHE.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Thức Ăn Nhẹ
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card onClick={handleContinue} className="card11">
                <Card.Img
                  variant="top"
                  src="https://static.kfcvietnam.com.vn/images/category/lg/TRANG%20MIENG.jpg?v=LK8EV4"
                />
                <Card.Body>
                  <Button variant="primary">
                    Thức uống - Tráng Miệng
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </NavLink>
        </div>
        <div className="image">
          <img
            className="anh1"
            src="https://static.kfcvietnam.com.vn/images/content/home/mobileappbanner/lg/banner.jpg?v=LK8EV4"
            alt=""
          />
          <div className="image-overlay">
            <img
              className="anh2"
              src="https://kfcvn-static.cognizantorderserv.com/images/content/home/mobileappbanner/boton-google.png"
              alt=""
            />
            <img
              className="anh2"
              src="https://kfcvn-static.cognizantorderserv.com/images/content/home/mobileappbanner/boton-app-store.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
