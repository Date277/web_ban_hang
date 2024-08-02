import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { formatCurrency } from "../../helpers";

interface ICategory {
  category_id: number;
  description: string;
  name: string;
}

function EditProduct() {
  const [isUserPageVisible, setUserPageVisible] = useState(true);
  const [isProductPageVisible, setProductPageVisible] = useState(false);
  const [isHistoryPageVisible, setHistoryPageVisible] = useState(false);

  const navigate = useNavigate();

  const showUserPage = () => {
    setUserPageVisible(true);
    setProductPageVisible(false);
    setHistoryPageVisible(false);
  };

  const showProductPage = () => {
    setUserPageVisible(false);
    setProductPageVisible(true);
    setHistoryPageVisible(false);
  };

  const showHistoryPage = () => {
    setUserPageVisible(false);
    setProductPageVisible(false);
    setHistoryPageVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const [productId, setProductId] = useState({}) as any;
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");

  const [count, setCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:3000/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setProductId(res.data.product_id);
        setName(res.data.name);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setSale(res.data.sale);
        setStock(res.data.number);
        setCategory(res.data.category.category_id);
        setImg(res.data.img);
      })
      .catch((err) => console.log(err));
  };
  // console.log(product);

  const fetchCategory = () => {
    axios
      .get(`http://localhost:3000/api/v1/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (count > 0) {
      setIsEdit(true);
    }
  }, [name, title, price, sale, stock, category, img]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    let update = {
      id: productId,
      name,
      title,
      price,
      sale,
      stock,
      category_id: category,
      img,
    };
    console.log(update);

    axios
      .put(
        `http://localhost:3000/api/v1/products/${productId}?categoryId=${category}`,
        update
      )
      .then((res) => {
        Swal.fire(res.data.status, res.data.message, "success");
        setCount(0);
        setIsEdit(false);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container2">
        <div className="featare ">
          <p onClick={showUserPage}>
            <i className="fa-solid fa-user"></i>Quản lý user
          </p>
          <p onClick={showProductPage}>
            <i className="fa-solid fa-mobile-screen-button"></i>Quản lý sản phẩm
          </p>
          <p onClick={showHistoryPage}>
            <i className="fa-solid fa-truck"></i>Lịch sử mua hàng
          </p>
        </div>
        <div className="display-group">
          <div className="headerr">
            <div className="kfc">
              <img
                src="https://kfcvn-static.cognizantorderserv.com/images/web/kfc-logo.svg?v=5.0"
                alt=""
              />
            </div>
            <div className="icon-avt">
              <div className="avt1">
                <div className="avt">
                  <i className="fa-solid fa-user"></i>
                  <p>Admin</p>
                </div>
                <div>
                  <Button
                    className="logout"
                    onClick={handleLogout}
                    variant="danger"
                  >
                    <i className="btnnn fa-solid fa-right-from-bracket"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="display">
            <div className="ProductDetail" style={{ width: "1100px" }}>
              <div className="col py-3">
                <div>
                  <div className="ProductDetail" style={{ width: "1100px" }}>
                    <div className="col py-3">
                      <div className="">
                        <div className="row">
                          <h5>Product OverView</h5>
                        </div>
                        <div className="row mb-4"></div>
                      </div>

                      <form>
                        <div className="col-6">
                          <div className="mb-3">
                            <input
                              value={productId}
                              onChange={(e) => {
                                setProductId(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="productId"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="mb-3">
                            <input
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="productName"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="mb-3">
                            <input
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="tilte"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="mb-3">
                            <input
                              value={price}
                              onChange={(e) => {
                                setPrice(formatCurrency(e.target.value));
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="price"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="mb-3">
                            <input
                              value={stock}
                              onChange={(e) => {
                                setStock(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="stock"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="mb-3">
                            <input
                              value={sale}
                              onChange={(e) => {
                                setSale(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="sale"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-3">
                            <select
                              onChange={(e) => {
                                setCategory(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              style={{
                                padding:
                                  "0.375rem 2.25rem 0.375rem 0.75rem!important",
                              }}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option>Filter By Categoies</option>
                              {categories.length > 0 &&
                                categories?.map((e: any, i: number) => (
                                  <option
                                    key={i}
                                    value={e.category_id}
                                    selected={category === e.category_id}
                                  >
                                    {e.description}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          {" "}
                          <div className="mb-3">
                            <input
                              value={img}
                              onChange={(e) => {
                                setImg(e.target.value);
                                setCount((prev) => (prev = prev + 1));
                              }}
                              type="text"
                              className="form-control"
                              id="img"
                            />
                          </div>
                        </div>
                      </form>
                      {!isEdit ? (
                        <button
                          onClick={handleUpdate}
                          disabled
                          type="submit"
                          className="btn me-3"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={handleUpdate}
                          type="submit"
                          className="btn me-3"
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Save
                        </button>
                      )}
                      <Link to="/admin" className="btn btn-danger">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
