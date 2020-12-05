import stripe from '../../utils/stripe-config';


export default async (req, res) => {

  // Authenticate your user.
  const session = await stripe.billingPortal.sessions.create({
    customer: req.body.customerId,
    return_url: req.headers.referer,
  });
  console.log(session.url)
  res.json(session.url);

}