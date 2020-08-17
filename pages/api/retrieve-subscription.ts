import stripe from "../../utils/stripe";



export default async (req, res) => {

  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethodId
  );

  res.json(paymentMethod);

};
