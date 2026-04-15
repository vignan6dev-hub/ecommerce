import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsListComponent } from './features/products/products-list/products-list.component';

export const routes: Routes = [
   {path:"",redirectTo:"register",pathMatch:"full"},
   {path:"register",component:RegisterComponent},
   {path:"login",component:LoginComponent},
   {path:"products",component:ProductsListComponent}
];
