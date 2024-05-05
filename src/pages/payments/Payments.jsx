import { useState, useEffect } from "react";
import PaymentsMessage from "@/components/PaymentsMessage";
import { API_BASE_URL } from "@/utils/constants";
import useAxios from "@/utils/useAxios";

const ProductDisplay = () => {
  const instance = useAxios();

  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form
        action={instance.post("stripe/create-checkout-session/")}
        method="POST"
      >
        <button type="submit">Pay Now</button>
      </form>
    </section>
  );
};

const Payments = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <PaymentsMessage message={message} /> : <ProductDisplay />;
};

export default Payments;
