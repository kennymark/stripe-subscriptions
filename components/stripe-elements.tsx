import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);

function StripeElements({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}

export default StripeElements
