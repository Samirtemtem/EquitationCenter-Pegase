import { HttpInterceptorFn } from '@angular/common/http';

import { FirebaseAuthService } from '../services/firebase-auth.service';
import {inject} from "@angular/core";
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token= inject(FirebaseAuthService)
  const authToken= "";
  const authReq = req.clone({
    setHeaders: {
      Authorization1: `Bearer ${authToken}`
    }
  });
  console.log("auth interceptor", authReq);
  return next(authReq);
};
