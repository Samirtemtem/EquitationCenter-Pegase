import {Component, OnInit} from '@angular/core';
import {ToastModule} from "primeng/toast";

import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    ToastModule,
  ],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent implements OnInit{
  ngOnInit(): void {
  }

}
