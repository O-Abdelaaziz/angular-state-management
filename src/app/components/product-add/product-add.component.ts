import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {Location} from '@angular/common'
import {EventDriverService} from "../../services/event-driver.service";
import {ProductActionsTypes} from "../../states/product.state";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  product?: Product;
  productFormGroup?: FormGroup;
  // productFormGroup: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(''),
  //   quantity: new FormControl(''),
  //   selected: new FormControl(''),
  //   available: new FormControl(''),
  // });

  constructor(
    private _eventDriverService: EventDriverService,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _location: Location) {
  }

  ngOnInit(): void {
    this.productFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.minLength(2)]],
      quantity: [0, [Validators.required, Validators.minLength(2)]],
      selected: [false, Validators.required],
      available: [false, Validators.required],
    })
  }

  get productFromControls() {
    return this.productFormGroup?.controls;
  }

  onSaveProduct() {
    this.isLoading = true;
    this.isSubmitted = true;

    if (this.productFormGroup?.invalid) {
      this.isLoading = false;
      return;
    }

    this.product = {
      id: Math.floor(Math.random() * 100),
      name: this.productFromControls?.name.value,
      price: this.productFromControls?.price.value,
      quantity: this.productFromControls?.quantity.value,
      selected: this.productFromControls?.selected.value,
      available: this.productFromControls?.available.value,
    }

    this.saveProduct();
  }

  saveProduct() {
    this._productService.saveProduct(this.product).subscribe(
      (response) => {
        this._eventDriverService.publishEvent({type: ProductActionsTypes.PRODUCT_ADDED});
        this.isLoading = false;
        this.isSubmitted = false;
      }
    )
  }

  back(): void {
    this._location.back()
  }
}
