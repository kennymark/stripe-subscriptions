import stripe from "../../utils/stripe";




export default async (req, res) => {
  const customer = await stripe.customers.retrieve(req.body.customerId, {
    expand: ['invoice_settings.default_payment_method']
  })

  res.json({ ...customer })
}