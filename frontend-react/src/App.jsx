import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/authentication/login-user/Login.jsx';
import Register from './pages/authentication/register-user/Register.jsx';
import LoginAdmin from './pages/authentication/login-admin/LoginAdmin.jsx';
import GoTravelIndex from "./pages/index.jsx";
import Loader from "./components/Loader/Loader.jsx";

export default function App() {
  const [userLogin, setUserLogin] = useState(localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")) : null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(!userLogin) {
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

  const doLoad = () => {
    setLoading((prev) => !prev);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login doLoad={doLoad} />} />
        <Route path="/register" element={<Register doLoad={doLoad} />} />
        <Route path="/admin" element={<LoginAdmin doLoad={doLoad} />} />
        <Route path="/dashboard" element={<GoTravelIndex userLogin={userLogin} />} />
        <Route path="/booking" element={<GoTravelIndex userLogin={userLogin} />} />
        <Route path="/about" element={<GoTravelIndex userLogin={userLogin} />} />
        <Route path="/contact" element={<GoTravelIndex userLogin={userLogin} />} />
        <Route path="/booking/form-booking" element={<GoTravelIndex userLogin={userLogin} />} />
      </Routes>
      <Loader open={loading} />
    </>
  );
}
