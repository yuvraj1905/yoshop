export function addressAndOrderReducer(state, { type, payload }) {
  switch (type) {
    case "addNewAddress": {
      return {
        ...state,
        addresses: [...state.addresses, { ...payload }],
      };
    }

    case "setModal": {
      return {
        ...state,
        showModal: payload,
      };
    }

    case "countHandler": {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case "removeAddress": {
      const newAddressData = state.addresses.filter(({ id }) => id !== payload);
      return {
        ...state,
        addresses: [...newAddressData],
      };
    }

    case "addressSelector": {
      return { ...state, addressSelected: payload };
    }

    case "orderPlaced": {
      return { ...state, orders: [...state.orders, payload] };
    }

    default:
      return { ...state };
  }
}
