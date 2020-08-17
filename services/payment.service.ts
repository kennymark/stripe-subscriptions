import http from 'axios'

const api = http.create({
  baseURL: '/api'
})



class PaymentService {

  async createCustomer(email: string) {
    const { data } = await http.post('/api/create-customer', { email })
    return data
  }

  async createSubscription({ customerId, paymentMethodId, priceId }) {
    const { data } = await http.post('/api/create-subscription', { customerId, paymentMethodId, priceId, name })
  }


}


const paymentService = new PaymentService()


export default paymentService