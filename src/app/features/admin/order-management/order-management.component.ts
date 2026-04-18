import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: any[] = [];

  ngOnInit() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
    });
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(o => o.id !== id);
    });
  }
}