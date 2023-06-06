import { createContext, useContext, useReducer } from "react";
import { addressAndOrderReducer } from "../reducers/addressAndOrderReducer";

const AddressAndOrdersContext = createContext();

const initialValues = {
  addresses: [
    {
      id: 0,
      name: "Yuvraj Thakur",
      street: "123",
      city: "Delhi",
      pincode: 111111,
      state: "Delhi",
      country: "India",
      Mobile: 8080225566,
    },
  ],
  orders: [],
  showModal: false,
  count: 1,
  addressSelected: 0,
};

export const AddressAndOrdersContextProvider = ({ children }) => {
  const [addressAndOrders, dispatchAddressAndOrders] = useReducer(
    addressAndOrderReducer,
    initialValues
  );

  return (
    <AddressAndOrdersContext.Provider
      value={{ addressAndOrders, dispatchAddressAndOrders }}
    >
      {children}
    </AddressAndOrdersContext.Provider>
  );
};

export const useAddressAndOrdersContext = () =>
  useContext(AddressAndOrdersContext);
