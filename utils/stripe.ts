import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: '2020-03-02',
    maxNetworkRetries: 1,
    telemetry: false,

  }
);


const stripeCardOptions = {
  hidePostalCode: true,
  style: {
    base: {
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },

    },
    invalid: {
      iconColor: '##fa755a',
      color: '##fa755a',
    },
  },
}

export { stripeCardOptions, stripePromise }


export default stripe