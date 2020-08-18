import stripe from "../../utils/stripe-config";



export default async (req, res) => {
  const customer = await stripe.customers.create({
    email: req.body.email,
  });
  res.json(customer)
}