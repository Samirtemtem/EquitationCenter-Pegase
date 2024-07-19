import {CanActivateFn, Router} from '@angular/router';
import {FirebaseAuthService} from "../services/firebase-auth.service";
import { inject } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const fireBaseAuthService = inject(FirebaseAuthService);
  const snackBar = inject(MatSnackBar);
   if(localStorage.getItem("token")) {
      return true;
  } else {
     snackBar.open('You must be logged in', 'OK', {
       duration: 5000,
       horizontalPosition: 'center',
       verticalPosition: 'top',
     });
    return router.navigateByUrl('/login');
  }
};
