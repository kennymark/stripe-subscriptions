import { Text, Icon, Box } from '@chakra-ui/react'
import { usePayment } from '../context/payment-context'
import { ArrowForwardIcon } from '@chakra-ui/icons'
const SelectedSubscription = ({ type = 'Basic', price = 5 }) => {
  const { selectedSubscription } = usePayment()

  if (selectedSubscription == 1) {
    type = 'Premium'
    price = 10
  }

  return (

    <Box my={5}>
      <Text>
        <ArrowForwardIcon name="arrow-forward" /> Total due now £{price.toFixed(2)}
      </Text>

      <Text>
        <ArrowForwardIcon name="arrow-forward" /> Subscription to {type}
      </Text>
    </Box>
  )
}
export default SelectedSubscription