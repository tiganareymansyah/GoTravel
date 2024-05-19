import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const TokenExpirationHandler  = () => {
    const [token, setToken] = useState(localStorage.getItem("userLogin"));
    const navigate = useNavigate();

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
            setToken(null);
            navigate("/");
          }
        } else {
          navigate("/");
        }
      };

      checkTokenExpiration();

      const intervalId = setInterval(() => {
        checkTokenExpiration();
      }, 10000);

      return () => clearInterval(intervalId);
    }, [token]);
  };

  return (
    <>
      <TokenExpirationHandler />
      <Outlet />
    </>
  );
}