import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ActionEvent, ProductActionsTypes} from "../../../../states/product.state";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  product: Product | null = null;
  @Output()
  eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: product})
  }

  onUpdate(id: number) {
    this.eventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: id})
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: product})
  }
}
