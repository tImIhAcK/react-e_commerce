import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const cartTotalPrice = calculateTotalPrice();
    setShippingCost(cartTotalPrice * 0.005);
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.amount, 0);
  };

  const calculateFinalTotalPrice = () => {
    const subtotal = calculateTotalPrice();
    const total = subtotal + shippingCost;
    return total.toFixed(2);
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-[32px] sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Order Summary
            </h1>
          </div>

          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <div className="-my-8">
                    {cart.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {calculateTotalPrice()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${shippingCost}
                    </p>
                  </div>
                </div>

                <CartSummary finalTotalPrice={calculateFinalTotalPrice()} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;
