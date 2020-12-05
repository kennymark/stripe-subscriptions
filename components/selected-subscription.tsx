import { Text, Icon, Box } from '@chakra-ui/core'
import { usePayment } from '../context/payment-context'

const SelectedSubscription = ({ type = 'Basic', price = 5 }) => {
  const { selectedSubscription } = usePayment()

  if (selectedSubscription == 1) {
    type = 'Premium'
    price = 10
  }

  return (

    <Box my={5}>
      <Text>
        <Icon name="arrow-forward" /> Total due now £{price.toFixed(2)}
      </Text>

      <Text>
        <Icon name="arrow-forward" /> Subscription to {type}
      </Text>
    </Box>
  )
}
export default SelectedSubscription