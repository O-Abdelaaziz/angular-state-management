import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[] | null = null;

  constructor(private _productService: ProductService) {
  }

  ngOnInit(): void {
    this.onGetProducts();
  }

  onGetProducts() {
    this._productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error)=>{
        console.log("Something went wrong: ", error);
      }
    )
  }

}
