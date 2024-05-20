import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];
  private items: { product: any; quantity: number }[] = [];

  // addToCart(product: any) {
  //   this.cartItems.push(product);
  // }

  addToCart(product: any) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }
  getCartItems() {
    return this.items;
  }

  getCartItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
