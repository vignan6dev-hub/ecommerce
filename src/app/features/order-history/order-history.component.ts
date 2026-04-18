import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  order:any;
  ngOnInit(): void {
     const data = localStorage.getItem("order");
     this.order = data ? JSON.parse(data) : null;
  }
}
