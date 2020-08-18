import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: '2020-03-02',
    maxNetworkRetries: 1,
    telemetry: false,

  }
);