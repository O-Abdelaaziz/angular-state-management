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

  searchProducts(keyword: string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.host}/products?name_like=${keyword}`)
  }

  selectProduct(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this._httpClient.put<Product>(`${this.host}/products/${product.id}`, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this._httpClient.delete<void>(`${this.host}/products/${product.id}`);
  }

  saveProduct(product?: Product): Observable<Product> {
    return this._httpClient.post<Product>(`${this.host}/products/`, product);
  }

  updateProduct(product?: Product): Observable<Product> {
    return this._httpClient.put<Product>(`${this.host}/products/${product?.id}`, product);
  }

  getProduct(id: number): Observable<Product> {
    return this._httpClient.get<Product>(`${this.host}/products/${id}`)
  }
}
