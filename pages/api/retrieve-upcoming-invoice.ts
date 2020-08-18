import stripe from "../../utils/stripe-browser";



export default async (req, res) => {
  const { customerId, subscriptionId, newPriceId } = req.body
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );

  const invoice = await stripe.invoices.retrieveUpcoming({
    subscription_prorate: true,
    customer: customerId,
    subscription: subscriptionId,
    subscription_items: [
      {
        id: subscription.items.data[0].id,
        deleted: true,
      },
      {
        // This price ID is the price you want to change the subscription to.
        price: newPriceId,
        deleted: false,
      },
    ],
  });
  res.json(invoice);
}