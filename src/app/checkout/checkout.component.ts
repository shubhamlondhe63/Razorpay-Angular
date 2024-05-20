// src/app/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { RazorpayService } from '../service/razorpay.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: { product: any, quantity: number }[] = [];
  totalAmount: number = 0;

  constructor(private razorpayService: RazorpayService, private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  checkout() {
    const amountInINR = this.totalAmount * 100; 

    const options = {
      amount: amountInINR, // Amount in paisa
      currency: 'INR', // Change currency as needed
      receipt: 'order_receipt',
      key: 'YOUR_RAZORPAY_API_KEY', // Replace with your Razorpay API key
      name: 'Demo Store',
      description: 'Payment for products',
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Demo Address'
      },
      theme: {
        color: '#3399cc'
      },
      handler: (response: any) => {
        // Handle payment success
        console.log(response);
        // Call your backend API to verify payment and process order
      },
      modal: {
        ondismiss: () => {
          // Handle modal close/cancel
          console.log('Payment canceled');
        }
      }
    };

    this.razorpayService.createPayment(options);
  }
}
