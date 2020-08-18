import stripe from "../../utils/stripe-browser";



export default async (req, res) => {
  const { subscriptionId, newPriceId } = req.body
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );
  const updatedSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      cancel_at_period_end: false,
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    }
  );

  res.send(updatedSubscription);
};
