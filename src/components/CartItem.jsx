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
    // <div className="flex flex-col rounded-lg bg-white sm:flex-row border-b gap-x-4">
    //   <img
    //     className="m-2 h-24 w-28 rounded-md border object-cover object-center"
    //     src={image}
    //     alt=""
    //   />
    //   <div className="flex w-full flex-col px-4 py-4">
    //     <Link to={`/product/${id}`}>
    //       <span className="font-semibold">{name}</span>
    //     </Link>
    //     <p className="text-lg font-bold">${price}</p>
    //     <div className="flex items-center gap-8 mt-2">
    //       <button onClick={() => decreaseAmount(id)} className="text-red-500">
    //         <FaMinus />
    //       </button>
    //       <span className="mx-2">{amount}</span>
    //       <button
    //         onClick={() => increaseAmount(id)}
    //         className="text-green-500 mr-12"
    //       >
    //         <FaPlus />
    //       </button>
    //       <button onClick={() => removeFromCart(id)} className="text-gray-500">
    //         <IoMdClose />
    //       </button>
    //     </div>
    //     <p className="text-gray-500 mt-2">
    //       Total: ${parseFloat(amount * price).toFixed(2)}{" "}
    //       {/* Calculate the total price */}
    //     </p>
    //   </div>
    // </div>

    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="shrink-0">
        <img
          className="h-24 w-24 max-w-full rounded-lg object-cover"
          src={image}
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <Link to={`/product/${id}`}>
              <p className="text-base font-semibold text-gray-900">{name}</p>
            </Link>
            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{price}</p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
              Total: ${parseFloat(amount * price).toFixed(2)}{" "}
            </p>

            <div className="sm:order-1">
              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                <button
                  onClick={() => decreaseAmount(id)}
                  className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                >
                  {" "}
                  <FaMinus />
                </button>
                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                  {amount}
                </div>
                <button
                  onClick={() => increaseAmount(id)}
                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => removeFromCart(id)}
                  className="text-gray-500"
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
          <button
            type="button"
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
          ></button>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
