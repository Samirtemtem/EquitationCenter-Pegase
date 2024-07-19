import {Component, Input, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {FirebaseAuthService} from "./services/firebase-auth.service";
import {ProductService} from "./services/product-service.service";
import {Product} from "./models/product/product.module";
import {CartComponentComponent} from "./cart-component/cart-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, LoginComponent, HomeComponent, CartComponentComponent
   ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pégase';
  cart : any[] = [];
  isLoggedIn  = this.firebaseAuthService.isLoggedIn$;
  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService,private productService : ProductService) {
  }

  ngOnInit(): void {
    let storedProducts:Product[] = this.productService.getProductsFromCart();
    if(storedProducts){
      this.cart = storedProducts;
    }
    console.log("CART ="+this.cart);
    console.log("cart length = "+this.cart.length);
    console.log(this.isLoggedIn);
  }

  LogOut() {
    this.firebaseAuthService.logout();
    this.router.navigate(["/login"]);
  }

}
