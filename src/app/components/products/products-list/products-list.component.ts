import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../models/product.model";
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../../states/product.state";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input()
  public products$: Observable<AppDataState<Product[]>> | null = null;
  @Input()
  public DataStateEnum = DataStateEnum;

  @Output()
  public productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onUpdate(id: number) {
    console.log("id  "+id)
    this.productsEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: id});
  }

  onDelete(product?: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: product})
  }

  onSelect(product: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: product})
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.SELECT_PRODUCT: {
        this.onSelect($event.payload);
        break;
      }
      case ProductActionsTypes.EDIT_PRODUCT: {
        this.onUpdate($event.payload);
        break;
      }
      case ProductActionsTypes.DELETE_PRODUCT: {
        this.onDelete($event.payload);
        break;
      }
      default: {
        break;
      }
    }
  }
}
