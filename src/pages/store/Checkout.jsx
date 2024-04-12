import { placeOrder } from "@/utils/store";
import { useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { cart } = useContext(CartContext);
  const items = cart.map((item) => {
    return {
      price: parseFloat(item.price),
      quantity: item.amount,
      product: item.id,
    };
  });
  console.log(cart);

  const onSubmit = async (values) => {
    setLoading(true);
    setSubmitted(false);

    try {
      const response = await placeOrder(
        items,
        values.first_name,
        values.last_name,
        values.email,
        values.phone_unmber,
        values.address,
        values.postal_code,
        values.city
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      postal_code: "",
      city: "",
    },
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <section className="text-gray-700 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col w-full mb-12 text-left">
          <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
          <div className="border-t border-gray-300 w-full mb-6"></div>
          <div className="flex flex-col sm:flex-row mb-10">
            <div className="flex-grow mr-6">
              <h2 className="text-xl font-semibold mb-4">
                Billing Information
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  formik.handleSubmit();
                }}
                className="w-full"
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium mb-1"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.postal_code}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white rounded-md py-3 px-4 text-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
