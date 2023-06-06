import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orderSuccessfull.css";

const OrderSuccessfull = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/profile/myorders");
    }, 5000);
  }, []);
  return (
    <div className="orderSuccessfull">
      <h2>HOLA !</h2>
      <h1>Order Successfully placed !</h1>
    </div>
  );
};

export default OrderSuccessfull;
