import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./frontEnd/pages/Home";
import Store from "./frontEnd/pages/Store";
import Wishlist from "./frontEnd/pages/Wishlist";
import DetailsPage from "./frontEnd/pages/DetailsPage";
import Cart from "./frontEnd/pages/Cart";
import Header from "./frontEnd/components/Header";
import Footer from "./frontEnd/components/Footer";
import Profile from "./frontEnd/pages/Profile";
import SearchPage from "./frontEnd/pages/SearchPage";
import ProtectedAuth from "./frontEnd/components/ProtectedAuth";
import Login from "./frontEnd/pages/Login";
import Signup from "./frontEnd/pages/Signup";
import Checkout from "./frontEnd/pages/Checkout";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import OrderSuccessfull from "./frontEnd/pages/OrderSuccessfull";
import { useEffect } from "react";
import { scrollUp } from "./frontEnd/Utils/scrollUp";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollUp();
  }, [pathname]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route
          path="/cart"
          element={
            <ProtectedAuth>
              <Cart />
            </ProtectedAuth>
          }
        />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route
          path="/profile/:profileRoute"
          element={
            <ProtectedAuth>
              <Profile />
            </ProtectedAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedAuth>
              <Wishlist />
            </ProtectedAuth>
          }
        />
        <Route path="/details/:productId" element={<DetailsPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="orderSuccessfull" element={<OrderSuccessfull />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
