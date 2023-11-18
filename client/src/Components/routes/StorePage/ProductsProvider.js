//This component is used to get all the product from MongoDB and pass it to all children

import {ContextProduct} from "../../Reused/ContextProducts";
import { useEffect } from "react";
import { useState } from "react";

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("/get-products")
      .then((response) => response.json())
      .then((parsedObject) => {
        setProducts(parsedObject.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return (
    <ContextProduct.Provider value={{ products }}>
      {children}
    </ContextProduct.Provider>
  );
};
