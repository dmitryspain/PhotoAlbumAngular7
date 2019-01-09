import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ImageService } from '../image/image.service';
import { HttpHeaders } from '@angular/common/http';
import { UserData } from '../admin-panel/UserData.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
  users: UserData[]=[];

  


  constructor(private router: Router, 
    private imageService: ImageService, private userService: UserService) {
  }
    
  showSuccess() {
   console.log('users = '+ this.users);
  }

  ngOnInit() {
    // this.getAllUsers();
  }

  // getAllUsers()
  // {
  //   const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
  //   // debugger;
  //   this.userService.getAllUsers().subscribe(
  //     (data : UserData[]=[]) => {
  //       for(var i = 0; i < data.length; ++i)
  //         this.users.push(data[i]);
  //     })
    
  // }
    
    

}
