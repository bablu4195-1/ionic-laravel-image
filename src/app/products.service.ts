import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products = "http://127.0.0.1:8000/api/products";
  constructor(public http:HttpClient) { }
  getProfiles(){
  return this.http.get(this.products)
  }
  createProfile(data){
  return this.http.post(this.products,data)
  }
}
