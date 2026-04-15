import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http:HttpClient) { }

  public getProducts(){
    return this.http.get("https://fakestoreapi.com/products");
  }
}
