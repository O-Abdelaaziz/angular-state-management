import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../states/product.state";
import {EventDriverService} from "../../../services/event-driver.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products-navbar',
  templateUrl: './products-navbar.component.html',
  styleUrls: ['./products-navbar.component.css']
})
export class ProductsNavbarComponent implements OnInit {
  // @Output()
  // public productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<any>();
  public productSelectedCount: number = 0;
  public productAvailableCount: number = 0;

  constructor(
    private _productService:ProductService,
    private _eventDriverService: EventDriverService) {
  }

  ngOnInit(): void {
    this.onGetSelectedProductsCount();
    this.onGetAvailableProductsCount();
  }

  onGetProducts() {
    // this.productEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS});
    this._eventDriverService.publishEvent({type: ProductActionsTypes.GET_ALL_PRODUCTS})
  }

  onGetSelectedProducts() {
    //this.productEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this._eventDriverService.publishEvent({type: ProductActionsTypes.GET_SELECTED_PRODUCTS})
  }

  onGetAvailableProducts() {
    //this.productEventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this._eventDriverService.publishEvent({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS})
  }

  onProductAdd() {
    //this.productEventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCT});
    this._eventDriverService.publishEvent({type: ProductActionsTypes.NEW_PRODUCT})
  }

  onSearch(value: string) {
    //this.productEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: value});
    this._eventDriverService.publishEvent({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: value})
  }

  onGetSelectedProductsCount(){
    this._productService.getSelectedProducts().subscribe(
      (response)=>{
        this.productSelectedCount=response.length;
      }
    )
  }
  onGetAvailableProductsCount(){
    this._productService.getAvailableProducts().subscribe(
      (response)=>{
        this.productAvailableCount=response.length;
      }
    )
  }
}
