import { useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "@/contexts/CartContext";
import { ProductContext } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

// const useProducts = ({ maxProductToShow }) => {
//   const { products } = useContext(ProductContext);
//   console.log(products);

//   const [productList, setProductList] = useState([]);

//   useEffect(() => {
//     if (products.length === 0) {
//       setProductList([]);
//     } else {
//       const newList = products.slice(0, maxProductToShow);
//       setProductList(newList);
//     }
//   }, [products, maxProductToShow]);

//   return productList;
// };

const Product = ({ maxProductToShow }) => {
  const { addToCart } = useContext(CartContext);
  // const { products } = useProducts(maxProductToShow);

  const { products } = useContext(ProductContext);

  const productsCategory = {};

  products?.forEach((product) => {
    const { category } = product;
    if (!(category.name in productsCategory)) {
      productsCategory[category.name] = [];
    }
    if (productsCategory[category.name].length < maxProductToShow) {
      productsCategory[category.name].push(product);
    }
  });

  // const [expandedCategories, setExpandedCategories] = useState({});
  // const toggleCategory = (categoryName) => {
  //   setExpandedCategories({
  //     ...expandedCategories,
  //     [categoryName]: !expandedCategories[categoryName],
  //   });
  // };

  // console.log(products);

  // const filterProducts = products.filter(item => {
  // 	return item.category.name === 'Laptop'
  // })

  // console.log(filterProducts)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 py-8">
        <div>
          {Object.keys(productsCategory).map((categoryName) => (
            <div key={categoryName} className="mb-8">
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-medium">
                  {categoryName}
                </h2>
                <Link
                  className="border-b-2 hover:border-red-500 hover:text-red-500"
                  to={"/shop"}
                >
                  show more
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {productsCategory[categoryName].map((product) => (
                  <div key={product.id} className="p-4">
                    <ProductCard product={product} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Product.propTypes = {
  maxProductToShow: PropTypes.number,
};

export default Product;
