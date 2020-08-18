import stripe from "../../utils/stripe-browser";

// Change the default invoice settings on the customer to the new payment method
async function updateCustomerInvoice({ name, customerId, paymentMethodId }) {
  await stripe.customers.update(customerId,
    {
      name,
      invoice_settings: { default_payment_method: paymentMethodId },
    }
  );
}

export default async (req, res) => {
  const { paymentMethodId, priceId, customerId, name } = req.body

  try {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  await updateCustomerInvoice({ name, customerId, paymentMethodId })

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    expand: ['latest_invoice.payment_intent'],
    // cancel_at: unix-timestamp
  });

  res.send(subscription);
};
