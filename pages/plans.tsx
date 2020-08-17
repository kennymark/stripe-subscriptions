import { Heading, Stack, Text } from "@chakra-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutForm from "../components/checkout-form";
import Header from "../components/header";
import SubscriptionSegment from "../components/subscription-segment";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);

console.log(process.env)
function Subscribe() {
  const [tabIndex, setTabIndex] = useState(0);


  return (
    <Elements stripe={stripePromise}>

      <Header title='Sign up' />
      <Heading color='red.400' size='lg' textAlign='center' mb={10}>Subscribe to a plan</Heading>

      <SubscriptionSegment tabIndex={tabIndex} onChange={val => setTabIndex(val)} />

      <Stack mt={10} border='1px' borderColor='gray.200' p={5} rounded='lg'>
        <Text fontWeight={700} fontSize={22} textAlign='center'>Enter your card details</Text>
        <Text fontWeight={700} fontSize={20} textAlign='center' >Subscription will start now</Text>

        <CheckoutForm selectedTab={tabIndex} />

      </Stack>
    </Elements >
  )
}

export default Subscribe;
