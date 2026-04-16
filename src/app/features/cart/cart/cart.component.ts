import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
 public cart = inject(CartService);
 public cartItems : any[] = [];

ngOnInit(): void {
  this.cart.getCart().subscribe((res: any[]) => {

  const grouped = new Map();

  res.forEach((item: any) => {

    const key = `${item.name}_${item.title}_${item.price}`;

    if (grouped.has(key)) {

      const existing = grouped.get(key);
      existing.quantity += 1;

      // recompute total price safely
      existing.totalPrice = existing.quantity * existing.unitPrice;

    } else {

      grouped.set(key, {
        id: item.id,
        image: item.image,
        name: item.name,
        title: item.title,

        unitPrice: item.price,   // FIX: keep original price safe
        quantity: 1,
        totalPrice: item.price
      });

    }
  });

  this.cartItems = Array.from(grouped.values());

});
}

increase(item: any) {
  this.cartItems = this.cartItems.map((dt: any) => {
    if (item.id === dt.id) {
       if(dt.quantity >= 1){
      dt.quantity += 1;
      dt.totalPrice = dt.quantity * dt.unitPrice;
       }
    }
    return dt;
  });
}

decrease(item: any) {
  this.cartItems = this.cartItems.map((dt: any) => {
    if (item.id === dt.id) {
      if(dt.quantity > 1){
      dt.quantity -= 1;
      dt.totalPrice = dt.quantity * dt.unitPrice;
      }
    }
    return dt;
  });
}

}
