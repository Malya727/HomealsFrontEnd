import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-updatedelete',
  templateUrl: './updatedelete.component.html',
  styleUrls: ['./updatedelete.component.css']
})
export class UpdatedeleteComponent implements OnInit {

  food = [];
  menu:any[]=[];
  idToDelete: string;
  idToUpdated: String;
  loader:boolean = false;
  index:number;
  error:boolean = false;
  itemToUpdate: any[];
  constructor(private authService:AuthService,private route:Router) { }
  
  ngOnInit(): void {
    this.loader = true;
    this.displayItems();
  }
  displayItems(){
    this.authService.displayItems().subscribe(data =>{
      if(data["success"]){
        this.loader = false;
        let result = data['data'];
        if(result.length > 0){
        this.menu =[];
        let reader = new FileReader();
        for(let res of result){
          this.menu.push([res['_id'],res['name'],res['type'],res['categories'],res['price'],res['photo']]);
        }
        console.log(this.menu);
      }
      else{
        this.error = true;
      }
      }
      else{
        this.error = true;
      }
  });
  }

  
  deleteItem(){
    this.authService.deleteItem(this.idToDelete).subscribe(data=>{
      let id = this.idToDelete;
      if(data.success){
        // this.route.navigate(["/updatedelete"]);
        this.menu = this.menu.filter(menu => menu[0] != id);
        location.reload()
        console.log(this.menu);
      }
    },error=>{
      let e = error.error;
      console.log(error); 
    });
  }

  deleteId(id: string){
    this.idToDelete = id;
  }

  updateId(id: String, i: number){
    this.idToUpdated = id;
    this.index = i;
    this.itemToUpdate = this.menu[this.index];
  }

  updateItem(menu){
    this.authService.updateItem(this.idToUpdated,menu).subscribe(data=>{
      if(data.success){
        this.displayItems();
        location.reload();
      }
    },error=>{
      console.log(error);
    })
  }

}
