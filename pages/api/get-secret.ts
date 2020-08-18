import stripe from "../../utils/stripe-config";



const calculateOrderAmount = (products) => {
  return 20 * 100;
};

// generates secret 
export default async (req, res) => {

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body.products),
      currency: "GBP",
      payment_method_types: ["card"],
      setup_future_usage: "on_session",
      metadata: { order_id: "6735" }
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ error: error.message });
  }
};
