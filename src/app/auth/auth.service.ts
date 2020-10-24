import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject ,Observable, observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  id: String;
  public details = new Subject<string>();
  
  constructor(private route: Router, private http: HttpClient) {
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.details.next(token);
    return true;
    
  }

  setId(id: string){
    localStorage.setItem('id', id);
    return true;
  }

  
  getToken(){
    const t = localStorage.getItem('token');
    const headerObject = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + t
    });
    const httpOptions = {
      headers: headerObject
    };
    return httpOptions;
  }

  addPicture(file, id): Observable<any>  {
    console.log(file);
    const t = localStorage.getItem('token');
    const headersObject = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
       Authorization: 'Bearer '  + t
    });
    const httpOptions = {
      headers: headersObject
    };
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.baseUrl}items/${id}/photo`;
    return this.http.put<any>(url, {body: formData}, httpOptions);
  }

  addItems(items: string): Observable<any> {
    const httpOptions = this.getToken();
    const menuId = localStorage.getItem('menuId');
    const url = `${this.baseUrl}menus/${menuId}/items/`;
    return this.http.post<any>(url, items, httpOptions);
  }

  addMenu(menu: string): Observable<any>{
    const httpOptions = this.getToken();

    const url = `${this.baseUrl}menus`;
    return this.http.post<any>(url, menu, httpOptions);
  }

  getMenuId(){
    const httpOptions = this.getToken();
    const id = localStorage.getItem('id');
    const url = `${this.baseUrl}menus/sellerMenu/${id}`;
    return this.http.get<any>(url, httpOptions);
  }

  setMenuId(menuId: string){
    localStorage.setItem('menuId', menuId);
    return true;
  }

  displayItems(): Observable<any>{
    const httpOptions = this.getToken();
    const url = `${this.baseUrl}items`;
    return this.http.get<any>(url, httpOptions);
  }

  deleteItem(id: string): Observable<any>{
    const httpOptions = this.getToken();
    const url = `${this.baseUrl}items/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  updateItem(id:String, menu:String): Observable<any>{
    console.log('Update time');
    const httpOptions = this.getToken();
    const url = `${this.baseUrl}items/${id}`;
    return this.http.put<any>(url, menu, httpOptions);
  }
}
