import stripe from "../../utils/stripe-config";




export default async (req, res) => {

  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethodId
  );

  res.json(paymentMethod);

};
