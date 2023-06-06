import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import storeReducer from "../reducers/storeReducer";

const StoreContext = createContext();

const initialStore = {
  fullData: [],
  displayData: [],
  priceMeterValue: 50000,
  categorySelected: [],
  colorsSelected: [],
  brandsSelected: [],
  ratingSelected: 1,
  sorting: "",
  sideBar: false,
  displaySearchModal: false,
  inpDisplay: false,
  searchInput: "",
  previousSearch: ["tws", "Apple Airpods MAX", "jbl"],
  checkoutPrice:''
};

const StoreContextComponent = ({ children }) => {
  const [store, dispatchStore] = useReducer(storeReducer, initialStore);

  const productDataFromApi = async () => {
    try {
      const {
        data: { products },
        status,
      } = await axios.get("/api/products");
      if (status === 200) {
        dispatchStore({ type: "dataSetter", payload: products });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const brands = [...new Set(store.fullData.map(({ brand }) => brand))];
  const colors = [
    ...new Set(
      store.fullData.map(({ color }) => color[0] + color.slice(1).toLowerCase())
    ),
  ];

  //   const finalRenderingData = "";

  const setSearchInput = (dataPassed) =>
    dispatchStore({ type: "setSearchInput", payload: dataPassed });

  const finalRenderingData = (() => {
    const {
      displayData,
      priceMeterValue,
      categorySelected,
      ratingSelected,
      brandsSelected,
      colorsSelected,
      sorting,
    } = store;

    let filteredData = [];

    //price
    filteredData = displayData.filter(
      ({ offerPrice }) => offerPrice <= priceMeterValue
    );

    //categories
    if (categorySelected.length >= 1) {
      filteredData = filteredData.filter(({ productCategory }) =>
        categorySelected.includes(productCategory)
      );
    }

    filteredData = filteredData.filter(
      ({ rating }) => rating >= ratingSelected
    );

    if (colorsSelected.length >= 1) {
      filteredData = filteredData.filter(({ color }) =>
        colorsSelected.includes(color.toLowerCase())
      );
    }

    if (brandsSelected.length >= 1) {
      filteredData = filteredData.filter(({ brand }) =>
        brandsSelected.includes(brand)
      );
    }

    if (sorting !== "" && sorting !== "Popularity") {
      filteredData =
        sorting === "HTL"
          ? [...filteredData].sort((a, b) => b.offerPrice - a.offerPrice)
          : [...filteredData].sort((a, b) => a.offerPrice - b.offerPrice);
    }
    //"High-To-Low", "Low-To-High"
    return filteredData;
  })();

  useEffect(() => {
    productDataFromApi();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        colors,
        brands,
        dispatchStore,
        finalRenderingData,
        setSearchInput,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStoreContext = () => useContext(StoreContext);

export { useStoreContext, StoreContextComponent };
