/* eslint-disable */
import { useEffect, useState,useContext } from "react";
import stepperContex from '../../context/stepperContext';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { getPublishKey, stripePost } from '../../api/api'
import toast,{ Toaster } from "react-hot-toast";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { setPaymentId } = useContext(stepperContex);


  useEffect(() => {
    getPublishKey().then(async (res) => {
      const { publishableKey } = await res.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    stripePost().then(async (result) => {
      const { clientSecret, paymentId } = await result.data;
      setPaymentId(paymentId)
      setClientSecret(clientSecret);
    }).catch((err) =>{
      toast.error('error')
    })
  }, []);
  

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;