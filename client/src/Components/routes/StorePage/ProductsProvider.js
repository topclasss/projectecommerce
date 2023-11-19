//Used to get all the product from MongoDB and pass it to all children

import { ContextProducts } from "../../Reused/ContextProducts";
import { useEffect } from "react";
import { useState } from "react";

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  console.log("products", products)

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
    <ContextProducts.Provider value={{ products }}>
      {children}
    </ContextProducts.Provider>
  );
};
