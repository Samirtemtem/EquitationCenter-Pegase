import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {StoreComponent} from "./store/store.component";
import {authGuard} from "./guard/auth.guard";
import {PagenotfoundComponent} from "./404/pagenotfound/pagenotfound.component";
import {ProductDetailsComponent} from "./store/product-details/product-details.component";
import {CartViewComponent} from "./store/cart-view/cart-view.component";
import {OrdersComponent} from "./store/orders/orders.component";
import {CaptchaComponent} from "./signup/recovery/captcha/captcha.component";
import {RecoveryComponent} from "./signup/recovery/recovery.component";
export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path : "",component: HomeComponent},

  {path : "home",component: HomeComponent},
  {path : "store",component: StoreComponent,
    canActivate: [authGuard]
  },
  {path : "store/product",component: ProductDetailsComponent,
    canActivate: [authGuard]
  },
  {path : "store/cart",component: CartViewComponent,
    canActivate: [authGuard]
  },
  {
    path : "myorders",component: OrdersComponent,
    canActivate : [authGuard]
  },
  {
    path : "account/recovery/captcha",component: CaptchaComponent
  },
  { path : "account",component: RecoveryComponent},
  {path : "signup",component: SignupComponent},
  {path: "**", component: PagenotfoundComponent},
];
