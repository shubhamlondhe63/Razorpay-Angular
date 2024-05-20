import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  createPayment(options: any) {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
}
