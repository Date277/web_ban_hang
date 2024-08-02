import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Pay.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface Province {
  name: string;
  districts: District[];
}

interface District {
  name: string;
  wards: Ward[];
}

interface Ward {
  name: string;
}

function Pay() {
  let [order_name, setOrderName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let cart = JSON.parse((localStorage.getItem("cart") as any) || "");

  let [provinces, setProvinces] = useState([]); // Tỉnh/Thành Phố
  let [activeProvince, setActiveProvince] = useState("");

  let [districts, setDistricts] = useState([]); // Quận/Huyện
  let [activeDistrict, setActiveDistrict] = useState("");

  let [wards, setWards] = useState([]); // Phường/Xã
  let [activeWard, setActiveWard] = useState("");

  let [errors, setErrors] = useState({
    order_name: "",
    email: "",
    phone: "",
    address: "",
    provinces: "",
    districts: "",
    wards: "",
  });

  const navigate = useNavigate();

  const fetchProvinces = async () => {
    try {
      let res = await axios.get(
        `https://vapi.vnappmob.com/api/province?province_name=${activeProvince}`
      );
      const data = res.data.results;
      setProvinces(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let clickProvince = provinces.find(
          (e) => e.province_name === activeProvince
        );
        if (clickProvince) {
          const provinceId = clickProvince.province_id;
          let res = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${provinceId}`
          );
          setDistricts(res.data.results);
          setActiveWard("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeProvince]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let clickDistrict = districts.find(
          (e) => e.district_name === activeDistrict
        );
        if (clickDistrict) {
          const wardId = clickDistrict.district_id;
          let res = await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${wardId}`
          );
          setWards(res.data.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeDistrict]);

  // useEffect(() => {
  //   fetchProvinces();
  // }, []);

  // useEffect(() => {
  //   let clickProvince: any = provinces.find(
  //     (e: any) => e.name == activeProvince
  //   );
  //   if (clickProvince) {
  //     setDistricts(clickProvince.districts);
  //     setActiveWard("");
  //   }
  // }, [activeProvince]);

  // useEffect(() => {
  //   let clickDistrict: any = districts.find(
  //     (e: any) => e.name == activeDistrict
  //   );
  //   if (clickDistrict) {
  //     setWards(clickDistrict.wards);
  //   }
  // }, [activeDistrict]);

  const handleActiveProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveProvince(e.target.value);
    }
  };

  const handleActiveDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveDistrict(e.target.value);
    }
  };

  const handleActiveWard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveWard(e.target.value);
    }
  };

  function resetAllProvinces() {
    setActiveProvince("");
    setActiveDistrict("");
    setDistricts([]);
    setActiveWard("");
    setWards([]);
  }
  useEffect(() => {
    fetchProvinces();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") as any);
  const userId = user.users_id;

  const validateForm = () => {
    let valid = true;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!order_name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        order_name: "Vui lòng nhập Họ và Tên",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, order_name: "" }));
    }

    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Vui lòng nhập Email",
      }));
      valid = false;
    } else if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email không hợp lệ",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (!phone.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Vui lòng nhập Số điện thoại",
      }));
      valid = false;
    } else if (!/^[0-9]+$/.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Số điện thoại chỉ được chứa các chữ số",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }

    if (!address.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Vui lòng nhập Địa chỉ",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
    }

    if (!activeProvince) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        province: "Vui chọn Tình/Thành Phố",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, province: "" }));
    }

    if (!activeDistrict) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        district: "Vui chọn Quận/Huyện",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, district: "" }));
    }

    if (!activeWard) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ward: "Vui chọn Phường/Xã",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ward: "" }));
    }

    return valid;
  };
  console.log(errors);

  // Sự kiện thanh toán
  const handleCheckOut = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      let order = {
        user_id: userId,
        order_name,
        email,
        phone,
        address,
        province: activeProvince,
        district: activeDistrict,
        ward: activeWard,
        cart,
      };
      console.log(order);
      await axios
        .post(`http://localhost:3000/api/v1/orders`, order)
        .then((res) => {
          console.log(res.data.savedOrder);
          Swal.fire("Thành công", res.data.messenge, "success").then(() => {
            navigate(`/checkout/step-2?id=${res.data.savedOrder.order_id}`);
            window.scrollTo(0, 0);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="carttt">
      <div className="cart">
        <div>
          <b>KFC MANOR HÀ NỘI</b>
        </div>
        <div>Tòa nhà The Manor, Mễ Trì, P.Mỹ Đình 1, TP Hà Nội</div>
      </div>
      <div className="cart">
        <h2>
          <b>THÊM THÔNG TIN CHI TIẾT:</b>
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={order_name}
              onChange={(e) => setOrderName(e.target.value)}
              type="text"
              placeholder="Họ và Tên"
              name="fullName"
            />
            {Object.keys(errors).length > 0 && errors.order_name && (
              <Form.Text className="text-danger">{errors.order_name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone Number"
            />
            {errors.phone && (
              <Form.Text className="text-danger">{errors.phone}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Địa chỉ"
            />
            {errors.address && (
              <Form.Text className="text-danger">{errors.address}</Form.Text>
            )}
          </Form.Group>
          {errors.provinces && (
            <Form.Text className="text-danger">{errors.provinces}</Form.Text>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleActiveProvince}
              value={activeProvince}
            >
              <option selected value="">
                Tỉnh/Thành
              </option>
              {provinces.length > 0 &&
                provinces.map((e: any) => (
                  <option value={e.province_name}>{e.province_name}</option>
                ))}
            </select>
          </Form.Group>
          {errors.provinces && (
            <Form.Text className="text-danger">{errors.provinces}</Form.Text>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleActiveDistrict}
              value={activeDistrict}
            >
              <option selected value="">
                Quận/Huyện
              </option>
              {districts.length > 0 &&
                districts.map((e: any) => (
                  <option value={e.district_name}>{e.district_name}</option>
                ))}
            </select>
            {errors.districts && (
              <Form.Text className="text-danger">{errors.districts}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleActiveWard}
              value={activeWard}
            >
              <option selected value="">
                Phường Xã
              </option>
              {wards.length > 0 &&
                wards.map((e: any) => (
                  <option value={e.ward_name}>{e.ward_name}</option>
                ))}
            </select>
            {errors.wards && (
              <Form.Text className="text-danger">{errors.wards}</Form.Text>
            )}
          </Form.Group>

          <Button
            onClick={handleCheckOut}
            className="btnbuy"
            variant="danger"
            type="submit"
          >
            Đặt hàng
          </Button>
        </Form>
      </div>
      <div className="cart">
        <h1>
          <b>PHƯƠNG THỨC THANH TOÁN</b>
        </h1>
        <div className="pays">
          <div className="pay">
            Thanh toán bằng ATM/Visa/Master và Ví ZaloPay (Miễn phí giao hàng)
          </div>
          <img
            src="https://static.kfcvietnam.com.vn/images/web/ZaloPay_icon.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Pay;
