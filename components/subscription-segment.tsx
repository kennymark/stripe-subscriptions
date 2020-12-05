import { Tabs, TabList, Tab } from "@chakra-ui/react"
import SubscriptionCard from "./subscription-card"
import { useEffect } from "react"
import { basicPriceId, premiumPriceId } from "../pages"
import { usePayment } from "../context/payment-context"

const tabOptions = {
  border: '1px',
  rounded: 'lg',
  borderColor: 'gray.300',
  _focus: { outline: 0 },
  _selected: { color: "white", rounded: 'lg', borderColor: 'red.400' }
}


const SubscriptionSegment = ({ tabIndex, onChange = null, }) => {
  const { setPriceId, setSelectedSubscription } = usePayment()

  useEffect(() => {
    setPriceId(tabIndex === 0 ? basicPriceId : premiumPriceId)
    setSelectedSubscription(tabIndex)
  })
  return (
    <Tabs isFitted defaultIndex={tabIndex} onChange={onChange} variant='unstyled' >
      <TabList>
        <Tab  {...tabOptions} mr={10}>
          <SubscriptionCard type='Basic' price={5} selected={tabIndex === 0} />
        </Tab>
        <Tab {...tabOptions}>
          <SubscriptionCard type='Premium' price={10} selected={tabIndex === 1} />
        </Tab>
      </TabList>
    </Tabs>

  )
}

export default SubscriptionSegment