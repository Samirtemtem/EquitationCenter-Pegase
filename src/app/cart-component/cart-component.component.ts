import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product-service.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {Product} from "../models/product/product.module";

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './cart-component.component.html',
  styleUrl: './cart-component.component.css'
})
export class CartComponentComponent implements OnInit{
  products: any[] = [];
  Subtotal: number = 0.0;
  totalPrice: number = 0;
  constructor(private productService:ProductService) {
  }
  ngOnInit(): void {
    this.totalPrice = 0;
    this.Subtotal = 0;

    let storedProducts = this.productService.getProductsFromCart();
    if(storedProducts) {
      this.products = storedProducts;
    }
    console.log("products = "+JSON.stringify(this.products));
    this.products.forEach(product => {
      this.Subtotal += product.prix;
    });
    this.totalPrice = this.Subtotal + 7;
    console.log("Total price = "+this.totalPrice);
    console.log("Subtotal price= "+this.Subtotal);
  }

}
