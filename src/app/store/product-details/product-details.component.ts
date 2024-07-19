import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {sharedProduct} from "../../shared/product.service";
import {ProductService} from "../../services/product-service.service";
import {ToasterService} from "../../services/toaster.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any;

  constructor(private toasterService: ToasterService,private productService: ProductService,private sharedDataServ: sharedProduct) {
 }

  ngOnInit(): void {
    this.sharedDataServ.currentProduct.subscribe(product => {
      this.product = product;
    });
    if (!this.product) {
      console.log('Product details not available');
    } else
    {
      console.log('Product details available'+this.product);
    }
  }

  addToCart(product:any) {
    this.productService.addToCart(product);
    console.log('Product added to cart');
    this.toasterService.success(
      "Adding Product to Cart",
      "Product Adding to the cart"
    );
  }
}
