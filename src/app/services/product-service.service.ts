import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Product} from "../models/product/product.module";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}
  getProducts() : Observable<any[]>{
    const productsObservable = this.firestore.collection("produit").valueChanges();
    productsObservable.subscribe(
      data => console.log(data),
      error => console.error(error)
    );
    return productsObservable;
  }

  addToCart(product: Product) {
    // @ts-ignore
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("cart = "+cart);
    console.log("product ="+product);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  getProductsFromCart() : any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
