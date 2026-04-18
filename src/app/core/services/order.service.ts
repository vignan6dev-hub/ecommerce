// 

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com/carts';

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateOrder(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}