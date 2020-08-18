import { Box, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, useToast, Spinner } from "@chakra-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import http from "axios";
import { useEffect, useState } from "react";
import useCountries from "use-countries";
import ActionButton from "../components/action-button";
import { payStyle } from "../components/checkout.style";
import Header from "../components/header";
import { stripeCardOptions } from "../utils/stripe-browser";
import { toastOptions } from "../utils/toast-options";



// SCA Card 4000000000003220
const PayForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [postCode, setPostCode] = useState()
  const { countries, country, setCountry } = useCountries();
  const [clientSecret, setClientSecret] = useState()
  const toast = useToast()
  const errorColor = "#fa755a";



  const products = [
    { id: "margiela", quantity: 2 },
    { id: "perfum", quantity: 4 }
  ];

  const labelStyle = { fontSize: 14, color: 'gray.600' }

  useEffect(() => {
    getClientSecret();
  }, []);

  async function getClientSecret() {
    const { data } = await http.post("/api/get-secret", { products });
    setClientSecret(data?.client_secret)
  };

  async function initializePayment(e) {
    e.preventDefault();
    if (!stripe || !elements) { return }
    const card = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({ type: "card", card: card });
    if (error) {
      console.log("[error]", error);
    } else {
      setProcessing(true)
      handleCardPayment(clientSecret);
    }
  };

  async function handleCardPayment(clientSecret) {
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name, email, address: { country: country.code, postal_code: postCode } }
      }
    });
    handlePaymentSuccesssOrFailure(result);
  };

  function handlePaymentSuccesssOrFailure(result) {
    console.log({ result })
    if (result.error) {
      toast({ title: 'Payment failure', description: result.error.message, status: 'error', ...toastOptions })
      setProcessing(false)
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast({ title: 'Payment complete', description: 'Your payment has succeeded. Please await a confirmation email', status: 'success', ...toastOptions })
        setPaid(true);
        setProcessing(false)
      }

    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };


  return (
    <Box>
      <Header />

      <Heading color='red.400' size='lg' textAlign='center' mb={10}>
        Pay with Card
      </Heading>

      <Box as='form' onSubmit={initializePayment} >

        <FormControl mb={2}>
          <FormLabel {...labelStyle}>Email</FormLabel>
          <Input id="email" rounded='lg' onChange={({ target }) => setEmail(target.value)} focusBorderColor="gray.400" />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel {...labelStyle}>Card Information</FormLabel>
          <CardElement
            id="card-element"
            options={stripeCardOptions}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel {...labelStyle}>Name</FormLabel>
          <Input id="name" rounded='lg' focusBorderColor="gray.400" onChange={({ target }) => setName(target.value)} />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel {...labelStyle}>Country</FormLabel>
          <Select icon='chevron-down' iconSize={8} onChange={({ target }) => setCountry(target.value as any)} focusBorderColor="gray.400">
            {countries.map(item => (
              <option value={item.code} key={item.code}>{item.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={2}>
          <FormLabel {...labelStyle}>Post Code</FormLabel>
          <Input id="country" rounded='lg' focusBorderColor="gray.400" onChange={({ target }) => setPostCode(target.value)} />
        </FormControl>


        <FormErrorMessage style={{ color: errorColor, marginBottom: 10 }}>
          {error}
        </FormErrorMessage>

        <ActionButton>
          {!processing ? 'Pay £20' : <Processing />}
        </ActionButton>
        <style>{payStyle(errorColor)}</style>
      </Box>
    </Box>

  );
};

const Processing = () => (
  <>Processing
    <Spinner color="red.600" ml={6} />
  </>
)
export default PayForm;
