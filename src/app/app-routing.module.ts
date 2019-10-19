import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
    { path: '', redirectTo: '/checkout', pathMatch: 'full' },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'order-confirmation', component: OrderConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
