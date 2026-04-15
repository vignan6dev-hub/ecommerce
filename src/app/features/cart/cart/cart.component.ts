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
  // console.log(this.cart.getCart,"get cart items");
  this.cart.getCart().subscribe((res:any)=>{
    this.cartItems = res;
  })

}
 
}
