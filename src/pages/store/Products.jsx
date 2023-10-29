import { useContext } from "react";
import { ProductContext } from "@/contexts/ProductContext";
import Product from "@/components/Product";

const Products = () => {
  const { products } = useContext(ProductContext);

  const productsCategory = {};

  products.forEach((product) => {
    const { category } = product;
    if (!(category.name in productsCategory)) {
      productsCategory[category.name] = [];
    }
    productsCategory[category.name].push(product);
  });
  // console.log(products);

  // const filterProducts = products.filter(item => {
  // 	return item.category.name === 'Laptop'
  // })

  // console.log(filterProducts)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* <div>
          {Object.keys(productsCategory).map((categoryName) => (
            <div key={categoryName} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {productsCategory[categoryName].map((product) => (
                  <div key={product.id} className="p-4">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}
        <Product maxProductToShow={15} />
      </div>
    </section>
  );
};

export default Products;
