import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sharedProduct {
  private productSource = new BehaviorSubject<any>(null);
  currentProduct = this.productSource.asObservable();

  constructor() { }

  updateData(product: any) {
    this.productSource.next(product);
  }
}
