import { useState, useEffect, createContext } from "react";
import { fetchProduct } from "@/utils/store";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProduct()
      .then((response) => {
        if (response.status === 200) {
          // console.log(response);
          setProducts(response.data);
        }
      })
      .catch((error) => {
        // console.log('An error occurred: ', error)
        if (error.response.status === 400) {
          Object.keys(error.response.data).forEach((field) => {
            error.response.data[field].forEach((message) => {
              toast.error(message);
            });
          });
        } else {
          toast.error("An error occured");
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
