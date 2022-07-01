import { createContext, useState, useEffect } from "react";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils";

// import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
  /* 
  // only run this once on first time initializing Firestore and then comment this out
  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []); 
  */

  useEffect(() => {
    // don't directly make this callback an async, create an async inside this callback instead
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoryMap();
  }, []);

  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
