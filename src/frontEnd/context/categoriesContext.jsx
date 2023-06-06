import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const categoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const categoriesDataFromApi = async () => {
    try {
      const {
        data: { categories },
        status,
      } = await axios.get("/api/categories");
      console.log(categories);
      if (status === 200) setCategoriesList([...categories]);
      console.log(categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    categoriesDataFromApi();
  }, []);

  return (
    <categoriesContext.Provider value={{ categoriesList }}>
      {children}
    </categoriesContext.Provider>
  );
};

const useCategoriesContext = () => useContext(categoriesContext);

export { useCategoriesContext, CategoriesProvider };
