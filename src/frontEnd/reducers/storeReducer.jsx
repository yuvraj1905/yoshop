function storeReducer(state, { type, payload }) {
  switch (type) {
    case "dataSetter": {
      return { ...state, displayData: [...payload], fullData: [...payload] };
    }

    case "priceMeterValue": {
      return { ...state, priceMeterValue: payload };
    }

    case "sideBarToggler": {
      return { ...state, sideBar: !state.sideBar };
    }

    case "categoryChangeHandler": {
      return {
        ...state,
        categorySelected: state.categorySelected.includes(payload)
          ? [
              ...state.categorySelected.filter(
                (category) => category !== payload
              ),
            ]
          : [...state.categorySelected, payload],
      };
    }

    case "categoryResetHandler": {
      return {
        ...state,
        categorySelected: [],
      };
    }

    case "colorChangeHandler": {
      return {
        ...state,
        colorsSelected: state.colorsSelected.includes(payload)
          ? [...state.colorsSelected.filter((color) => color !== payload)]
          : [...state.colorsSelected, payload],
      };
    }

    case "setInpDisplay": {
      return {
        ...state,
        inpDisplay: payload,
      };
    }

    case "setSearchInput": {
      return {
        ...state,
        searchInput: payload,
      };
    }

    case "brandsChangeHandler": {
      return {
        ...state,
        brandsSelected: state.brandsSelected.includes(payload)
          ? [...state.brandsSelected.filter((brand) => brand !== payload)]
          : [...state.brandsSelected, payload],
      };
    }

    case "ratingChangeHandler": {
      return {
        ...state,
        ratingSelected: payload,
      };
    }

    case "sortingChangeHandler": {
      return {
        ...state,
        sorting: payload,
      };
    }

    case "resetFilters": {
      return {
        ...state,
        priceMeterValue: 50000,
        categorySelected: [],
        colorsSelected: [],
        brandsSelected: [],
        ratingSelected: 1,
        sorting: "",
      };
    }

    case "previousSearchHandler": {
      const newPrevious = [...state.previousSearch];
      newPrevious.pop();
      newPrevious.unshift(payload);

      return {
        ...state,
        previousSearch: [...newPrevious],
      };
    }

    case "setDisplaySearchModal": {
      return { ...state, displaySearchModal: payload };
    }

    case "checkoutPriceSetter": {
      return { ...state, checkoutPrice: payload };
    }

    default:
      return { ...state };
  }
}

export default storeReducer;
