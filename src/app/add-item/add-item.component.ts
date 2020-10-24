import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  validext = ["jpg","jpeg","png"]
  exterror: boolean = false;
  files: File = null;
  validFile: boolean = false;
  showAddMenu: boolean = false;
  load: boolean = false;
  constructor(private authService:AuthService,) { }

  ngOnInit(): void {
    this.getMenuId();
  }
  AddItem(item_data)
  {
    this.load = true;
    console.log(item_data)
    if(this.validFile)
    {
      this.authService.addItems(item_data).subscribe(data =>{
        this.load = false;
        if(data["success"]){
          console.log(data);
          window.alert("Item Added");
          location.reload()
          let res = data.data;
          let id = res._id;
          this.authService.addPicture(this.files, id).subscribe(result =>{
            if(result['success']){
              console.log(result);
              window.alert("Item Added");
            }
          });
        }else{
          window.alert("Couldnt add item")
          location.reload()
        }
        
      },error=>{
        this.load = false
        console.log(error);
        let e = error.error
        window.alert(e.error)
      });
    }
    else
    {
      this.load = false;
      this.exterror = true;
    }
  }

  fileSelected(event)
  {
    this.files = <File>event.target.files[0];
    var split = this.files.name.split(".");
    if(this.validext.includes(split[split.length - 1]))
    {
      this.validFile = true;
    }
  }

  AddMenu(menu_item){
    this.load = true;
    this.authService.addMenu(menu_item).subscribe(data=>{
      this.load = false
      if(data["success"]){
        location.reload();
        window.alert("Menu Added")
        
      }
    },error=>{
      this.load = false;
      location.reload();
      let e = error.error
      window.alert(e.error)
      location.reload();
    });
  }

  getMenuId(){
    this.authService.getMenuId().subscribe(data=>{
      if(data["success"]){
        let res = data['data'];
        this.authService.setMenuId(res["_id"]);
        this.showAddMenu = false;
      }
    },error=>
    {
      this.showAddMenu = true;
      console.log(error);
    });
  }

}
