# iDEAL integration

https://stripe.com/docs/sources/ideal

stripe process:
create a html form to take the bank details
create a Source object (called as source creation) by calling the objects provided by stripe which
will get your Source object from stripe
Redirect the user to redirect[url] of Source object.
Once the user authorizes the payment from bank website/mobile app we need to redirect user to
redirect[return_url] of the Source object.
This happens regardless of whether the authorization is was successful or not.

## Everything has to re structured (after some time)

As we have SCA came into effect ( for iDEAL it is not necessary to migrate).
else we need to migrate in the future

so we will be using paymentIntents API

procedure:
1. send a request to client with currency type, currency amount, payment type(card or ideal...)
2. create paymentIntent on server and send back the client_secret to client side as a repsonse to the API call.
3. collect payment method details in client side 
    