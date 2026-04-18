import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {

 products:Product[] = [];
 serv = inject(ProductsService);

 ngOnInit(){
  this.serv.getProducts().subscribe((res:Product[])=>{
    // console.log(res,"res of products list");
    this.products = res;   
  })
 }

 trackByProductId(index: number, product: Product): number {
  return product.id;
}
}
