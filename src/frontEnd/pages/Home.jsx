import React, { useEffect, useState } from "react";
import "../styles/home.css";
import "../styles/categoryCard.css";
import poster from "../assets/home_poster1.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import { useCategoriesContext } from "../context/categoriesContext";
import { useStoreContext } from "../context/storeContext";

const Home = () => {
  const navigate = useNavigate();

  const {
    dispatchStore,
    store: { searchInput },
  } = useStoreContext();
  useEffect(() => dispatchStore({ type: "setSearchInput", payload: "" }), []);
  return (
    <>
      <section className="homePage">
        <div className="posterImg" onClick={() => navigate("/store")}>
          {" "}
          <img src={poster} alt="" />
          <button>Shop Now</button>
        </div>

        {/* <h1>Shop by Category</h1> */}
        <div className="shopByCategory__title">
          <h2>Shop by Category</h2>
          <h2>Shop by Category</h2>
        </div>

        <div className="categories__section__homepage">
          <CategoriesComponent />
        </div>
      </section>
    </>
  );
};

export default Home;

function CategoriesComponent() {
  const { categorySelected, dispatchStore } = useStoreContext();
  const navigate = useNavigate();
  const { categoriesList } = useCategoriesContext();
  return (
    <>
      {categoriesList.length > 0 &&
        categoriesList.map((categoryData) => (
          <CategoryCard data={categoryData} />
        ))}
    </>
  );
}
