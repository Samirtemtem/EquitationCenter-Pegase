import { Component } from '@angular/core';
import {FirebaseAuthService } from '../services/firebase-auth.service';
import {Observable} from "rxjs";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoggedIn = this.authService.isLoggedIn.subscribe();

  constructor(private authService: FirebaseAuthService) {}


}
