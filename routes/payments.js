var express = require('express');
var router = express.Router();
var { STRIPE_API_KEY } = require('../config');
var stripe = require('stripe')(STRIPE_API_KEY);

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

function makeChargeRequest(details) {
  return new Promise(function (resolve, reject) {
    stripe.charges.create({
      amount: details.body.amount,
      currency: details.body.currency || 'eur',
      source: details.body.source,
    }, function (err, charge) {
      // asynchronously called
      if (err) {
        reject(err);
      }
      resolve(charge);
    });
  });
}
router.post('/', function (req, res, next) {
  requestPaymentFromStripe(req).then(function (success) {
    res.send(success);
  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/charge', function (req, res, next) {
  makeChargeRequest(req).then(function (success) {
    res.send(success);
  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/polling', function (req, res, next) {
  res.send({ source: req.body.source + 1 });
});

module.exports = router;
