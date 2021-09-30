const express = require('express')
const router = express.Router()
const {
  createCustomer,
  retrieveCustomer,
  addPaymentprofile,
  getUserStripeId
} = require('../controllers/customer')

router.post('/create/:userId', createCustomer)
router.get('/add-payment-profile', raddPaymentprofile)
router.get('/retrieve/:customerId', retrieveCustomer)
router.get('/user-stripe-id/:userId', getUserStripeId)

module.exports = router
