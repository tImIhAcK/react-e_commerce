import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

const CartItem = ({ item }) => {
  const { id, name, price, image, amount } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  return (
    <div className="flex flex-col rounded-lg bg-white sm:flex-row border-b gap-x-4">
      <img
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={image}
        alt=""
      />
      <div className="flex w-full flex-col px-4 py-4">
        <Link to={`/product/${id}`}>
          <span className="font-semibold">{name}</span>
        </Link>
        <p className="text-lg font-bold">${price}</p>
        <div className="flex items-center gap-8 mt-2">
          <button onClick={() => decreaseAmount(id)} className="text-red-500">
            <FaMinus />
          </button>
          <span className="mx-2">{amount}</span>
          <button
            onClick={() => increaseAmount(id)}
            className="text-green-500 mr-12"
          >
            <FaPlus />
          </button>
          <button onClick={() => removeFromCart(id)} className="text-gray-500">
            <IoMdClose />
          </button>
        </div>
        <p className="text-gray-500 mt-2">
          Total: ${parseFloat(amount * price).toFixed(2)}{" "}
          {/* Calculate the total price */}
        </p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
