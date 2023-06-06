export const userStateReducer = (state, { type, payload }) => {
  switch (type) {
    case "dataSetter": {
      return {
        ...state,
        isLoggedIn: true,
        cart: payload.foundUser.cart,
        wishlist: payload.foundUser.wishlist,
        token: payload.encodedToken,
        foundUserData: payload.foundUser,
        loggedInUserCredentials: [
          payload.foundUser.lastName,
          payload.foundUser.email,
        ],
      };
    }

    case "credentialsSetter": {
      return {
        ...state,
        loggedInUserCredentials: [...payload],
      };
    }

    case "logout": {
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        foundUserData: {},
        loggedInUserCredentials: [],
        cart: [],
        wishlist: [],
        address: [],
        orderHistory: [],
      };
    }

    case "cartDataModifier": {
      return {
        ...state,
        cart: [...payload],
      };
    }
    case "wishlistDataModifier": {
      return {
        ...state,
        wishlist: [...payload],
      };
    }

    case "orderPlaced": {
      return {
        ...state,
        orderHistory: [...state.orderHistory, payload],
      };
    }

    default:
      return { ...state };
  }
};
