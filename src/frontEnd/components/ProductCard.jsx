import React from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import "../styles/productCard.css";
import { useStoreContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  addToCartHandler,
  addToWishlistHandler,
  qtyHandler,
  qtyIncrement,
  removeFromCartHandler,
  removeFromWishlistHandler,
} from "../services/cartServices";
import { toast } from "react-toastify";

const ProductCard = ({ data, cartCard, wishlistCard }) => {
  const {
    dispatchStore,
    store: { sideBar },
  } = useStoreContext();
  const navigate = useNavigate();
  const {
    _id,
    productId,
    keyNote,
    deliveryTime,
    image,
    brand,
    keyFeature,
    name,
    numberOfRatings,
    qty,
    offerPrice,
    color,
    originalPrice,
    rating,
  } = data;

  const {
    userState: { token, cart, wishlist },
    dispatchUserState,
  } = useAuthContext();

  const discount = Math.trunc(
    ((originalPrice - offerPrice) / originalPrice) * 100
  );

  const addedToCart = (data) =>
    cart.find(({ productId }) => data.productId === productId);

  const addedTowishlist = (data) =>
    wishlist.find(({ productId }) => data.productId === productId);

  console.log(wishlist.length);
  console.log(qty);

  return (
    <section
      className="productCard"
      onClick={() => !sideBar && navigate(`/details/${productId}`)}
    >
      <section className="banner">
        <p>{keyNote}</p>
        <img src={image[0]} alt="" />
        <p>{keyFeature}</p>
      </section>

      <section className="product__details">
        <section className="name__and__pricing">
          <h3
            style={{
              fontFamily: "Orbitron",
              wordSpacing: "4px",
            }}
          >
            {name}
          </h3>
          <small>{color}</small>
          <section className="pricing">
            <p>₹{offerPrice}</p>
            <p>{discount}% off</p>
            <p>{originalPrice}</p>
          </section>
        </section>

        {!cartCard && (
          <section className="rating__and__color">
            <span className="rating">
              <p style={{ fontWeight: 700 }}>{rating.toFixed(1)}</p>
              <AiFillStar color="rgb(244,199,48)" />
            </span>
            <small
              style={{
                fontWeight: 500,
                left: "-1.25rem",
              }}
            >
              ({numberOfRatings} ratings)
            </small>
          </section>
        )}
        {/* <AiOutlineShoppingCart /> */}
        {/* <p>ADD TO CART</p> */}
        <p>
          Delivery By:{" "}
          <span className="delivery__line">
            {deliveryTime < 1
              ? "TODAY"
              : deliveryTime === 1
              ? "1 day"
              : `${deliveryTime} days`}{" "}
          </span>
        </p>
        <section className="lastLine" onClick={(e) => e.stopPropagation()}>
          {!cartCard && !wishlistCard && (
            <section className="addToCartButtonSection">
              {!addedToCart(data) ? (
                <p
                  className="addToCartBtn"
                  onClick={(e) => {
                    if (!sideBar) {
                      addToCartHandler(data, token, dispatchUserState);
                      toast.success(`${name} added to your cart!`, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                    }
                  }}
                >
                  ADD TO CART
                </p>
              ) : (
                <p
                  className="addToCartBtn"
                  onClick={() => !sideBar && navigate("/cart")}
                >
                  GO TO CART
                </p>
              )}
            </section>
          )}
          {wishlistCard && (
            <section className="addToCartButtonSection">
              {!addedToCart(data) ? (
                <p
                  className="addToCartBtn"
                  onClick={(e) => {
                    addToCartHandler(data, token, dispatchUserState);
                    toast.success(`${name} added to your cart!`, {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }}
                >
                  ADD TO CART
                </p>
              ) : (
                <p
                  className="addToCartBtn"
                  onClick={() => {
                    qtyHandler(_id, "increment", dispatchUserState, token);
                    toast.success(`Added 1 more ${name} to your wishlist!`, {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }}
                >
                  ADD 1 MORE
                </p>
              )}
            </section>
          )}
          {cartCard && (
            <section
              className="qtySection"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="minusQty"
                style={{
                  cursor: qty < 2 && "not-allowed",
                  opacity: qty < 2 ? "50%" : "100%",
                }}
                onClick={(e) => {
                  if (qty > 1) {
                    qtyHandler(_id, "decrement", dispatchUserState, token);
                    toast.info("Quantity decreased by 1", {
                      position: "top-right",
                      autoClose: 500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }
                }}
              >
                -
              </button>

              <span>{qty}</span>
              <button
                className="plusQty"
                style={{
                  cursor: qty > 4 && "not-allowed",
                  opacity: qty > 4 ? "50%" : "100%",
                }}
                onClick={() => {
                  if (qty < 5) {
                    qtyHandler(_id, "increment", dispatchUserState, token);

                    toast.info("Quantity increased by 1", {
                      position: "top-right",
                      autoClose: 500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }
                }}
              >
                +
              </button>
            </section>
          )}

          <section className="addToFavouritesSection">
            {!addedTowishlist(data) ? (
              <AiOutlineHeart
                size={25}
                onClick={(e) => {
                  if (!sideBar) {
                    e.stopPropagation();
                    addToWishlistHandler(data, token, dispatchUserState);
                    toast.success("Item added to your wishlist!", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }
                }}
                title="ADD TO WISHLIST"
                className="addToFavBtn"
                color="black"
              />
            ) : (
              <AiFillHeart
                size={25}
                onClick={(e) => {
                  if (!sideBar) {
                    e.stopPropagation();
                    removeFromWishlistHandler(_id, token, dispatchUserState);
                    toast.success("Item removed from your wishlist!", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }
                }}
                title="REMOVE FROM WISHLIST"
                color="black"
              />
            )}
          </section>
        </section>

        {cartCard && (
          <section
            className="removeFromCartButtonSection"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                removeFromCartHandler(_id, token, dispatchUserState);
                toast.info("Item removed from your cart!", {
                  position: "top-right",
                  autoClose: 1300,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }}
            >
              {" "}
              Remove From Cart
            </button>
          </section>
        )}
      </section>
    </section>
  );
};

export default ProductCard;
