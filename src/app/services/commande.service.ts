import { Injectable } from '@angular/core';
import {Commande} from "../models/commande/commande.module";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private fireStore:AngularFirestore) { }


  new(commande : Commande) : boolean{
    const res = this.fireStore.collection('commande').add({
      adresse: commande.adresse,
      email: commande.email,
      listproduits : commande.listeProduits,
      numero : commande.number,
      paiement : "espéce",
      prixtotale : commande.prixtotale
    });

    console.log('Added document with ID: ', res);
    return true;
  }

  getOrders() : Observable<any[]> {

    let useremail = localStorage.getItem('email');
    return this.fireStore.collection("commande", ref => ref.where('email', '==', useremail)).valueChanges();
   }
}
