import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { OrderComponent } from './features/orders/order/order.component';
import { proGuard } from './core/guards/pro.guard';
import { OrderHistoryComponent } from './features/order-history/order-history.component';
import { ProductManagementComponent } from './features/admin/product-management/product-management.component';
import { OrderManagementComponent } from './features/admin/order-management/order-management.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
  path: 'admin',
  component: MainLayoutComponent,
  canActivate: [roleGuard],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'products', component: ProductManagementComponent },
    { path: 'orders', component: OrderManagementComponent }
  ]
},
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      // I am assuming cart and order should be protected
    ]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      // Products list is protected
      { path: 'cart', component: CartComponent, canActivate: [proGuard] },
      { path: 'order', component: OrderComponent, canActivate: [proGuard] },
      { path: 'order-history', component: OrderHistoryComponent, canActivate: [proGuard] },
      { path: 'products', component: ProductsListComponent, canActivate: [proGuard] }
    ]
  }
];
