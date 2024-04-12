import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const CartSummary = ({ finalTotalPrice }) => {
  const { clearCart } = useContext(CartContext);

  // const calculateTotalPrice = () => {
  //   return cart.reduce((total, item) => total + item.price * item.amount, 0);
  // };

  return (
    <div className="mt-4">
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          <span className="text-xs font-normal text-gray-400">USD</span>{" "}
          {finalTotalPrice}
        </p>
      </div>
      <button
        onClick={clearCart}
        className="mt-4 p-4 font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer mr-3"
      >
        Clear Cart
      </button>
      <Link
        to="/checkout"
        className="mt-4 p-4 font-semibold bg-green-500 text-white rounded-md hover:bg-green-700 cursor-pointer"
      >
        Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
