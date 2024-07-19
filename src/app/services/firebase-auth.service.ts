import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  currentUser: any;
  isLoggedIn= new BehaviorSubject(localStorage.getItem("token") != null)

  public isLoggedIn$ = this.isLoggedIn.asObservable();


  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem("isLoggedIn");
    return this.afAuth.signOut();
  }

  /* fn_isLoggedIn() {
     return this.currentUser !== null;
   }*/
  async resetPasswordInit(email: string) {
    return this.afAuth.sendPasswordResetEmail(localStorage.getItem("email") || "");
  }
  async checkEmailExists(email: string) {
    console.log(email);
    return await this.firestore.collection("user", ref => ref.where('email', '==', email)).valueChanges();
  }

  forgotPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(r => {
      console.log("Email sent");
    });
  }
}
