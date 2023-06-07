import React, { useState } from "react";
import { useStoreContext } from "../context/storeContext";
import { AiFillStar } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import "../styles/filterComponent.css";
import { useCategoriesContext } from "../context/categoriesContext";

const Filter = () => {
  const {
    store: {
      priceMeterValue,
      sideBar,
      categorySelected,
      colorsSelected,
      brandsSelected,
      ratingSelected,
    },
    brands,
    colors,
    dispatchStore,
  } = useStoreContext();

  const { categoriesList } = useCategoriesContext();

  const fontStyler = {
    fontFamily: "Orbitron, sansSerif",
  };
  return (
    <section
      className={sideBar ? "filterComponent showModal" : "filterComponent"}
      onClick={(e) => sideBar && e.stopPropagation()}
    >
      <section className="filter__component__heading">
        <h3 style={fontStyler}>FILTERS</h3>
        <span style={{ cursor: "pointer" }}>
          <FaWindowClose
            onClick={(e) => dispatchStore({ type: "sideBarToggler" })}
            size={20}
            color="white"
            border="white"
          />
        </span>
      </section>

      <section className="priceMeter">
        <h3 style={fontStyler}>Price</h3>
        <input
          type="range"
          min={800}
          max={50000}
          step={200}
          value={priceMeterValue}
          className="slider"
          onChange={(e) =>
            dispatchStore({ type: "priceMeterValue", payload: e.target.value })
          }
        />
        <p style={{ margin: "auto" }}>
          Range Selected: (₹800 --{" "}
          <span style={{ fontWeight: "800", fontSize: "1rem" }}>
            ₹{priceMeterValue}
          </span>{" "}
          )
        </p>
      </section>

      <section className="filterBrands">
        <h3 style={fontStyler}>Category</h3>
        <section className="brandsSection ">
          {categoriesList?.map(({ name }) => (
            <label htmlFor={name} className="unitBrand">
              <input
                type="checkbox"
                checked={categorySelected.includes(name) ? true : false}
                onClick={() =>
                  dispatchStore({
                    type: "categoryChangeHandler",
                    payload: name,
                  })
                }
                className="checkBox"
                id={name}
              />{" "}
              {name}
            </label>
          ))}
        </section>
      </section>

      <section className="filterBrands">
        <h3 style={fontStyler}>Brand</h3>
        <section className="brandsSection">
          {brands?.map((brand) => (
            <label htmlFor={brand} className="unitBrand">
              <input
                onClick={() =>
                  dispatchStore({
                    type: "brandsChangeHandler",
                    payload: brand,
                  })
                }
                type="checkbox"
                checked={brandsSelected.includes(brand) ? true : false}
                className="checkBox"
                id={brand}
              />{" "}
              {brand}
            </label>
          ))}
        </section>
      </section>

      <section className="filterColors">
        <h3 style={fontStyler}>Color</h3>
        <section className="brandsSection">
          {colors?.map((color) => (
            <label className="unitBrand colorUnitBrand" htmlFor={color}>
              <input
                onClick={() =>
                  dispatchStore({
                    type: "colorChangeHandler",
                    payload: color.toLowerCase(),
                  })
                }
                type="checkbox"
                checked={
                  colorsSelected.includes(color.toLowerCase()) ? true : false
                }
                id={color}
              />{" "}
              {color}
            </label>
          ))}
        </section>
      </section>

      <section className="filterRating">
        <h3 style={fontStyler}>Rating</h3>
        {/* {[4, 3, 2].map((rating) => (
          <section className="ratingsSection unitBrand">
            <input
              type="radio"
              id={rating}
              name="ratingSelected"
              value={rating}
            />
            <label className="starsLine" htmlFor={rating}>
              <span className="starIcon">
                {rating}
                {""}
                <AiFillStar color="rgb(244,199,48)" size={20} />{" "}
              </span>
              <p style={{ fontSize: ".85rem" }}>or above</p>
            </label>
          </section>
        ))} */}

        <section className="ratingMeter">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={ratingSelected}
            className="ratingSlider"
            onChange={(e) =>
              dispatchStore({
                type: "ratingChangeHandler",
                payload: e.target.value,
              })
            }
          />
        </section>
      </section>

      <button
        onClick={() => dispatchStore({ type: "resetFilters" })}
        style={fontStyler}
        className="resetButton"
      >
        Reset
      </button>
    </section>
  );
};

export default Filter;
