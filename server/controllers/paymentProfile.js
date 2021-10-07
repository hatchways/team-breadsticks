const stripe = require("stripe")(process.env.STRIPE_SK);
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

exports.createCustomer = asyncHandler(async (req, res) => {
  const { billing_details, id } = req.body;
  const { userId } = req.params;
  if (!userId || !id) {
    return res
      .status(400)
      .json({ err: "userId or paymentMethodId is undefined" });
  }
  try {
    const customer = await stripe.customers.create(billing_details);

    await stripe.paymentMethods
      .attach(id, {
        customer: customer.id,
      })
      .catch((err) => res.status(422).json({ err: err.message }));

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          stripeId: customer.id,
        },
      }
    ).catch((err) => res.status(404).json({ err: err.message }));

    res.status(201).json({ stripeId: customer.id });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
});

exports.addPaymentprofile = asyncHandler(async (req, res) => {
  const { paymentMethodId, userStripeId } = req.body;
  if (!paymentMethodId || !userStripeId) {
    return res
      .status(400)
      .json({ err: "paymentMethodId or userStripeId is undefined" });
  }
  try {
    const paymentMethods = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: userStripeId,
    });

    res.status(201).json(paymentMethods);
  } catch (err) {
    res.status(422).json({ err: err.message });
  }
});

exports.retrieveCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    return res.status(400).json({ err: "customerId is undefined" });
  }
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });
    const customer = await stripe.customers.retrieve(customerId);
    res.status(200).json({ customer, paymentMethods });
  } catch (err) {
    res.status(422).json({ err: err.message });
  }
});

exports.getUserStripeId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ err: "userId is undefined" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ err: "user not found" });
    }
    res.status(200).json({
      stripeId: user.stripeId,
    });
  } catch (err) {
    res.status(404).json({ stripeId: false });
  }
});

exports.setDefaultPaymentMethod = asyncHandler(async (req, res, next) => {
  const { userStripeId, paymentMethodId } = req.params;
  if (!userStripeId || !paymentMethodId) {
    return res.status(400).json({ err: "userId or paymentId is undefined" });
  }

  try {
    const customer = await stripe.customers.update(userStripeId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
    res.status(200).json(customer);
  } catch (err) {
    res.status(422).json({ err: err.message });
  }
});