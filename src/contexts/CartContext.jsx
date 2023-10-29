import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAuthStore } from "@/storage/auth";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const user = useAuthStore((state) => state.user);
  const userId = user.user_id;

  // Function to load the cart associated with a user
  function loadUserCart(userId) {
    const userCartCookie = Cookies.get(`user_cart_${userId}`);
    return userCartCookie ? JSON.parse(userCartCookie) : [];
  }

  // Function to save the user's cart data
  function saveUserCart(userId, cart) {
    Cookies.set(`user_cart_${userId}`, JSON.stringify(cart), {
      expires: 7,
      secure: true,
    });
  }

  useEffect(() => {
    const cookieCart = loadUserCart(userId);
    if (cookieCart) {
      setCart(cookieCart);
    }
  }, [userId]);

  useEffect(() => {
    saveUserCart(userId, cart);
  }, [userId, cart]);

  useEffect(() => {
    const count = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemCount(count);
  }, [setItemCount, cart]);

  const addToCart = (product, id, showToast = true) => {
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          setItemCount(itemCount + 1);
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
    if (showToast) {
      toast.success(`Your item has added to cart`);
    }
  };

  const removeFromCart = (id) => {
    const newItem = cart.filter((item) => {
      setItemCount(itemCount - 1);
      return item.id !== id;
    });
    setCart(newItem);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const item = cart.find((item) => item.id == id);
    addToCart(item, id, false);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
