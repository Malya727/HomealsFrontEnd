import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-homeals',
  templateUrl: './homeals.component.html',
  styleUrls: ['./homeals.component.css']
})
export class HomealsComponent implements OnInit {

  constructor(private authService:AuthService,private route:Router) { }
  menu:any[]=[];
  loader:boolean = false;
  ngOnInit(): void {
    this.loader = true;
    this.displayItems();
  }
  displayItems(){
    this.authService.displayItems().subscribe(data =>{
      if(data["success"]){
        this.loader = false;
        let result = data['data'];
        this.menu =[];
        for(let res of result){
          this.menu.push([res['_id'],res['name'],res['type'],res['categories'],res['price'],res['photo']]);
        }
        console.log(this.menu);
      }
  });
  }
}
