import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  // amount 5.99 euros
  private amount = 599;
  private currency = 'eur';
  private stripe;
  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
    // Your Stripe public key
    this.stripe = Stripe(environment.stripeKey);

    // Create `card` element that will watch for updates
    // and display error messages
    const elements = this.stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    const style = {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
      },
      invalid: {
        color: '#fa755a',
      }
    };
    // Create an instance of the idealBank Element.
    const idealBank = elements.create('idealBank', { style });
    // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
    idealBank.mount('#ideal-bank-element');

    const errorMessage = document.getElementById('error-message');

    // Handle form submission.
    const form = document.getElementById('payment-form');

    const sourceData = {
      type: 'ideal',
      amount: this.amount,
      currency: this.currency,
      owner: {
        name: 'bg',
      },
      statement_descriptor: 'TEST ORDER',
      // Provide mobile application URI scheme as the redirect[return_url] value for mobile
      // Specify the URL to which the customer should be redirected
      // after paying.
      redirect: {
        return_url: 'http://localhost:4200/order-confirmation',
      },
    };

    form.addEventListener('submit', event => {
      event.preventDefault();
      // showLoading();




      // Call `stripe.createSource` with the idealBank Element and additional options.
      this.stripe.createSource(idealBank, sourceData).then(result => {
        if (result.error) {
          // Inform the customer that there was an error.
          errorMessage.textContent = result.error.message;
          errorMessage.classList.add('visible');
          // stopLoading();
        } else {
          // Redirect the customer to the authorization URL.
          errorMessage.classList.remove('visible');
          this.stripeSourceHandler(result.source);
        }
      });
    });

  }

  stripeSourceHandler(source: any) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    // opens new system browser window which will opens the corresponding app url
    this.iab.create(source.redirect.url, '_system', options);
  }
}
