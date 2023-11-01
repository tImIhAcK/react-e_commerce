import { useState, useEffect, createContext } from "react";
import { fetchProduct } from "@/utils/store";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchProduct()
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data?.results);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Object.keys(error.response.data).forEach((field) => {
            error.response.data[field].forEach((message) => {
              toast.error(message);
            });
          });
        } else {
          toast.error("An error occurred");
        }
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node,
};

export default ProductProvider;
