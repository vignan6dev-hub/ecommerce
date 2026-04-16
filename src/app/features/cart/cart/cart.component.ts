import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../core/models/cart-item';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  public cart = inject(CartService);
  public cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.cart.getCart().subscribe((res: any[]) => {
      const grouped = new Map();

      res.forEach((item: CartItem) => {
        const key = `${item.id}`;
        if (grouped.has(key)) {
          const existing = grouped.get(key);
          existing.quantity += 1;
          existing.totalPrice = existing.quantity * existing.unitPrice;
        } else {
          grouped.set(key, {
            id: item.id,
            image: item.image,
            name: item.name,
            title: item.title,
            unitPrice: item.price,
            quantity: 1,
            totalPrice: item.price,
          });
        }
      });

      this.cartItems = Array.from(grouped.values());
    });
  }

  public increase(item: any) {
    this.cartItems = this.cartItems.map((dt: any) => {
      if (item.id === dt.id) {
        if (dt.quantity >= 1) {
          dt.quantity += 1;
          dt.totalPrice = dt.quantity * dt.unitPrice;
        }
      }
      return dt;
    });
  }

  public decrease(item: any) {
    this.cartItems = this.cartItems.filter((dt: any) => {
  if (dt.id === item.id) {
    if (dt.quantity > 1) {
      dt.quantity -= 1;
      dt.totalPrice = dt.quantity * dt.unitPrice;
      return true;
    }
    return false;
  }
  return true;
});
  }
}
