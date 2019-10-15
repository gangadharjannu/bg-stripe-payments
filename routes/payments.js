var express = require('express');
var router = express.Router();
var stripe = require('stripe');
stripe = stripe('YOUR_SECRET_KEY');

function requestPaymentFromStripe(details) {
  return new Promise(function (resolve, reject) {
    stripe.charges.create({
      amount: details.body.amount,
      currency: details.body.currency,
      source: details.body.token,
      description: details.body.description || details.body.email
    }, function (err, charge) {
      if (err) {
        reject(err);
      }
      resolve(charge);
    });
  });

}

/* GET payments page. */
router.post('/', function (req, res, next) {
  requestPaymentFromStripe(req).then(function (success) {
    res.send(success);
  }).catch(function (error) {
    console.log(error);
  });
});


module.exports = router;
