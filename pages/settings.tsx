import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text, useDisclosure, useToast } from '@chakra-ui/react';
import http from 'axios';
import React, { useEffect, useState } from 'react';
import ActionButton from '../components/action-button';
import ModalDialog from '../components/alert-dialog';
import Header from '../components/header';
import SubscriptionSegment from '../components/subscription-segment';
import { usePayment } from '../context/payment-context';
import { toastOptions } from '../utils/toast-options';


function AccountSettings() {
  const { customerId, customer, setCustomer, priceId } = usePayment()
  const [subscriptionId, setSubscriptionId] = useState()
  const [toggleSubs, setToggleSubs] = useState(false)
  const [currrentPlan, setCurrentPlan] = useState(null)
  const [updateComplete, setUpdatedComplete] = useState(false)
  const toast = useToast()
  const [card, setCard] = useState() as any
  const [portalUrl, setPortalUrl] = useState()
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    getCustomer()

  }, [updateComplete])

  const getCustomer = async () => {
    const { data } = await http.post('/api/retrieve-customer', { customerId })
    setCustomer(data)
    setSubscriptionId(data?.subscriptions?.data[0]?.id)
    setCard(data.invoice_settings.default_payment_method.card)
    console.log('customer', data)

    const sess = await http.post('/api/customer-portal', { customerId })
    setPortalUrl(sess.data)

  }

  const findCurrentPlan = () => {
    if (customer?.subscriptions?.data[0].plan.nickname === 'Basic') {
      setCurrentPlan(0)
    } else { setCurrentPlan(1) }
  }



  const toggleSubscriptionPanel = () => {
    findCurrentPlan()
    setToggleSubs(!toggleSubs)
  }

  const cancelSubscription = async () => {
    const { data } = await http.post('/api/delete-subscription', { subscriptionId })
    console.log(data)

    if (data.status == 'canceled') {
      toast({ ...toastOptions, description: 'Subscription cancelled', status: 'success' })
    }
    getCustomer()
    onClose()
  };

  const updateSubscription = async () => {

    try {
      const { data } = await http.post('/api/update-subscription', { subscriptionId, newPriceId: priceId })
      setUpdatedComplete(true)
      console.log('success', data)

      toast({ ...toastOptions, title: 'Update complete', description: 'You have successfully updated your card', status: 'success' })
      retrieveUpcomingInvoice({ customerId, subscriptionId, newPriceId: priceId })
    } catch (error) {
      toast({ ...toastOptions, title: 'Update incomplete', description: 'Could not successfully update your card', status: 'error' })
      setUpdatedComplete(false)

    }

  };

  async function retrieveUpcomingInvoice({ customerId, subscriptionId, newPriceId }) {
    const { data } = await http.post('/api/retrieve-upcoming-invoice', { subscriptionId, newPriceId, customerId })

    console.log('upcoming invoice', data)
  }


  return (
    <>
      <Header title='Sign in' />
      <Heading color='red.400' size='lg' textAlign='center' mb={10}>Account Settings</Heading>

      <ModalDialog title='Cancel Subscription'
        description='Are you sure you want to cancel your subscription' isOpen={isOpen} onClose={onClose} onYes={cancelSubscription} />

      {toggleSubs &&
        <Box mb={10}>
          <SubscriptionSegment tabIndex={currrentPlan} onChange={val => setCurrentPlan(val)} />
          <ActionButton onClick={updateSubscription}>Update plan</ActionButton>
        </Box>
      }

      {customer?.subscriptions?.data.length >= 1 &&
        <>
          <Box rounded='lg' border='1px' borderColor='gray.200' minH={200} p={5}>
            <Heading fontSize={20} my={3}>Account</Heading>

            <Flex justify='space-between'>
              <Text fontSize={18} color='gray.500'>Current plan</Text>
              <Text fontSize={18} fontWeight='bold' color='gray.500'>{customer?.subscriptions?.data[0].plan.nickname}</Text>

            </Flex>

            <Flex justify='space-between'>
              <Text fontSize={18} color='gray.500'>Credit card</Text>
              <Text fontSize={18} fontWeight='bold' color='gray.500' textTransform='capitalize'>{card?.brand} **** {card?.last4}</Text>

            </Flex>

            <Heading cursor='pointer' fontSize={20} my={3} onClick={toggleSubscriptionPanel}>Change plan <ArrowForwardIcon /></Heading>
            <Heading cursor='pointer' fontSize={20} onClick={onOpen}>Cancel subscription <ArrowForwardIcon /></Heading>

          </Box>

        </>}

      {customer?.subscriptions?.data.length === 0 &&
        <Box rounded='lg' border='1px' borderColor='gray.200' minH={200} p={5}>
          <Text align='center' mt={5} fontSize={20} color='gray.500'>You currently don't have any subscriptions</Text>
        </Box>
      }



      <ActionButton as='a' href={portalUrl}>
        Customer Portal
      </ActionButton>
    </>
  )
}

export default AccountSettings
