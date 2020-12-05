import { Box, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import http from "axios";
import { useState } from "react";
import { usePayment } from "../context/payment-context";
import { toastOptions } from "../utils/toast-options";
import ActionButton from "./action-button";
import style from "./checkout.style";
import SelectedSubscription from "./selected-subscription";

// SCA Card 4000000000003220
const CheckoutForm = ({ selectedTab }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState('')
  const { priceId, customerId } = usePayment()
  const toast = useToast()

  const errorColor = "#fa755a";


  const cardOptions = {
    hidePostalCode: true,
    style: { base: { fontSize: "18px", backgroundColor: '#EDF2F7' } }
  };


  const setupPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    const { error, paymentMethod: { id } } = await stripe.createPaymentMethod({ type: "card", card });

    if (error) {
      console.log("[error]", error);
    } else {
      createSubscription({ paymentMethodId: id, customerId, priceId, })
    }
  };

  async function handle3DSecurePayment(clientSecret) {
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name }
      }
    });
    handlePaymentSuccesssOrFailure(result);
  };

  const handlePaymentSuccesssOrFailure = (result) => {
    console.log({ result })
    if (result.error) {
      toast({ title: 'Subscription failure', description: result.error.message, status: 'error', ...toastOptions })

    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast({ description: 'Subscription complete', status: 'success', ...toastOptions })
        setPaid(true);
      }
    }
  };

  async function handleChange(event) {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  async function createSubscription({ customerId, paymentMethodId, priceId }) {
    const { data } = await http.post('/api/create-subscription', { customerId, paymentMethodId, priceId, name })

    if (data.status === 'active') {
      console.log(data)
      toast({ description: 'Subscription complete', status: 'success', ...toastOptions })
    }

    if (data.status === 'incomplete') {
      handle3DSecurePayment(data.latest_invoice.payment_intent.client_secret)
    }

  }

  return (
    <Box as='form' onSubmit={setupPayment}>

      <SelectedSubscription />

      <FormControl mb={2}>
        <FormLabel fontSize={12} color='gray.600' fontWeight='bold'>FULL NAME</FormLabel>
        <Input id="name" aria-describedby="email-helper-text" placeholder='Malcolm X' rounded='lg' size='lg' variant="filled" onChange={({ target }) => setName(target.value)} />
      </FormControl>

      <div className="form-row">
        <FormLabel htmlFor="card-element" fontSize={13} color='gray.600' fontWeight='bold'> CARD</FormLabel>
        <CardElement
          id="card-element"
          options={cardOptions}
          onChange={handleChange}
        />

        <FormErrorMessage style={{ color: errorColor, marginBottom: 10 }}>
          {error}
        </FormErrorMessage>
      </div>
      <ActionButton>Subscribe</ActionButton>
      <style>{style(errorColor)}</style>
    </Box>
  );
};

export default CheckoutForm;
