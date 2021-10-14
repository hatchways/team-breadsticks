const express = require("express");
const router = express.Router();
const {
  createCustomer,
  retrieveCustomer,
  addPaymentprofile,
  getUserStripeId,
  setDefaultPaymentMethod,
} = require("../controllers/paymentProfile");
router.post("/create/:userId", createCustomer);
router.post("/add-payment-profile", addPaymentprofile);
router.get("/retrieve/:customerId", retrieveCustomer);
router.get("/user-stripe-id/:userId", getUserStripeId);
router.post("/set-default-payment-method/", setDefaultPaymentMethod);

module.exports = router;
