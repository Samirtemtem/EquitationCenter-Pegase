import {Component, OnInit} from '@angular/core';
import {ToastModule} from "primeng/toast";

import { PrimeNGConfig } from 'primeng/api';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";
@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [
    ToastModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent implements OnInit{
  // @ts-ignore
  protected aFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess($event: string) {

  }

  HandleSuccess() {
    console.log("hi");
  }
}
