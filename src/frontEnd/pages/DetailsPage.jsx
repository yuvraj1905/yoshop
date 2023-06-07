import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/detailsPage.css";
import { AiFillStar } from "react-icons/ai";
import ReactImageMagnify from "react-image-magnify";
import { useAuthContext } from "../context/AuthContext";
import {
  addToCartHandler,
  removeFromWishlistHandler,
} from "../services/cartServices";
import { addToWishlistHandler } from "../services/cartServices";
import { useStoreContext } from "../context/storeContext";

const DetailsPage = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState();
  const productDetailFromApi = async () => {
    try {
      const {
        data: { product },
        status,
      } = await axios.get(`/api/products/${productId}`);
      if (status === 200 || status === 201) setProductData(product);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    productDetailFromApi();
  }, [productId]);
  return productData && <DetailsPageCard data={productData} />;
};

export default DetailsPage;

function DetailsPageCard({ data }) {
  const {
    _id,
    keyNote,
    deliveryTime,
    image,
    brand,
    numberOfRatings,
    keyFeature,
    name,
    offerPrice,
    color,
    originalPrice,
    rating,
    playback,
    description,
    quantity,
  } = data;

  const [mainImage, setMainImage] = useState(image[0]);
  const [hideFullDetails, setHideFullDetails] = useState(false);

  const {
    userState: { token, cart, wishlist },
    dispatchUserState,
  } = useAuthContext();

  const { dispatchStore } = useStoreContext();

  const navigate = useNavigate();
  const location = useLocation();

  const addedToCart = (data) =>
    cart.find(({ productId }) => data.productId === productId);

  const addedTowishlist = (data) =>
    wishlist.find(({ productId }) => data.productId === productId);

  const discount = Math.trunc(
    ((originalPrice - offerPrice) / originalPrice) * 100
  );

  useEffect(() => {
    setMainImage(image[0]);
    dispatchStore({ type: "setDisplaySearchModal", payload: false });
    dispatchStore({ type: "setInDisplay", payload: false });
    dispatchStore({ type: "setSearchInput", payload: "" });
  }, [data]);

  return (
    <section className="detailsPage">
      <div className="imageDiv">
        <section className="imageSelector">
          {image.map((imageItem) => (
            <section
              className="shortImage"
              onClick={() => setMainImage(imageItem)}
            >
              <img src={imageItem} alt="" />
            </section>
          ))}
        </section>

        {/* 
          <img className="mainImage" src={mainImage} alt="" />
        */}

        <section className="mainImageSection">
          <div className="mainImage">
            {" "}
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: mainImage,

                  // width: 300,
                  // height: 300,
                },
                largeImage: {
                  src: mainImage,
                  width: 1200,
                  height: 1800,
                  opacity: 1,
                },
                shouldUsePositiveSpaceLens: true,
                isHintEnabled: true,
                shouldHideHintAfterFirstActivation: false,
                enlargedImageContainerDimensions: {
                  width: "126%",
                  height: "100%",
                },
                hoverDelayInMs: 750,
                enlargedImageContainerStyle: {
                  marginLeft: "2.35rem",
                  zIndex: 1,
                  backgroundColor: "white",
                },
              }}
            />
          </div>
        </section>
      </div>

      <div className="detailsDiv">
        <h1>
          {name}{" "}
          {/* <span
            style={{
              paddingLeft: "1rem",
              color: color,
            }}
          >
            ({color})
          </span> */}
        </h1>
        <span className="ratingLine">
          <p className="ratingBar">
            {rating}
            {<AiFillStar color="white" />}
          </p>
          <small>({numberOfRatings} ratings)</small>
        </span>
        <section className="pricingDetailPage">
          <p>₹{offerPrice}</p>
          <p>{originalPrice}</p>
          <p>{discount}% off</p>
        </section>
        <h3>
          Playback Time: <span className="playback"> {playback} Hrs</span>{" "}
        </h3>

        <h3>
          Delivery by:{" "}
          <span
            style={{
              color: "grey",
            }}
            className="deliveryTime"
          >
            {" "}
            {deliveryTime < 1
              ? "TODAY"
              : deliveryTime === 1
              ? "1 day"
              : `${deliveryTime} days`}
          </span>{" "}
        </h3>
        <p className="description">
          <h3>Details:</h3>
          {hideFullDetails ? (
            <section className="limitedDescription">{description}</section>
          ) : (
            <section className="actualDescription">{description}</section>
          )}
        </p>
        <button
          className="detailsToggler"
          onClick={(e) => {
            e.stopPropagation();
            setHideFullDetails(!hideFullDetails);
          }}
        >
          {hideFullDetails ? "show" : "hide"} details
        </button>
        <section className="cart__and__wishlistButtons">
          {!addedToCart(data) ? (
            <p
              onClick={(e) => {
                e.stopPropagation();
                if (token) {
                  addToCartHandler(data, token, dispatchUserState);
                } else {
                  navigate("/login", {
                    state: { from: location.pathname },
                  });
                }
              }}
            >
              ADD TO CART
            </p>
          ) : (
            <p
              onClick={(e) => {
                e.stopPropagation();
                navigate("/cart");
              }}
            >
              GO TO CART
            </p>
          )}
          {!addedTowishlist(data) ? (
            <p
              onClick={(e) => {
                e.stopPropagation();
                if (token) {
                  addToWishlistHandler(data, token, dispatchUserState);
                } else {
                  navigate("/login", {
                    state: { from: location.pathname },
                  });
                }
              }}
            >
              ADD TO WISHLIST
            </p>
          ) : (
            <p
              onClick={(e) => {
                e.stopPropagation();
                removeFromWishlistHandler(_id, token, dispatchUserState);
              }}
            >
              REMOVE FROM WISHLIST
            </p>
          )}{" "}
        </section>
      </div>
    </section>
  );
}
