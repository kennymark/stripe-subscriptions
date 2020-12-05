import { Heading, Stack, Text } from "@chakra-ui/core";
import { useState } from "react";
import CheckoutForm from "../components/checkout-form";
import Header from "../components/header";
import SubscriptionSegment from "../components/subscription-segment";
import StripeElements from "../components/stripe-elements";



function Subscribe() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <StripeElements>

      <Header title='Sign up' />
      <Heading color='red.400' size='lg' textAlign='center' mb={10}>
        Subscribe to a plan
      </Heading>

      <SubscriptionSegment tabIndex={tabIndex} onChange={val => setTabIndex(val)} />

      <Stack mt={10} border='1px' borderColor='gray.200' p={5} rounded='lg'>
        <Text fontWeight={700} fontSize={22} textAlign='center'>Enter your card details</Text>
        <Text fontWeight={700} fontSize={20} textAlign='center' >Subscription will start now</Text>

        <CheckoutForm selectedTab={tabIndex} />
      </Stack>

    </StripeElements>
  )
}

export default Subscribe;
