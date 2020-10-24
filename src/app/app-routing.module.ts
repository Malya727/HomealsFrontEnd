import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { HomealsComponent } from './homeals/homeals.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UpdatedeleteComponent } from './updatedelete/updatedelete.component';

const routes: Routes = [
  {
    path:'',
    component:SigninComponent
  },
  {
    path:'signin',
    pathMatch:'full',
    component:SigninComponent
  },
  {
    path:'signup',
    pathMatch:'full',
    component:SignupComponent
  },
  {
    path:'homeals',
    pathMatch:'full',
    component:HomealsComponent
  },
  {
    path:'additem',
    pathMatch:'full',
    component:AddItemComponent
  },
  {
    path:'updatedelete',
    pathMatch:'full',
    component:UpdatedeleteComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
