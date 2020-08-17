import { createContext, useContext, useState, useEffect } from 'react'
import { basicPriceId } from '../pages'

const PaymentContext = createContext({} as any)



interface Props {
  setPriceId: (state: string) => void;
  setCustomer: (state: any) => void;
  setSelectedSubscription: (state: number) => void;
  priceId: string;
  customer: any;
  customerId: string;
  selectedSubscription: number;

}

function PaymmentProvider({ children }) {
  const [selectedSubscription, setSelectedSubscription] = useState(0)
  const [priceId, setPriceId] = useState(basicPriceId)
  const [customer, setCustomer] = useState() as any
  const customerId = customer ? customer.id : process.env.NEXT_PUBLIC_CUSTOMER_ID
  useEffect(() => { }, [selectedSubscription, priceId, customer])

  return (
    <PaymentContext.Provider value={{ priceId, customerId, setPriceId, selectedSubscription, setSelectedSubscription, customer, setCustomer }}>
      {children}
    </PaymentContext.Provider>
  )
}


function usePayment(): Props {
  const data = useContext(PaymentContext)
  return data
}


export { usePayment, PaymmentProvider }