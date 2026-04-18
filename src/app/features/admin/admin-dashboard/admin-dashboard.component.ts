import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products.service';
import { OrderService } from '../../../core/services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private productService = inject(ProductsService);
  private orderService = inject(OrderService);

  totalProducts = 0;
  totalOrders = 0;

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.totalProducts = res.length;
    });

    this.orderService.getOrders().subscribe(res => {
      this.totalOrders = res.length;
    });
  }
}
