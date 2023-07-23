import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verifiy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedToken = (token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default Verifiy;
