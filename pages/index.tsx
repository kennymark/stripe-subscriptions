

export const basicPriceId = "price_1HGErUCNCCyfBLO5POz8cQxk";
export const premiumPriceId = "price_1HGErUCNCCyfBLO582B6fxzL";

import { Box, FormControl, Input, Text, Flex, useToast, Image, Container } from "@chakra-ui/react";
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
    <Container >
      <Header />

      <Flex justify='center' mb={20} direction={['column', 'row',]} align='center'>
        <Image objectFit="cover" size={[200]} bg='gray.200' mr={[0, 3]} rounded='lg'
          src='https://images.unsplash.com/photo-1487915650694-c30bafaa5a34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=908&q=80' />
        <Image objectFit="cover" src='https://images.unsplash.com/photo-1442458017215-285b83f65851?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80' size={[200]} bg='red.400' rounded='lg' mt={50}></Image>
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

    </Container>
  );
}

export default Signup;
