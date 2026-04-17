import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { OrderComponent } from './features/orders/order/order.component';
import { proGuard } from './core/guards/pro.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      // I am assuming cart and order should be protected
      { path: 'cart', component: CartComponent, canActivate: [proGuard] },
      { path: 'order', component: OrderComponent, canActivate: [proGuard] }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Products list is protected
      { path: 'products', component: ProductsListComponent, canActivate: [proGuard] }
    ]
  }
];
