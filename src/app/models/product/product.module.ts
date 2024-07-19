import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  documentID: string;
  description: string;
  image: string;
  marque: string;
  nom: string;
  prix: number;
  taille?: string;
  type?: string;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule

  ]
})


export class ProductModule {}
