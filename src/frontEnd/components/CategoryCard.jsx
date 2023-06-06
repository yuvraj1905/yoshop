import React from "react";
import "../styles/categoryCard.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/storeContext";
const CategoryCard = ({ data }) => {
  const { _id, description, name, image } = data;
  const { dispatchStore } = useStoreContext();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section
      className="categoryCard"
      onClick={() => {
        navigate("/store", { state: { from: location.pathname, with: name } });
        dispatchStore({
          type: "categoryChangeHandler",
          payload: name,
        });
      }}
    >
      <img src={image[0]} alt="" />
      <h3 style={{ marginTop: "2px" }}>{name}</h3>
      <p style={{ color: "grey", fontSize: "0.75rem" }}>{description}</p>
    </section>
  );
};

export default CategoryCard;
