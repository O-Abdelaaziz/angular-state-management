import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common'

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  productId: number;
  product?: Product;
  productFormGroup?: FormGroup;

  constructor(
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.productId = +this._activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    // this.productId = +this._activatedRoute.snapshot.params.id;
    if (this.productId) {
      this._productService.getProduct(this.productId).subscribe(
        (response) => {
          this.productFormGroup = this._formBuilder.group({
            name: [response.name, [Validators.required, Validators.minLength(2)]],
            price: [response.price, [Validators.required, Validators.minLength(2)]],
            quantity: [response.quantity, [Validators.required, Validators.minLength(2)]],
            selected: [response.selected, Validators.required],
            available: [response.available, Validators.required],
          })
        }
      )
    }
  }

  get productFromControls() {
    return this.productFormGroup?.controls;
  }

  onUpdateProduct() {
    this.isLoading = true;
    this.isSubmitted = true;

    if (this.productFormGroup?.invalid) {
      this.isLoading = false;
      return;
    }

    this.product = {
      id: this.productId,
      name: this.productFromControls?.name.value,
      price: this.productFromControls?.price.value,
      quantity: this.productFromControls?.quantity.value,
      selected: this.productFromControls?.selected.value,
      available: this.productFromControls?.available.value,
    }
    this.updateProduct();
  }

  updateProduct() {
    this._productService.updateProduct(this.product).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.isSubmitted = false;
      }
    )
  }

  back(): void {
    this._location.back()
  }
}
