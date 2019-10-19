const express = require('express');
const router = express.Router();
const stripe = require('stripe')('YOUR-API-KEY');

const requestPaymentFromStripe = async (details) => {
    return await stripe.paymentIntents.create({
        amount: details.body.amount,
        currency: details.body.currency || 'eur',
    });
};

/* GET payments page. */
router.get('/', (req, res, next) => {
    requestPaymentFromStripe(req).then((success) => {
        res.json({ client_secret: success.client_secret });
    }).catch((error) => {
        console.log(error);
    });
});


module.exports = router;
