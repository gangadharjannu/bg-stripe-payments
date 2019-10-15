import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * @param paymentInfo - Contains token information which will be used by 
   * backend to make the actual payment
   */
  makePayment(paymentInfo): Observable<any> {
    return this.http.post('http://localhost:3000/payments', paymentInfo);
  }
}
