import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http:HttpClient) { }


  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("https://fakestoreapi.com/products").pipe(
      tap(products => console.log('Products fetched:', products.length)), // ✅ logging only
      catchError(error => {
        console.error('Products API failed:', error);
        return throwError(() => error);
      })
    );
  }

  // Add product
addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>("https://fakestoreapi.com/products", product);
}

// Edit product
updateProduct(id: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`https://fakestoreapi.com/products/${id}`, product);
}

// Delete product
deleteProduct(id: number): Observable<any> {
  return this.http.delete(`https://fakestoreapi.com/products/${id}`);
}

}
