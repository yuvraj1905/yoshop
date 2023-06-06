import axios from "axios";

export const addToCartHandler = async (data, token, dispatchUserState) => {
  try {
    const response = await axios.post(
      "/api/user/cart",
      {
        product: data,
      },
      {
        headers: { authorization: token },
      }
    );
    if (response.status === 200 || response.status === 201) {
      dispatchUserState({
        type: "cartDataModifier",
        payload: response.data.cart,
      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlistHandler = async (data, token, dispatchUserState) => {
  try {
    const response = await axios.post(
      "/api/user/wishlist",
      {
        product: data,
      },
      {
        headers: { authorization: token },
      }
    );
    if (response.status === 200 || response.status === 201) {
      dispatchUserState({
        type: "wishlistDataModifier",
        payload: response.data.wishlist,
      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const removeFromWishlistHandler = async (
  id,
  token,
  dispatchUserState
) => {
  try {
    const response = await axios.delete(`/api/user/wishlist/${id}`, {
      headers: { authorization: token },
    });
    if (response.status === 200 || response.status === 201) {
      dispatchUserState({
        type: "wishlistDataModifier",
        payload: response.data.wishlist,
      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCartHandler = async (id, token, dispatchUserState) => {
  try {
    const response = await axios.delete(`/api/user/cart/${id}`, {
      headers: { authorization: token },
    });
    if (response.status === 200 || response.status === 201) {
      dispatchUserState({
        type: "cartDataModifier",
        payload: response.data.cart,
      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const qtyHandler = async (id, type, dispatchUserState, token) => {
  try {
    const response = await axios.post(
      `/api/user/cart/${id}`,
      {
        action: {
          type: `${type}`,
        },
      },
      {
        headers: { authorization: token },
      }
    );
    if (response.status === 200 || response.status === 201) {
      dispatchUserState({
        type: "cartDataModifier",
        payload: response.data.cart,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
