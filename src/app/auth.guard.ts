import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private route : Router) { }

  canActivate() : boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    else{
      this.route.navigate(['/signin']);
      return false;
    }
  }
  
}
