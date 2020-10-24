import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  env = environment
  constructor(private http: HttpClient) { }

  login(user){
    let url = `${this.env.baseUrl}auth/login`;
    return this.http.post<any>(url, user);
  }

  getId(header){
    let url = `${this.env.baseUrl}auth/me`;
    return this.http.get<any>(url,header);
  }
}
