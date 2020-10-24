import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { getLocaleId } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email:string;
  loginerro:boolean = false;
  password:string;
  t:string;
  load:boolean = false;
  constructor(private loginservice:LoginService, private route:Router,private authService:AuthService) { }

  ngOnInit(): void {
  }

  cheflogin(user){
          this.load = true;
          this.loginservice.login(user).subscribe(data => {
          console.log("login",data);
          this.load = false;
          console.log("here", data['success'])
          if(data['success']){
            this.authService.setToken(data["token"]);
            this.t= data["token"];
            this.getId(this.t);
            this.route.navigate(["/homeals"]);
          }
          // else{
          //   this.load = false;
          //   this.loginerro = true;
          // }            
        });
  }

  getId(t){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+t
    });
    const httpOptions = {
      headers: headers_object
    };

    this.loginservice.getId(httpOptions).subscribe(data => {
     let res = data["data"];
     this.authService.setId(res["_id"]);
    });

  }

}
