import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/authentication/login-user/Login.jsx";
import Register from "./pages/authentication/register-user/Register.jsx";
import LoginAdmin from "./pages/authentication/login-admin/LoginAdmin.jsx";
import GoTravelIndex from "./pages/index.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { apiGetDataBooking } from "./api/api.js";
import { useLocation } from "react-router-dom";

export default function App() {
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("userLogin")
      ? JSON.parse(localStorage.getItem("userLogin"))
      : null
  );
  const [loading, setLoading] = useState(false);
  const [dataBooking, setDataBooking] = useState([]);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (!userLogin) {
      navigate("/");
    } else {
      navigate("/booking");
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

  const handleGetDataBooking = async () => {
    try {
      const result = await apiGetDataBooking();

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
          element={<GoTravelIndex userLogin={userLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/booking"
          element={<GoTravelIndex userLogin={userLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/about"
          element={<GoTravelIndex userLogin={userLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/contact"
          element={<GoTravelIndex userLogin={userLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
        <Route
          path="/booking/form-booking"
          element={<GoTravelIndex userLogin={userLogin} dataBooking={dataBooking} doLoad={doLoad} />}
        />
      </Routes>
      <Loader open={loading} />
    </>
  );
}
