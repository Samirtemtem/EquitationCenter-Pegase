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
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FileUpload} from "primeng/fileupload";
import {finalize, firstValueFrom, Observable} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupError: string = '';
  signupForm: FormGroup = new FormGroup({});
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,private firebaseAuth: FirebaseAuthService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.signupForm = this.fb.group({
        name: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_verification: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]]
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
  async onSubmit() {

    if (this.signupForm.valid) {

      console.log('Login form:', this.signupForm.value);
      const res = await firstValueFrom(await this.firebaseAuth.checkEmailExists(this.signupForm.value.email));
      if (res && res.length > 0) {
        console.log("Email exists");
        this.signupError = "Email already exists";
        return;
      }
      this.firebaseAuth.register(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name,this.signupForm.value.lastname, this.signupForm.value.phoneNumber)
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
        return 'This email is already in use, Please recover your account or use a different email.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      case 'auth/invalid-credential':
        return 'Invalid credentials.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }
  selectedFile: File | null = null;

  private basePath = '/uploads';
  uploadedFileURL: Observable<string> | string = "http://placehold.it/400x300";
  uploadingPercentage: number|undefined = 0;
  async onFileSelected($event: Event) {
    // @ts-ignore
    const file = $event.target.files[0];
    const filePath = `uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadedFileURL = "https://www.formulalotto.com/mue/uploading.gif";
    task.percentageChanges().subscribe((percentage) => {
      this.uploadingPercentage = percentage;
    });
    task
      .snapshotChanges()
      .pipe(

        finalize(() => {

          fileRef.getDownloadURL().subscribe((url) => {
            console.log("URL = ", url);
            this.uploadedFileURL = url;
          });
        })
      )
      .subscribe();

  }

  getFileURL() {
    return this.uploadedFileURL;
  }

}
