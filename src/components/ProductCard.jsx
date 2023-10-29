import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";

const ProductCard = ({ product, addToCart }) => {
  const { id, name, image, price } = product;
  return (
    <div className="product-card">
      <img src={image} className="product-image" />

      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-xl font-bold mb-2 tracking-tight">{name}</h3>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${price}</span>
            <span className="text-sm text-slate-900 line-through">$99</span>
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => addToCart(product, id)}
            className="flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-2 mr-2 rounded transition duration-200 hover:bg-white hover:text-red-500 hover:border border-red-500"
          >
            <FaShoppingCart /> Add to cart
          </button>

          <Link to={`/product/${id}`}>
            <button className="flex justify-center items-center gap-2 bg-white text-blue-500 px-4 py-2 rounded transition duration-200 border border-blue-500 hover:bg-blue-500 hover:text-white">
              <BsEyeFill /> View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};

export default ProductCard;
