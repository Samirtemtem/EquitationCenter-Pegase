import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, FormsModule, CommonModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup = new FormGroup({});
  loginError: string = "";
  showAlert: boolean = false;
  constructor(private firebaseAuth: FirebaseAuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.showAlert = false;
      console.log('Login form:', this.loginForm.value);

      this.firebaseAuth.login(this.loginForm.value.email, this.loginForm.value.password)
        .then((data) => {
          console.log("login success", data);
          this.loginError= '';
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem("token",data.user?.refreshToken || "");
          localStorage.setItem("email",data.user?.email ||"");
          this.firebaseAuth.isLoggedIn.next(true);
          this.router.navigate(['']);
        })
        .catch(error => {
          console.log(error.code)
          this.loginError= this.getErrorMessage(error.code);
          this.showAlert=true;
        });
    }
  }

  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This user has been disabled.';
      case 'auth/user-not-found':
        return 'User not found.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      case 'auth/invalid-credential':
        return 'Invalid credentials.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }
}
