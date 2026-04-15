import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit,OnChanges,DoCheck {
@Input() p:any;

public cartserv = inject(CartService);

ngOnInit(){
// console.log(this.p,"productssssssss card")
}

ngOnChanges(changes: SimpleChanges): void {
  // console.log(changes,"changes")
}

ngDoCheck(): void {
  // console.log("do check")
}

public addToCart(item:any){
  // console.log(item,"item");
  this.cartserv.addToCart(item);
}
}
