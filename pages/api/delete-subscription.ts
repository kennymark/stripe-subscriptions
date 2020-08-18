import stripe from "../../utils/stripe-config";




export default async (req, res) => {
  const deletedSubscription = await stripe.subscriptions.del(
    req.body.subscriptionId
  );
  res.send(deletedSubscription);
};
