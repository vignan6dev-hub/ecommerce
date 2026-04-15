import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = new BehaviorSubject<any>([]);
  cart$ = this.cart.asObservable();

  constructor() { }

  getCart(){
    // console.log(this.cart,"get value")
    return this.cart;
  }

  addToCart(item: any) {
  const current = this.cart.getValue();
  this.cart.next([...current, item]);
}
}
