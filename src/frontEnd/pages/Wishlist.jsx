import React, { useEffect, useState } from "react";
import "../styles/wishlistPage.css";
import { useAuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Wishlist = () => {
  const [loader, setLoader] = useState(true);
  const {
    userState: { wishlist },
  } = useAuthContext();
  const wishlistData = wishlist?.map((product) => (
    <ProductCard data={product} wishlistCard />
  ));
  const override = {
    position: "fixed",
    top: "50%",
    left: "47.5%",
    margin: "auto",
    borderColor: "red",
  };
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
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
        <>
          {wishlist.length === 0 ? (
            <EmptyWishlistComponent />
          ) : (
            <div className="wishlistPage">
              <h1>Wishlist items: ({wishlist.length} )</h1>

              <section className="wishlistItems">{wishlistData}</section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Wishlist;

function EmptyWishlistComponent() {
  const navigate = useNavigate();
  return (
    <div className="emptyCartComponent">
      <h1>No items in your wishlist ! </h1>
      <button onClick={() => navigate("/store")}>Explore Yo-Store!</button>
    </div>
  );
}
