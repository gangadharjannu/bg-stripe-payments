import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { HttpService } from './http.service';

declare var Stripe: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private sourceID: string;
  private clientSecret: string;

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
  ) {
    this.initializeApp();
  }
  ngOnInit() {
    // after redirection from user authorization
    this.sourceID = this.route.snapshot.queryParamMap.get('source');
    this.clientSecret = this.route.snapshot.queryParamMap.get('client_secret');


    // Your Stripe public key
    const stripe = Stripe('pk_test_hMT1x4dp9Th9tCu7ESufTorY00XtCfvaXN');
    if (this.sourceID && this.clientSecret) {

      return;
    }
    // Create `card` element that will watch for updates
    // and display error messages
    const elements = stripe.elements();
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
    const idealBank = elements.create('idealBank', { style: style });
    // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
    idealBank.mount('#ideal-bank-element');

    const errorMessage = document.getElementById('error-message');

    // Handle form submission.
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', event => {
      event.preventDefault();
      // showLoading();

      var sourceData = {
        type: 'ideal',
        // amount 5.99 euros
        amount: 599,
        currency: 'eur',
        owner: {
          name: 'bg',
        },
        statement_descriptor: 'TEST ORDER',
        // Specify the URL to which the customer should be redirected
        // after paying.
        redirect: {
          return_url: 'http://localhost:4200',
        },
      };


      // Call `stripe.createSource` with the idealBank Element and additional options.
      stripe.createSource(idealBank, sourceData).then(result => {
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
    console.log(source);
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    // opens new system browser window which will opens the corresponding app url
    const ref = this.iab.create(source.redirect.url, '_system', options);
  }

  chargeCustomer(token: any) {
    this.httpService.makePayment(token).subscribe(res => console.log(res));
  }

  getToken(paymentInfo: any) {
    this.httpService.getToken(paymentInfo)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
