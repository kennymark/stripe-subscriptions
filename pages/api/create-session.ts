import stripe from '../../utils/stripe-config';



var fullUrl = (req) => req.protocol + '://' + req.headers.host;

export default async (req, res) => {
  const url = req.headers.referer

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1Hv8WtCNCCyfBLO5VV7DyvF7',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${url}?success=true`,
    cancel_url: `${url}?canceled=true`,
  });

  res.json({ id: session.id });

}