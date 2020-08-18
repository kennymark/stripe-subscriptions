

export const basicPriceId = "price_1HGErUCNCCyfBLO5POz8cQxk";
export const premiumPriceId = "price_1HGErUCNCCyfBLO582B6fxzL";

import { Box, FormControl, Input, Text, Flex, useToast } from "@chakra-ui/core";
import ActionButton from "../components/action-button";
import Header from "../components/header";
import { useState } from "react";
import http from 'axios'
import { usePayment } from "../context/payment-context";
import { toastOptions } from "../utils/toast-options";

function Signup() {
  const [email, setEmail] = useState('')
  const { setCustomer } = usePayment()
  const toast = useToast()

  const createCustomer = async (e) => {
    e.preventDefault()
    console.log({ email })
    if (email) {
      const { data } = await http.post('/api/create-customer', { email })
      setCustomer(data)
    }
    else {
      toast({ status: 'error', description: 'Enter email please', ...toastOptions })
    }
  }

  return (
    <Box >
      <Header />

      <Flex justify='center' mb={20} direction={['column', 'row',]} align='center'>
        <Box size={[200, '100%']} bg='gray.200' mr={3} rounded='lg'></Box>
        <Box size={[200, 400]} bg='red.400' rounded='lg' mt={50}></Box>
      </Flex>

      <Box as='form' onSubmit={createCustomer} >
        <FormControl mb={2}>
          <Input type="email" id="email" placeholder='Email' rounded='lg' size='lg' onChange={({ target }) => setEmail(target.value)} />
        </FormControl>

        <Text my={2} color="red.300" fontWeight='bold' fontSize={18} textAlign='center'>
          Unlimited photo sharing hosting and more. Cancel anytime.
      </Text>

        <ActionButton >Sign up</ActionButton>
      </Box>

    </Box>
  );
}

export default Signup;
