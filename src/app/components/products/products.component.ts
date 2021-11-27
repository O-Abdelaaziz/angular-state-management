import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../states/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // public products: Product[] | null = null;
  public products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private _productService: ProductService,
    private _router: Router) {
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
  onProductAdd() {
    this._router.navigateByUrl('/product-add')
  }

  onUpdate(id: number) {
    this._router.navigateByUrl('/product-update/' + id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: {
        this.onGetProducts();
        break;
      }
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: {
        this.onGetSelectedProducts();
        break;
      }
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: {
        this.onGetAvailableProducts();
        break;
      }
      case ProductActionsTypes.NEW_PRODUCT: {
        this.onProductAdd();
        break;
      }
      case ProductActionsTypes.SEARCH_PRODUCTS: {
        this.onSearch($event.payload);
        break;
      }
      default: {
        this.onGetProducts()
        break;
      }

    }
  }
}
