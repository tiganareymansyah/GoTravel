import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/authentication/login-user/Login.jsx";
import Register from "./pages/authentication/register-user/Register.jsx";
import LoginAdmin from "./pages/authentication/login-admin/LoginAdmin.jsx";
import GoTravelIndex from "./pages/index.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { apiGetDataBookingByEmail, apiGetDataUserLogin } from "./api/api.js";
import { useLocation } from "react-router-dom";

export default function App() {
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("userLogin")
      ? JSON.parse(localStorage.getItem("userLogin"))
      : null
  );
  const [dataUserLogin, setDataUserLogin] = useState();
  const [loading, setLoading] = useState(false);
  const [dataBooking, setDataBooking] = useState([]);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (!userLogin) {
      navigate("/");
    } else {
      if(userLogin.role === "admin") {
        navigate("/kelola-admin");
      } else {
        navigate("/booking");
        handleGetUserLogin();
      }
    }
  }, [userLogin]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem("userLogin");
      const storedTimestamp = localStorage.getItem("tokenTimestamp");

      if (storedToken && storedTimestamp) {
        // const expirationTime = 60 * 1000; // 1 menit
        const expirationTime = 24 * 60 * 60 * 1000; // 1 hari
        const currentTimestamp = new Date().getTime();

        if (currentTimestamp - parseInt(storedTimestamp, 10) > expirationTime) {
          localStorage.removeItem("userLogin");
          localStorage.removeItem("tokenTimestamp");
          setUserLogin(null);
          navigate("/");
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [userLogin]);

  useEffect(() => {
    if(pathname !== "/" &&
    pathname !== "/register" &&
    pathname !== "/admin") {
      handleGetDataBooking();
    } else {
      setDataBooking([]);
    }
  }, [pathname]);

  const doLoad = () => {
    setLoading((prev) => !prev);
  };

  const handleGetUserLogin = async () => {
    try {
      let urlParams = userLogin.email;

      const result = await apiGetDataUserLogin(urlParams);

      const { code, status, message, data } = result;

      if(status === "success") {
        setDataUserLogin(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetDataBooking = async () => {
    try {
      let urlParams = userLogin.email;

      const result = await apiGetDataBookingByEmail(urlParams);

      const { code, status, message, data } = result;

      if(status === "success") {
        setDataBooking(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<Login doLoad={doLoad} />} 
        />
        <Route 
          path="/register" 
          element={<Register doLoad={doLoad} />} 
        />
        <Route 
          path="/admin" 
          element={<LoginAdmin doLoad={doLoad} />} 
        />
        <Route
          path="/dashboard"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/booking"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/booking/form-booking"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/about"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/contact"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/profil"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/kelola-admin"
          element={<GoTravelIndex userLogin={dataUserLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/booking/detail-booking"
          element={<GoTravelIndex userLogin={dataUserLogin} doLoad={doLoad} />}
        />
      </Routes>
      <Loader open={loading} />
    </>
  );
}
