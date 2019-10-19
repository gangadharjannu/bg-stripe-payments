# Stripe integration

There are two ways integrate stripe payments into our website/mobile app.

 1. Using stripe provided native SDK for android or ios
 2. Using stripe.js

 We have choosen stripe.js method. 
 Reason [https://baadiersydow.com/integrate-ionic-framework-stripe-single-recurring-payments/]


## Procedure

Stripe provides two modes of payments  

    1. Checkout: Stripes integrated payment method.
        Easy onboarding
        Not customizable
        Right now only supports credit/debit cards  
    2. Elements: Provided as Stripe Elements
        Customizable
        We need to configure front end and backend

We will be using Stripe elements as we have to support iDeal.

  1. We need to create test account in stripe.
    - As part of this we will get two secret keys.
    - We will use one key in front end another in back end to actually make charge(payment).
  2. Include stripe.js in index.html.
  3. Instantiate stripe.js with the secret key provided.
  4. Mount and wrap the stripe elements in HTML form.
  5. Intercept the form submit event and call `stripe.createToken(card)` with the mounted stripe elements.
    - This will give the token that is required for making payment.
  6. Send the token received from step 5 to backend along with amount and currency to make the payment from backend.
  
## iDeal payment integration

https://stripe.com/docs/sources/ideal
