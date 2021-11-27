import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.host}/products`)
  }

  getSelectedProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.host}/products?selected=true`)
  }

  getAvailableProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.host}/products?available=true`)
  }

  searchProducts(keyword:string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.host}/products?name_like=${keyword}`)
  }

}
