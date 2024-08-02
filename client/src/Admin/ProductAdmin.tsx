import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./ProductAdmin.css";
import Pagination from "./Pagination";
import { formatCurrency } from "../helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Product {
  name: string;
  category_id: number;
  title: string;
  price: number;
  number: number;
  sale: number;
  img: string;
}

function ProductAdmin() {
  // Boostrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Tạo state để lưu tất cả user
  const [products, setProducts] = useState([]);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  // Lấy toàn bộ product
  const fetchProducts = async () => {
    await axios
      .get(
        "http://localhost:3000/api/v1/products/pagination?page_index=1&page_number=3"
      )
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  // Chia category theo selected
  const fetchCategories = async () => {
    await axios
      .get("http://localhost:3000/api/v1/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  // console.log(categories);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Chuyển trang
  const handleChangePage = async (pageIndex: any) => {
    await axios
      .get(
        `http://localhost:3000/api/v1/products/pagination?${
          categoryFilter ? `category=${categoryFilter}&` : ""
        }&page_index=${pageIndex}&page_number=3`
      )
      .then((res) => {
        setProducts(res.data.data);
        setCurrentPage(pageIndex);
      })
      .catch((err) => console.log(err));
  };

  const handleFilterByCategory = (e: any) => {
    setCategoryFilter(e.target.value);
  };

  // Lấy toàn bộ product theo category
  const fetchProductsByCategory = async (filter: any) => {
    console.log(filter);
    if (filter) {
      await axios
        .get(
          `http://localhost:3000/api/v1/products/category?category=${filter}&page_index=1&page_number=3`
        )
        .then((res) => {
          setProducts(res.data.data);
          setTotal(res.data.length);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (categoryFilter) {
      fetchProductsByCategory(categoryFilter);
    } else {
      fetchProducts();
    }
  }, [categoryFilter]);

  // ADD
  const [newProduct, setNewProduct] = useState({
    name: "",
    category_id: categories,
    title: "",
    price: "",
    number: "",
    sale: "",
    img: "",
  });
  // console.log(newProduct);

  // Lấy giá trị input
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCategory: any = categories.find(
        (id: any) => id.category_id == value
      );
      const category_id: any = selectedCategory
        ? selectedCategory?.category_id
        : null;
      setNewProduct((input) => ({
        ...input,
        category_id,
      }));
    } else {
      setNewProduct((input) => ({
        ...input,
        [name]: value,
      }));
    }
  };

  // SK click add
  const handleAddProduct = () => {
    console.log(newProduct);
    axios
      .post(
        `http://localhost:3000/api/v1/products?categoryId=${newProduct.category_id}`,
        newProduct
      )
      .then(() => {
        fetchProducts();
        setShow(false);
        Swal.fire("Good job!", "Cập nhật sản phẩm thành công", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete
  const handleDelete = (id: any) => {
    axios
      .delete(`http://localhost:3000/api/v1/products/${id}`)
      .then(() => {
        setProducts((prevUsers) =>
          prevUsers.filter((product: any) => product.product_id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update
  const navigate = useNavigate();
  const updateProduct = (id: any) => {
    navigate("/admin/edit/" + id);
  };

  return (
    <div>
      {/* Add */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <Form>
            <h1 className="titleee">Create Product</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                onChange={handleInput}
                name="name"
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <select
                onChange={handleInput}
                name="category"
                style={{
                  padding: "0.375rem 2.25rem 0.375rem 0.75rem!important",
                }}
                className="form-select"
                aria-label="Default select example"
              >
                <option>Category</option>
                {categories.length > 0 &&
                  categories.map((e: any, i) => (
                    <option
                      key={i}
                      value={e.category_id}
                      // selected={category === e.category  _id}
                    >
                      {e.description}
                    </option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInput}
                name="title"
                type="text"
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInput}
                name="price"
                type="text"
                placeholder="Price(VNĐ)"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInput}
                name="number"
                type="text"
                placeholder="Stock"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInput}
                name="sale"
                type="text"
                placeholder="Sale"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                onChange={handleInput}
                name="img"
                type="text"
                placeholder="Image"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-success" onClick={handleAddProduct}>
            Create
          </button>
        </Modal.Footer>
      </Modal>
      <div className="row mb-3">
        <h1 className="titleee"> Admin Product</h1>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div className="btnnn">
            <button className="btn btn-success" onClick={handleShow}>
              Add Product
            </button>
          </div>
          <div className="col-3">
            <select
              style={{ width: "200px" }}
              onChange={handleFilterByCategory}
              className="form-select"
              aria-label="Default select example"
            >
              <option>Filter By Categoies</option>
              {categories.length > 0 &&
                categories.map((e: any, i) => (
                  <option key={i} value={e.name}>
                    {e.description}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category</th>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Sale</th>
              <th scope="col">Image</th>
              <th style={{ width: "178px" }} scope="col" colSpan={3}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((e: any, index) => (
              <tr key={index}>
                <td scope="row">{e.product_id}</td>
                <td>{e.category.description}</td>
                <td>{e.name}</td>
                <td>{e.title}</td>
                <td>{formatCurrency(e.price)}</td>
                <td>{e.sale * 100}%</td>
                <td>
                  <img
                    src={e.img}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateProduct(e.product_id)}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(e.product_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Pagination
            total={total}
            pageNumber={3}
            handleChangePage={handleChangePage}
            currentPage={currentPage}
          />
        </table>
      </div>
    </div>
  );
}

export default ProductAdmin;
