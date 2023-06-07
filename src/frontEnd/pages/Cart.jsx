import React, { useEffect, useState } from "react";
import "../styles/cartPage.css";
import { useAuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/storeContext";
import { PulseLoader } from "react-spinners";

const Cart = () => {
  const navigate = useNavigate();
  const {
    userState: { cart },
  } = useAuthContext();
  const [loader, setLoader] = useState(true);
  const override = {
    position: "fixed",
    top: "50%",
    left: "47.5%",
    margin: "auto",
    borderColor: "red",
  };

  const { dispatchStore } = useStoreContext();

  const cartData = cart?.map((product) => (
    <ProductCard data={product} cartCard />
  ));

  const totalPriceWithoutDiscount = cart?.reduce(
    (sum, { originalPrice, qty }) => sum + originalPrice * qty,
    0
  );
  const totalPriceWithDiscount = cart?.reduce(
    (sum, { offerPrice, qty }) => sum + offerPrice * qty,
    0
  );

  const totalDiscount = totalPriceWithoutDiscount - totalPriceWithDiscount;

  useEffect(() => {
    dispatchStore({ type: "setDisplaySearchModal", payload: false });
    dispatchStore({ type: "setInDisplay", payload: false });
  }, []);

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
          {cart?.length === 0 ? (
            <EmptyCartComponent />
          ) : (
            <div className="cartPage">
              <section className="cartItems">
                <h1>Cart items: ({cart.length} )</h1>
                {cartData}
              </section>
              <section className="cartSummary">
                <h2>Cart Summary</h2>
                <section className="summaryRow">
                  <span className="summaryColumn">
                    <p>Price ({cart.length} items)</p>
                    <p>₹{totalPriceWithoutDiscount}</p>
                  </span>
                  <span className="summaryColumn">
                    <p>Discount</p>
                    <p>-₹{totalDiscount}</p>
                  </span>
                </section>
                <section className="summaryRow">
                  <span className="summaryColumn">
                    <p>Total Amount</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                      ₹{totalPriceWithoutDiscount - totalDiscount}
                    </p>
                  </span>
                </section>
                <button
                  className="checkoutBtn "
                  onClick={() => navigate("/checkout")}
                >
                  CHECKOUT
                </button>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;

function EmptyCartComponent() {
  const navigate = useNavigate();
  return (
    <div className="emptyCartComponent">
      <h1>No items in your cart ! </h1>
      <button onClick={() => navigate("/store")}>Explore Yo-Store!</button>
    </div>
  );
}
