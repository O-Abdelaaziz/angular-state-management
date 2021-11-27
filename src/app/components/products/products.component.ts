import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../states/product.state";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // public products: Product[] | null = null;
  public products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private _productService: ProductService) {
  }

  ngOnInit(): void {
  }

  onGetProducts() {
    this.products$ = this._productService.getAllProducts().pipe(
      map(response => ({dataState: DataStateEnum.LOADED, data: response})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this._productService.getSelectedProducts().pipe(
      map((response) => ({dataState: DataStateEnum.LOADED, data: response})),
      startWith({dataState: DataStateEnum.LOADED}),
      catchError((error) => of({dataState: DataStateEnum.LOADED, errorMessage: error.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this._productService.getAvailableProducts().pipe(
      map((response) => ({dataState: DataStateEnum.LOADED, data: response})),
      startWith({dataState: DataStateEnum.LOADED}),
      catchError((error) => of({dataState: DataStateEnum.LOADED, errorMessage: error.message}))
    );
  }

  onSearch(formData: any) {
    console.log(formData)
    this.products$ = this._productService.searchProducts(formData.keyword).pipe(
      map((response) => ({dataState: DataStateEnum.LOADED, data: response})),
      startWith({dataState: DataStateEnum.LOADED}),
      catchError((error) => of({dataState: DataStateEnum.LOADED, errorMessage: error.message}))
    );
  }

  onSelect(product: Product) {
    this._productService.selectProduct(product).subscribe(
      (response) => {
        // this.onGetProducts();
        product.selected = response.selected;
      }
    )
  }

  onDelete(product: Product) {
    this._productService.deleteProduct(product).subscribe(
      (response) => {
        this.onGetProducts();
      }
    )
  }

  //region Methode one
  // onGetProducts() {
  //   this._productService.getAllProducts().subscribe(
  //     (response) => {
  //       this.products = response;
  //     },
  //     (error)=>{
  //       console.log("Something went wrong: ", error);
  //     }
  //   )
  // }
  //endregion
}
