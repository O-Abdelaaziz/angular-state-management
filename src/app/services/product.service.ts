import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // @ts-ignore
  private host: environment.baseUrl;

  constructor(private _httpClient: HttpClient) {
  }

  getAllProducts() {
    return this._httpClient.get(`${this.host}/products`)
  }
}
