import React, { useEffect, useState } from "react";
import { useAddressAndOrdersContext } from "../context/AddressAndOrdersContext";
import "../styles/checkout.css";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useStoreContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { removeFromCartHandler } from "../services/cartServices";
import logo from "../assets/y-Icon.jpg";
import confetti from "canvas-confetti";
import { PulseLoader } from "react-spinners";

const Checkout = () => {
  const {
    addressAndOrders: { addresses, addressSelected },
    dispatchAddressAndOrders,
  } = useAddressAndOrdersContext();

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const override = {
    position: "fixed",
    top: "50%",
    left: "47.5%",
    margin: "auto",
    borderColor: "red",
  };
  const {
    store: { checkoutPrice },
    dispatchStore,
  } = useStoreContext();

  const {
    userState: { cart, token },
    dispatchUserState,
  } = useAuthContext();

  const [responseSummary, setResponseSummary] = useState({
    validation: false,
    id: null,
  });

  const totalPriceWithoutDiscount = cart?.reduce(
    (sum, { originalPrice, qty }) => sum + originalPrice * qty,
    0
  );
  const totalPriceWithDiscount = cart?.reduce(
    (sum, { offerPrice, qty }) => sum + offerPrice * qty,
    0
  );

  const totalDiscount = totalPriceWithoutDiscount - totalPriceWithDiscount;

  const couponOfferPrice =
    totalPriceWithDiscount - Math.trunc((totalPriceWithDiscount * 5) / 100);

  const addressData = addresses.map((address) => (
    <AddressCardCheckout data={address} />
  ));
  console.log(addressSelected);

  const currentAddress = addresses?.find(({ id }) => id === addressSelected);
  // console.log(currentAddress);

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderIdd = "";
  for (let i = 0; i < 10; i++) {
    orderIdd += characters.charAt(Math.floor(Math.random() * 62));
  }

  const today = new Date();
  const estimatedDate =
    Number(today.getDate() + 2) +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  const orderDetails = {
    OrderId: orderIdd,
    TotalPaid: checkoutPrice,
    DeliveryLocation: `${currentAddress.street},${currentAddress.city},${currentAddress.state},${currentAddress.pincode},${currentAddress.country}`,
    Contact: `${currentAddress.Mobile}`,
    EstimatedDelivery: estimatedDate,
    ProductsOrdered: [...cart],
  };
  const orderPlaceHandler = () => {
    displayRazorpay();

    // dispatchAddressAndOrders({ type: "orderPlaced", payload: orderDetails });
    // cart.forEach((cartItem) =>
    //   removeFromCartHandler(cartItem._id, token, dispatchUserState)
    // );
    // navigate("/orderSuccessfull");
  };

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load, check you connection");
      return;
    }

    const options = {
      key: "rzp_test_5PB6cwC4QZ275K",
      amount: checkoutPrice * 100,
      currency: "INR",
      name: "YO-Shop",
      description: "Thank you Yo-Shopper !",
      image: { logo },
      handler: function (response) {
        setResponseSummary({
          validation: true,
          // cart: state.cartlist,
          id: response.razorpay_payment_id,
        });
        // clearCarts();
      },
      prefill: {
        name: `${currentAddress.name}`,
        // email: email,
        contact: `${currentAddress.Mobile}`,
      },
      theme: {
        color: "black",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const popper = () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  useEffect(() => {
    // let id = null;
    if (responseSummary.validation) {
      popper();
      dispatchAddressAndOrders({
        type: "orderPlaced",
        payload: { ...orderDetails, paymentId: responseSummary.id },
      });
      // dispatchAddressAndOrders({ type: "orderPlaced", payload: orderDetails });
      cart.forEach((cartItem) =>
        removeFromCartHandler(cartItem._id, token, dispatchUserState)
      );
      navigate("/orderSuccessfull");
      // navigate("/orderSuccessfull");
      // id = setTimeout(() => {
      //   // dispatch({
      //   //   type: ActionType.ResetCartPriceDetails,
      //   // });
      //   navigate("/profile/myorders");
      // }, 3000);
    }
  }, [responseSummary]);

  useEffect(() => {
    dispatchStore({
      type: "checkoutPriceSetter",
      payload: totalPriceWithDiscount,
    });
  }, [totalPriceWithDiscount]);

  useEffect(() => {
    setLoader(true);
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
            <div className="checkout">
              <section className="chooseAddress">
                <h2>Select an address</h2>
                {addressData}
                <button
                  className="addNewAddressButtonCheckout"
                  onClick={() =>
                    navigate("/profile/myadresses", {
                      state: { from: "checkoutPage" },
                    })
                  }
                >
                  <AiOutlinePlus color="white" size={15} fontWeight={800} />
                  <p>Add new address</p>
                </button>
              </section>
              <section className="cartSummary checkoutSummary">
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
                      ₹{checkoutPrice}
                    </p>
                  </span>
                  <span className="summaryColumn">
                    <p>New to Yo-Shop? Enjoy 5% off</p>
                    <button
                      onClick={() => {
                        dispatchStore({
                          type: "checkoutPriceSetter",
                          payload: couponOfferPrice,
                        });
                        toast.success("Coupon applied! Happy shopping!", {
                          position: "bottom-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }}
                      className="coupon"
                    >
                      Apply coupon
                    </button>
                  </span>
                </section>
                <button
                  className="checkoutBtn checkoutPageBtn "
                  onClick={orderPlaceHandler}
                >
                  Place Order
                </button>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Checkout;

function AddressCardCheckout({ data }) {
  const { id, name, street, city, pincode, state, country, Mobile } = data;
  const {
    addressAndOrders: { addressSelected },
    dispatchAddressAndOrders,
  } = useAddressAndOrdersContext();
  return (
    <section className="addressCardCheckout">
      <input
        type="radio"
        name="addressToBeSelected"
        id={`addressInput${id}`}
        value={id}
        checked={addressSelected === id ? true : false}
        onClick={() =>
          dispatchAddressAndOrders({ type: "addressSelector", payload: id })
        }
      />
      <label htmlFor={`addressInput${id}`}>
        <section className="checkoutSingleAddress">
          <h3>{name}</h3>
          <p>{street}</p>
          <p>{city}</p>
          <p>
            {state},{country},{pincode}
          </p>
          <p>{Mobile}</p>
        </section>
      </label>
    </section>
  );
}

function EmptyCartComponent() {
  const navigate = useNavigate();
  return (
    <div className="emptyCartComponent">
      <h1>Why checkout? No items in your cart ! WHY THIS KOLAVERI-DI ! </h1>
      <button onClick={() => navigate("/store")}>Explore Yo-Store!</button>
    </div>
  );
}
