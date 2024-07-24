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

  async register(email: string, password: string,name: string,lastname: string,phoneNumber: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        await this.firestore.collection("user").doc(user.uid).set({
          email: user.email,
          uid: user.uid,
          display_name : name,
          created_time : new Date(),
          firstname : name,
          lastname: lastname,
          phone_number: phoneNumber,
          photo_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",

        });
        console.log("User added to Firestore");
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      throw error; // Or handle it as needed
    }
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
