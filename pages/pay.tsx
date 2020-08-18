import React from 'react'
import StripeElements from '../components/stripe-elements'
import PayForm from '../components/payform'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../utils/stripe'

function Pay() {
  return (
    <Elements stripe={stripePromise}>
      <PayForm />
    </Elements>
  )
}

export default Pay
