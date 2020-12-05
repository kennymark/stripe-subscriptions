import { Heading, Text, Box, Button } from "@chakra-ui/react";

function SubscriptionCard({ type, price, selected = false, ...props }) {

  return (
    <Box w={200} {...props} >
      <Heading color='gray.400' fontSize={20}>{type}</Heading>

      <Text mt={6} fontSize={30} color='red.400' fontWeight='bold'>£{price.toFixed(2)}</Text>
      <Text color='gray.400' fontSize={14} fontWeight={600}>Per month</Text>
      <Text color='gray.400' fontSize={14} fontWeight={600}>Billed Monthly</Text>

      <Button bg='red.400' color='white' mx='auto' mt={5} _hover={{ bg: 'red.300' }}> {selected ? 'Selected' : 'Select'}</Button>
    </Box>
  )
}

export default SubscriptionCard;
