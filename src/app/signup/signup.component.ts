import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupError: string = '';
  signupForm: FormGroup = new FormGroup({});
  constructor(private firebaseAuth: FirebaseAuthService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_verification : ['', Validators.required]
    },
      {validators : this.passwordMatchValidator});
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const password_verification = control.get('password_verification');
    if (password?.value !== password_verification?.value) {
      return { 'mismatch': true };
    }
    return null;
  }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Login form:', this.signupForm.value);
      this.firebaseAuth.register(this.signupForm.value.email, this.signupForm.value.password)
        .then((data) => {
          console.log("register success", data)
          this.router.navigate(['/login']);
        })
        .catch(error => {
          console.log(error);
          this.signupError = this.getErrorMessage(error.code);
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
