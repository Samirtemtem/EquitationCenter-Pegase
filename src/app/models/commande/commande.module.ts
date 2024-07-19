import {Inject, inject, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../product/product.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Commande {
  // @ts-ignore

  public adresse: string;
  public email: string;
  public listeProduits: Product[];
  public number: number;
  public paiement: string;
  public prixtotale: number;
  constructor(@Inject(String) adresse: string,@Inject(String) email: string,@Inject(Object) listeProduits: Product[],@Inject(Number) number: number,@Inject(String) paiement: string,@Inject(Number) prixtotale: number) {
    this.adresse = adresse;
    this.email = email;
    this.listeProduits = listeProduits;
    this.number = number;
    this.paiement = paiement;
    this.prixtotale = prixtotale;
  }
}
