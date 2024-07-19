import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule} from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass
  ],
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  recoveryForm: FormGroup | any;
  errorMessage: string = '';
  emailPart1: String = '';
  hasError: boolean = false;
  ErrorText: String = "Please enter your e-mail.";
  emailPart2: String = '';
  isEmailValid: boolean = false;
  EmailExists: boolean = true;

  constructor(private firebaseAuthService: FirebaseAuthService,private router : Router) { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  async verifyEmail(){
    console.log("HEY");
    this.EmailExists = true;
    if (this.isEmailValid) {
      const email = `${this.emailPart1}@${this.emailPart2}`;
      let emails : [];
      let emailExists : boolean
      (await this.firebaseAuthService.checkEmailExists(email)).subscribe(res => {
        // Assuming res is an array of users. Adjust based on your actual data structure.
        if (res && res.length > 0) {
          console.log("Email exists");
          this.firebaseAuthService.forgotPassword(email);
          this.router.navigate(['/account/OneTimePassword']);
        } else {
          console.log("Email does not exist");
          this.EmailExists = false;
        }
      });
/*      if (emails.length > 0) {
       // localStorage.setItem("email", email);
     //   window.location.href = '/account/recovery/captcha';
      } else {
        this.errorMessage = "Email not found";
        return;
      }*/

    }
  }

  Checkone($event: KeyboardEvent) {
    this.EmailExists = true;
    this.isEmailValid = false;
    const fullEmail = `${this.emailPart1}@${this.emailPart2}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValidEmail = emailRegex.test(fullEmail);
    if(!isValidEmail) {
      this.hasError = true;
      this.ErrorText = "Please enter your e-mail.(Username@gmail.com)";
      this.isEmailValid = false;
    }
    else
    {
      this.hasError = false;
      this.ErrorText = "Please enter your e-mail.";
      this.isEmailValid = true;

    }
  }
}
