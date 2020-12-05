import React from 'react'
import PayForm from '../components/payform'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../utils/stripe-browser'

function Pay() {
  return (
    <Elements stripe={stripePromise}>
      <PayForm />
    </Elements>
  )
}

export default Pay
