import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {HomeComponent} from "./components/home/home.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'product-add',component:ProductAddComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
