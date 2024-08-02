import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Page/Register/Register";
import Login from "./Page/Login/Login";
import HomePage from "./Page/HomePage/HomePage";
import Shop from "./Page/Shop/Shop";
import Detail from "./Page/Detail/Detail";
import Cart from "./Page/Carts/Cart";
import CheckOut from "./Page/Pay/CheckOut";
import Pay from "./Page/Pay/Pay";
import Bill from "./Page/Pay/Bill";
import History from "./Page/History/History";
import PageAdmin from "./Admin/PageHome/PageAdmin";
import EditProduct from "./Admin/PageHome/EditProduct";
import "./App.css";
import { useEffect } from "react";

function App() {
  // const location = useLocation();
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:product_id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="checkout/" element={<CheckOut />}>
          <Route path="step-1" element={<Pay />} />
          <Route path="step-2" element={<Bill />} />
        </Route>
        <Route path="/history" element={<History />} />
      </Routes>
      <Routes>
        <Route path="/admin">
          <Route index element={<PageAdmin />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
