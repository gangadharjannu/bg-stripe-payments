import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

import { timer, from } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent implements OnInit {
  private sourceID: string;
  private clientSecret: string;
  private stripe;
  constructor(private route: ActivatedRoute, private httpService: HttpService) {

  }

  ngOnInit() {
    // Your Stripe public key
    this.stripe = Stripe(environment.stripeKey);

    // after redirection from user authorization
    // for some reason below activateRoute query params are not working and resulting null
    this.sourceID = this.route.snapshot.queryParamMap.get('source');
    this.clientSecret = this.route.snapshot.queryParamMap.get('client_secret');

    // Redirection after user authorization
    if (this.sourceID && this.clientSecret) {
      // implement polling to check whether the payment is chargeable
      // then send a request to backend to charge the payment

      timer(0, 500)
        .pipe(
          concatMap(
            () => from(this.stripe.retrieveSource({ id: this.sourceID, client_secret: this.clientSecret }))
          ),
          // 10 tries
          take(10),
          filter((stripeData: any) => {
            console.log(stripeData);
            return stripeData.source.status === 'chargeable';
          }),
          // take the first one
          take(1)
        )
        .subscribe((data) => {
          this.httpService.charge({
            amount: data.source.amount,
            currency: 'eur',
            source: data.source.id,
          }).subscribe(success => {
            console.log(success);
            console.log('సమాప్తం');
          });
          console.log('done dona done');
        }, (error) => {
          console.log('service call lo edo lopam vachindi');
          console.log(error);
        }, () => {
          console.log('service call samaptham ayindi');
        });
      return;
    }

  }

  chargeCustomer(paymentInfo: any) {
    this.httpService.charge(paymentInfo).subscribe(success => {
      console.log(success);
    }, error => {
      console.log(error);
    });
  }
}
