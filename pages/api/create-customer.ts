import stripe from "../../utils/stripe";


export default async (req, res) => {
  const customer = await stripe.customers.create({
    email: req.body.email,
  });
  res.json(customer)
}