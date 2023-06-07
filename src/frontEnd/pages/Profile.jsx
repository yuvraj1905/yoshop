import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import "../styles/profilePage.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useAddressAndOrdersContext } from "../context/AddressAndOrdersContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/storeContext";
import { PulseLoader } from "react-spinners";

const Profile = () => {
  const [loader, setLoader] = useState(true);
  const {
    userState: { isLoggedIn },
  } = useAuthContext();
  const { profileRoute } = useParams();

  const navlinkStyler = ({ isActive }) => ({
    borderBottom: isActive && "4px solid black",
  });
  const {
    addressAndOrders: { showModal },
    dispatchAddressAndOrders,
  } = useAddressAndOrdersContext();

  const override = {
    position: "fixed",
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
  }, [profileRoute]);

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
        <div
          className="profilePage"
          onClick={() =>
            showModal &&
            dispatchAddressAndOrders({ type: "setModal", payload: false })
          }
        >
          <h1 className="profileHeading">Welcome YoShopper!!</h1>
          {isLoggedIn && (
            <div className="profileSections">
              <section className="profileNavlinks">
                <NavLink
                  style={navlinkStyler}
                  className="profileNavlinks"
                  to="/profile/myprofile"
                >
                  My Profile
                </NavLink>
                <NavLink
                  style={navlinkStyler}
                  className="profileNavlinks"
                  to="/profile/myadresses"
                >
                  Saved Addresses
                </NavLink>
                <NavLink
                  style={navlinkStyler}
                  className="profileNavlinks"
                  to="/profile/myorders"
                >
                  My Orders
                </NavLink>
              </section>
              <section>
                {profileRoute === "myprofile" ? (
                  <MyProfile />
                ) : profileRoute === "myadresses" ? (
                  <MyAddresses />
                ) : (
                  <MyOrders />
                )}
              </section>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;

function MyProfile() {
  const {
    userState: {
      loggedInUserCredentials: [name, email],
    },
    logoutHandler,
  } = useAuthContext();
  return (
    <section className="profileContent">
      <h2>
        <span style={{ color: "grey", fontSize: "1.1rem", fontWeight: 600 }}>
          Name:
        </span>
        {name}
      </h2>
      <h2>
        <span style={{ color: "grey", fontSize: "1.1rem", fontWeight: 600 }}>
          Email:
        </span>
        {email}
      </h2>

      <button className="logOutBtn" onClick={logoutHandler}>
        Log Out
      </button>
    </section>
  );
}

function MyAddresses() {
  const {
    addressAndOrders: { addresses, showModal, count },
    dispatchAddressAndOrders,
  } = useAddressAndOrdersContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [details, setDetails] = useState({
    id: count,
    name: "",
    street: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    Mobile: "",
  });

  const addNewAddressHandler = (e) => {
    e.preventDefault();
    if (String(details.pincode).length !== 6) {
      toast.error("Invalid Pincode", {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (String(details.Mobile).length !== 10) {
      toast.error("Phone number should be of 10 digits", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    dispatchAddressAndOrders({
      type: "addNewAddress",
      payload: details,
    });
    setDetails({
      ...details,
      name: "",
      street: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
      Mobile: "",
    });
    dispatchAddressAndOrders({ type: "setModal", payload: false });
    dispatchAddressAndOrders({ type: "countHandler" });
    if (location?.state?.from) {
      toast.info(
        "Address added successfully. Redirecting you to Checkout page.",
        {
          position: "bottom-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      navigate("/checkout");
    }
  };

  const cancelHandler = () => {
    setDetails({
      ...details,
      name: "",
      street: "",
      city: "",
      pincode: null,
      state: "",
      country: "",
      Mobile: null,
    });
    dispatchAddressAndOrders({ type: "setModal", payload: false });
    if (location?.state?.from) {
      toast.info("You choosed to go back. Redirecting you to Checkout page.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/checkout");
    }
  };

  const addressData = addresses?.map((address) => (
    <AddressCard data={address} />
  ));
  return (
    <section className="profileContent">
      <span className="addNewAddressSpan">
        <AiOutlinePlus color="white" />
        <button
          onClick={() =>
            dispatchAddressAndOrders({ type: "setModal", payload: true })
          }
        >
          Add New Address{" "}
        </button>
      </span>

      <section className="addressList">{addressData}</section>

      <section
        className={showModal ? "addNewAddressModal" : "hideModal"}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add a New Address</h3>
        <form action="" onSubmit={addNewAddressHandler}>
          <input
            className="addNewAddressInput"
            type="text"
            // pattern="[A-Za-z]"
            title="name in letters"
            autoComplete="off"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            required
            placeholder="Enter name"
          />
          <input
            className="addNewAddressInput"
            autoComplete="off"
            value={details.street}
            onChange={(e) => setDetails({ ...details, street: e.target.value })}
            required
            type="text"
            placeholder="Enter street/locality name"
          />

          <input
            className="addNewAddressInput"
            autoComplete="off"
            value={details.city}
            // pattern="[A-Za-z]"
            title="cityname in letters"
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            required
            type="text"
            placeholder="Enter city "
          />
          <input
            className="addNewAddressInput"
            autoComplete="off"
            value={details.state}
            // pattern="[A-Za-z]"
            title="state name in letters"
            onChange={(e) => setDetails({ ...details, state: e.target.value })}
            required
            type="text"
            placeholder="Enter state "
          />

          <input
            className="addNewAddressInput"
            autoComplete="off"
            // pattern="[A-Za-z]"
            title="country name in letters"
            value={details.country}
            onChange={(e) =>
              setDetails({ ...details, country: e.target.value })
            }
            required
            type="text"
            placeholder="Enter Country "
          />

          <input
            className="addNewAddressInput"
            autoComplete="off"
            value={details.pincode}
            onChange={(e) =>
              setDetails({ ...details, pincode: e.target.value })
            }
            required
            type="number"
            placeholder="Enter pincode"
          />

          <input
            className="addNewAddressInput"
            autoComplete="off"
            value={details.Mobile}
            onChange={(e) => setDetails({ ...details, Mobile: e.target.value })}
            required
            type="number"
            placeholder="Contact No."
          />

          <section className="addNewAddressModalButtons">
            <button className="addNewAddressModalButton" type="submit">
              ADD
            </button>
            <button
              className="addNewAddressModalButton"
              onClick={cancelHandler}
            >
              CANCEL
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

function MyOrders() {
  const {
    addressAndOrders: { orders },
  } = useAddressAndOrdersContext();

  const ordersPageData = [...orders]
    .reverse()
    .map((order) => <OrderCard data={order} />);
  return (
    <>
      {orders.length === 0 ? (
        <h1 style={{ padding: "1rem 0" }}>No orders</h1>
      ) : (
        <section className="orderHistory">{ordersPageData} </section>
      )}
    </>
  );
}

const AddressCard = ({ data }) => {
  const { dispatchAddressAndOrders } = useAddressAndOrdersContext();

  const { id, name, street, city, pincode, state, country, Mobile } = data;
  return (
    <section className="addressCard">
      <h3>{name}</h3>
      <p>{street}</p>
      <p>{city}</p>
      <p>
        {state},{country},{pincode}
      </p>
      <p>{Mobile}</p>
      <span className="addressCardButtons">
        <button
          onClick={() =>
            dispatchAddressAndOrders({ type: "removeAddress", payload: id })
          }
        >
          Remove
        </button>
      </span>
    </section>
  );
};

function OrderCard({ data }) {
  const {
    TotalPaid,
    paymentId,
    OrderId,
    DeliveryLocation,
    Contact,
    EstimatedDelivery,
    ProductsOrdered,
  } = data;
  return (
    <section className="orderHistoryCard">
      <section className="orderDetailsThisThat">
        <p>
          Payment id: <span className="highlightedDetail">{paymentId}</span>
        </p>
        <p>
          Estimated delivery by:{" "}
          <span className="highlightedDetail">{EstimatedDelivery}</span>
        </p>
        <p>
          Delivering at:{" "}
          <span className="highlightedDetail">{DeliveryLocation}</span>
        </p>
        <p>
          Contact number: <span className="highlightedDetail">{Contact}</span>
        </p>
        <p>
          Total order value:{" "}
          <span className="highlightedDetail">{TotalPaid}</span>{" "}
        </p>
        <p>Products ordered:</p>
      </section>
      <section className="orderDetailsActualDetails">
        {ProductsOrdered.map((product) => (
          <OrderedProductCard data={product} />
        ))}
      </section>
    </section>
  );
}

function OrderedProductCard({ data }) {
  const { image, name, qty, color, offerPrice } = data;
  return (
    <section className="OrderedProductCard">
      <section className="orderImg">
        <img width="96px" height="96px" src={image[0]} alt="" />
      </section>
      <section className="orderProductCardDetail">
        <h3>{name}</h3>
        <p>Color: {color}</p>
        <p>Price: {offerPrice}</p>
        <p>Quantity: {qty}</p>
      </section>
    </section>
  );
}
