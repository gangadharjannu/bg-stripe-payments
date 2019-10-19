import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';

import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    OrderConfirmationComponent
  ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    HttpService,
    Stripe,
    InAppBrowser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
