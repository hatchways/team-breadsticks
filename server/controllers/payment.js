const stripe = require("stripe")(process.env.STRIPE_SK);
const asyncHandler = require("express-async-handler");

exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, paymentMethodId, customerId } = req.body;
  if (!amount) {
    return res.status(400).json({ err: "amount is undefined" });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customerId,
      amount,
      currency: "USD",
      payment_method: paymentMethodId,
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(422).json({ statusCode: 422, message: err.message });
  }
});
