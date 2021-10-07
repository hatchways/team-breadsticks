const stripe = require("stripe")(process.env.STRIPE_SK);
const asyncHandler = require("express-async-handler");

exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount } = req.params;

  if (!amount) {
    return res.status(400).json({ err: "amount is undefined" });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: "cus_KKrm50QQKXO9yY",
    });
    // console.log(paymentIntent.client_secret)
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});
