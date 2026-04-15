import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

 products:any[] = [];
 serv = inject(ProductsService);

 ngOnInit(){
  this.serv.getProducts().subscribe((res:any)=>{
    console.log(res,"res of products list");
    this.products.push(res);
  })
 }
}
