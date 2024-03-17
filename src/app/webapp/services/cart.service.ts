import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cart:Map<number, number> = new Map();

    constructor(private productService: ProductService) {     
        // if (typeof localStorage !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            if(storedCart) {
                this.cart = new Map(JSON.parse(storedCart));
            }
        // }        
    }

    addToCart(productId: number, quantity: number = 1) {
        if(this.cart.has(productId)) {
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
            this.cart.set(productId, quantity);
        }
        this.saveCartToLocalStorage();
    }

    getCart(): Map<number, number> {
        return this.cart;
    }

    private saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    clearCart() {
        this.cart.clear();
        this.saveCartToLocalStorage()
    }
}