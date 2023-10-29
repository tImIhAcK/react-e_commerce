import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

const CartSummary = () => {
  const { cart, clearCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.amount, 0);
  };

  return (
    <div className="mt-4">
      <p className="text-lg font-bold">
        Total Price: ${calculateTotalPrice().toFixed(2)}
      </p>
      <button
        onClick={clearCart}
        className="mt-4 p-4 font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer mr-3"
      >
        Clear Cart
      </button>
      <button
        // onClick={checkOut}
        className="mt-4 p-4 font-semibold bg-green-500 text-white rounded-md hover:bg-green-700 cursor-pointer"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
