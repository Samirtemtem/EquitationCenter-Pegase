import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ProductService} from "../../services/product-service.service";
import {ToasterService} from "../../services/toaster.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Product} from "../../models/product/product.module";
import {Commande} from "../../models/commande/commande.module";
import {CommandeService} from "../../services/commande.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    NgIf
  ],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit{

  products: any[] = [];
  Subtotal: number = 0.0;
  totalPrice: number = 0;
  country: String | undefined;
  State: String = "";
  zipcode: String = "";

constructor(private CommandeService: CommandeService,private productService : ProductService,private toasterService: ToasterService,private  router: Router) {
}

  ngOnInit(): void {
  this.totalPrice = 0;
  this.Subtotal = 0;

    let storedProducts = this.productService.getProductsFromCart();
    if(storedProducts){
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

  confirmCommand() {
    let addy = this.country+","+this.State+","+this.zipcode;
    let commande : Commande = new Commande(addy,localStorage.getItem("email")||"",this.products,21337878,"espece",this.totalPrice);
    this.CommandeService.new(commande);
    localStorage.removeItem("cart");
    this.toasterService.success("Commande confirmée","Votre commande a été confirmée avec succès");
    this.router.navigate(["/myorders"]);

  }

  removeItem(product: Product) {
    let storedProducts : Product[] = JSON.parse(localStorage.getItem("cart") || "");
    storedProducts.forEach(p => console.log(p));
    console.log("index of element : "+storedProducts.findIndex(p=>p.nom==product.nom));
    let indexOfProduct = storedProducts.findIndex(p=>p.nom==product.nom);
    console.log("Cart after deleting element :"+storedProducts.splice(indexOfProduct,1))
    localStorage.setItem("cart",JSON.stringify(storedProducts));
    this.products = storedProducts;
    console.log(this.products);
    this.ngOnInit();
  }
}
