import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { userStateReducer } from "../reducers/userStateReducer";
import { useAddressAndOrdersContext } from "./AddressAndOrdersContext";

const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
  const { dispatchAddressAndOrders } = useAddressAndOrdersContext();
  const initialUserState = {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    foundUserData: {},
    loggedInUserCredentials: [],
    cart: [],
    wishlist: [],
    address: [],
    orderHistory: [],
  };

  const [userState, dispatchUserState] = useReducer(
    userStateReducer,
    initialUserState
  );

  const signupBtnHandler = async (name, email, password) => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: "Yo ",
        lastName: name,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loginBtnHandler = async (email, password) => {
    console.log("loginBtnHandler called with", email, password);
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.encodedToken);
        localStorage.setItem(
          "userLoggedIn",
          JSON.stringify(response.data.foundUser)
        );
        dispatchUserState({
          type: "dataSetter",
          payload: response.data,
        });
      }
    } catch (err) {
      console.log(err.message);
      return "wrong credentials";
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLoggedIn");
    dispatchUserState({ type: "logout" });
    dispatchAddressAndOrders({ type: "logout" });
  };

  useEffect(() => {
    localStorage.getItem("token") &&
      dispatchUserState({
        type: "credentialsSetter",
        payload: [
          JSON.parse(localStorage.getItem("userLoggedIn")).lastName,
          JSON.parse(localStorage.getItem("userLoggedIn")).email,
        ],
      });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        userState,
        dispatchUserState,
        logoutHandler,
        signupBtnHandler,
        loginBtnHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextComponent, useAuthContext };
