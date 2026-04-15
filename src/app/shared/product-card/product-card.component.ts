import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
@Input() p:any;

ngOnInit(){
console.log(this.p,"productssssssss card")
}
}
