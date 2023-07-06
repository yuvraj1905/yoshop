import React, { useEffect, useState, useRef } from "react";
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineHistory,
} from "react-icons/ai";
import { BsSearch, BsHandbag } from "react-icons/bs";
import { BiStoreAlt } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useStoreContext } from "../context/storeContext";
import { categories } from "../../backend/db/categories";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const {
    userState: { cart, wishlist },
  } = useAuthContext();
  const navigate = useNavigate();
  const {
    store: {
      previousSearch,
      searchInput,
      fullData,
      displaySearchModal,
      inpDisplay,
    },
    dispatchStore,
    setSearchInput,
  } = useStoreContext();

  function useFocus() {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  }

  const [inputRef, setInputFocus] = useFocus();

  const previousSearchDisplayer = previousSearch.map((el) => (
    <PreviousSearchComponent
      helper={[setSearchInput, setInputFocus]}
      data={el}
    />
  ));

  const categoriesListHC = [
    "TWS Earbuds",
    "Neckbands",
    "Headphones",
    "speakers",
  ];

  const liveSearchData = () => {
    const toSearchIn =
      categoriesListHC.filter((cat) =>
        cat.toLowerCase().includes(searchInput.toLowerCase())
      ).length > 0
        ? "categories"
        : fullData?.filter(({ name }) =>
            name.toLowerCase().includes(searchInput.toLowerCase())
          ).length > 0
        ? "products"
        : "";

    let output = [];
    if (toSearchIn === "categories") {
      output = categories
        .filter(({ name }) =>
          name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((item) => <LiveSearchProductComponent data={item} />);
    } else if (toSearchIn === "products") {
      output = fullData
        ?.filter(({ name }) =>
          name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((item) => <LiveSearchProductComponent data={item} />);
    } else {
      const notFound = {
        image: [
          "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png",
        ],
        name: "oops ! no such product or category found !",
      };
      output = <LiveSearchProductComponent data={notFound} />;
    }

    return output;
  };
  useEffect(() => {}, [displaySearchModal, inpDisplay]);
  return (
    <>
      <section
        className="header"
        onClick={() =>
          displaySearchModal &&
          dispatchStore({ type: "setDisplaySearchModal", payload: false })
        }
      >
        <section
          className="app__logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <h1>Yo-Shop</h1>
        </section>
        {/* <section className="searchBar__and__navLinks"> */}
        {/* <section className="searchBar">
            <BsSearch size={20} />
            <input type="text" name="" id="" placeholder="search products" />
          </section> */}

        <section
          className="searchSection"
          tabindex="1"
          onBlur={() =>
            dispatchStore({ type: "setInpDisplay", payload: false })
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <section
            className="searchHeader"
            onClick={(e) => {
              e.stopPropagation();
              dispatchStore({ type: "setDisplaySearchModal", payload: true });
              dispatchStore({ type: "setDisplaySearchModal", payload: true });
            }}
          >
            <input
              ref={inputRef}
              onFocus={() =>
                dispatchStore({ type: "setInpDisplay", payload: true })
              }
              // onBlur={() =>
              //   !searchInput &&
              //   dispatchStore({ type: "setDisplaySearchModal", payload: false })
              // }
              type="text"
              placeholder="Search for products or categories"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <BsSearch className="searchIcon" size={20} color="black" />
          </section>

          {(displaySearchModal || inpDisplay) && (
            <div className="searchBarSection">
              {searchInput === "" ? (
                <section className="previousSearch">
                  {previousSearchDisplayer}
                </section>
              ) : (
                <section className="liveSearch">{liveSearchData()}</section>
              )}
            </div>
          )}
        </section>

        <section className="navLinks">
          <NavLink to="/store">
            <BiStoreAlt className="navlink__icon" size={22} color="black" />
          </NavLink>
          <p
            className="wishlistLengthPopUp"
            style={{ display: wishlist.length === 0 && "none" }}
          >
            {wishlist.length >= 1 && wishlist.length}
          </p>

          <NavLink to="/wishlist">
            <AiOutlineHeart className="navlink__icon" size={27} color="black" />
          </NavLink>
          <p
            className="cartLengthPopUp"
            style={{ display: cart.length === 0 && "none" }}
          >
            {cart.length >= 1 && cart.length}
          </p>
          <NavLink to="/cart">
            <BsHandbag className="navlink__icon" size={22} color="black" />
          </NavLink>
          <NavLink to="/profile/myprofile">
            <AiOutlineUser className="navlink__icon" size={25} color="black" />
          </NavLink>
        </section>
      </section>
      {/* </section> */}
    </>
  );
};

export default Header;

function PreviousSearchComponent({ data, helper }) {
  const { dispatchStore } = useStoreContext();
  return (
    <section
      className="previousSearchComponent"
      onClick={() => {
        helper[0](data);
        helper[1]();
        dispatchStore({ type: "setDisplaySearchModal", payload: true });
      }}
    >
      <span>
        <AiOutlineHistory />
      </span>
      <span>{data}</span>
    </section>
  );
}

function LiveSearchProductComponent({ data }) {
  const { image, name, productId } = data;
  const location = useLocation();
  const {
    dispatchStore,
    store: { fullData },
  } = useStoreContext();
  const navigate = useNavigate();
  return (
    <section
      className="liveSearchComponent"
      onClick={() => {
        if (
          ["TWS Earbuds", "Neckbands", "Headphones", "speakers"].find(
            (el) => el === name
          )
        ) {
          dispatchStore({
            type: "previousSearchHandler",
            payload: name,
          });
          dispatchStore({
            type: "categoryChangeHandler",
            payload: name,
          });

          navigate("/store", {
            state: { from: location.pathname, with: name },
          });
        } else if (fullData?.find((item) => item.name === name)) {
          dispatchStore({
            type: "previousSearchHandler",
            payload: name,
          });
          navigate(`/details/${productId}`);
        } else {
          console.log("NO PRODUCTS FOUND");
        }
      }}
    >
      <img height="36px" width="36px" src={image[0]} alt="" />
      <span>{name}</span>
    </section>
  );
}
