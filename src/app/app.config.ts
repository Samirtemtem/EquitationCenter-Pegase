import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environments';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideAnimationsAsync(),
  importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)),
  provideHttpClient(withInterceptors([authInterceptor])),
  importProvidersFrom(BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot({ timeOut: 10000, positionClass: 'toast-top-right', preventDuplicates: true }))

    , provideAnimations()]
};
