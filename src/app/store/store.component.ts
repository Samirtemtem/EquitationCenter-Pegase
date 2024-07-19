import {Component, Injectable, OnInit} from '@angular/core';
import { ProductService} from "../services/product-service.service";
import {NgForOf} from "@angular/common";
import {Product} from "../models/product/product.module";

import {ToasterService} from "../services/toaster.service";
import {Router} from "@angular/router";
import {sharedProduct} from "../shared/product.service";

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit{
  products: any[] = [];

  constructor(private sharedProductService: sharedProduct,private router: Router,private productService: ProductService,    private toasterService: ToasterService
  ) {
    productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  ngOnInit() {
    console.log("HI")
    this.productService.getProducts();
    console.log("products from comp=" + this.products);
  }


  viewdetails(product: any) {
    console.log("HI")
    console.log(product);
    this.sharedProductService.updateData((product))
    this.router.navigate(['/store/product/']);
  }

    addToCart(product: any) {
    console.log("Hiii");
    console.log(product);
    this.productService.addToCart(product);

      this.toasterService.success(
        "Adding Product to Cart",
        "Product Adding to the cart"
      );

      this.router.navigate(['/store/cart']);
  }

}
