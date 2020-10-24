import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }
  id:string = '';
  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.id = localStorage.getItem('id')
    console.log("from Logout",this.id)
    this.route.navigate(["/signin"]);
  }

}
