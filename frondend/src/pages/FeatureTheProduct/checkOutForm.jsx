/* eslint-disable */
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { updateToFeature } from "../../api/api";
import stepperContext from "../../context/stepperContext";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { data, setData, handleClick } = useContext(stepperContext);
  console.log(handleClick);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `${window.location.origin}/completion`,
      // },
      redirect: "if_required",
    });
    console.log(error);
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("payment Status:" + paymentIntent.status);
      updateToFeature(data).then((res) => {
        toast.success("successfully done");
        handleClick("next");
      });
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded inline-block mx-auto"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div className="text-red-800" id="payment-message">{message}</div>}
      <Toaster />
    </form>
  );
}
