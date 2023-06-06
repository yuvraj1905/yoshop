import React, { useEffect, useState } from "react";
import { BiSortAlt2, BiUpArrow } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import "../styles/store.css";
import Filter from "../components/Filter";
import { useStoreContext } from "../context/storeContext";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { scrollUp } from "../Utils/scrollUp";

const Store = () => {
  const [loader, setLoader] = useState(true);
  const {
    dispatchStore,
    finalRenderingData,
    store: {
      sideBar,
      priceMeterValue,
      categorySelected,
      colorsSelected,
      brandsSelected,
      sorting,
      ratingsSelected,
    },
  } = useStoreContext();
  const location = useLocation();

  useEffect(() => {
    dispatchStore({ type: "setDisplaySearchModal", payload: false });
    dispatchStore({ type: "setInDisplay", payload: false });
    dispatchStore({ type: "resetFilters" });
    if (location?.state?.from) {
      dispatchStore({
        type: "categoryChangeHandler",
        payload: location.state.with,
      });
      dispatchStore({ type: "setSearchInput", payload: location.state.with });
    } else {
      dispatchStore({ type: "setSearchInput", payload: "" });
    }
  }, []);

  const [displayMovetotop, setDisplayMovetotop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      if (window.scrollY > 420) {
        setDisplayMovetotop(true);
      } else {
        setDisplayMovetotop(false);
      }
    });
  }, [window.scrollY]);

  const override = {
    position: "absolute",
    top: "50%",
    left: "47.5%",
    margin: "auto",
    borderColor: "red",
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [
    priceMeterValue,
    categorySelected,
    colorsSelected,
    brandsSelected,
    sorting,
    ratingsSelected,
  ]);

  return (
    <div
      className={sideBar ? "storePage disableMovement" : "storePage"}
      onClick={() => sideBar && dispatchStore({ type: "sideBarToggler" })}
    >
      <section className="storePage__filtersLine">
        <section
          className="filter"
          onClick={(e) => {
            e.stopPropagation();
            dispatchStore({ type: "sideBarToggler" });
          }}
        >
          <GoSettings />
          <p>Filter By</p>
          <BsChevronDown size={16} />
        </section>
        <section className="sort">
          <BiSortAlt2 />
          <p>Sort By:</p>
          <select
            className="dropdown"
            onChange={(e) => {
              e.stopPropagation();
              dispatchStore({
                type: "sortingChangeHandler",
                payload: e.target.value,
              });
            }}
          >
            <option className="dropDownElement" value="Popularity">
              Popularity
            </option>
            <option className="dropDownElement" value="HTL">
              Price: High to Low
            </option>
            <option className="dropDownElement" value="LTH">
              Price: Low to High
            </option>
          </select>
        </section>
      </section>
      <Filter />

      {loader ? (
        <PulseLoader
          color="black"
          loading={loader}
          size={25}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <section
          className={
            sideBar ? "storePage__content content__blur" : "storePage__content"
          }
        >
          {finalRenderingData &&
            finalRenderingData.map((product) => <ProductCard data={product} />)}
        </section>
      )}

      <button
        onClick={() => scrollUp()}
        style={{ display: !displayMovetotop && "none" }}
        className="moveToTopBtn"
      >
        <BiUpArrow color="white" size={20} />
      </button>
    </div>
  );
};

export default Store;
