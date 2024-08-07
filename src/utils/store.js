import api from "./axios";
import useAxios from "./useAxios";

export const fetchProduct = async () => {
  const response = await api.get("store/products/");
  return response;
};

export const fetchOneProduct = async (id) => {
  const response = await api.get(`store/products/${id}`);
  return response;
};

export const fetchCategory = async () => {
  const response = await api.get("store/categories/");
  console.log(response);
  return response;
};

export const placeOrder = async (
  items,
  first_name,
  last_name,
  email,
  phone_number,
  address,
  postal_code,
  city
) => {
  const instance = useAxios();
  const response = await instance.post("order/", {
    items,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    postal_code,
    city,
  });
  return response;
};
