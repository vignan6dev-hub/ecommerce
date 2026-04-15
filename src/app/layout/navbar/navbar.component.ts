import { Component, DoCheck, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
public cartCount = inject(CartService);
public count:any;

ngOnInit(): void {
   this.cartCount.cart$.subscribe(cart => {
    this.count = cart.length;
  });
}


}
