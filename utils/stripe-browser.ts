import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);



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