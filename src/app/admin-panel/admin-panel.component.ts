import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ClientProfile } from './ClientProfile.model';
import { UserData } from './UserData.model';
import { Http, Response } from "@angular/http";
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
 // userName: string;
  users: UserData[] = [];
  userNames: string[];
  userEmails: string[];
  
  constructor(private userService: UserService,
    private http: HttpClient) { }

  ngOnInit() {
    //this.userName = localStorage.getItem('userName');
    //this.userService.getAllUsers();
    this.getAllUsers();
  }
  
  getAllUsers()
  {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    // debugger;
    this.userService.getAllUsers().subscribe(
      (data : UserData[]=[]) => {
        // debugger;
        for(var i = 0; i < data.length; ++i)
          this.users.push(data[i]);
        // data.foreach(d=>users.push(d))
        // this.users = data;
        
        // console.log('users1 = ' + this.users);
      }
      );
    console.log('users2 = ' + this.users);


// this.userService.getAllUsers();
    // this.http
    // .get(this.rootUrl + '/api/GetAllUsers', {headers: header})
    // .toPromise()
    // .then((x: UserData) => {

    //   debugger;
    //   // this.users = x; 
    //   this.userEmails = x.Emails;
      
    //   this.userNames = x.UserNames;
    //   console.log('users1 = ' + this.userNames)
    // })
    // .catch((x: Response) => {
    //   console.log(x.status);
    // })
    // .then(() => {
    //   console.log('users2 = ' + this.userNames)
    //   });
    // console.log('users3 = ' + this.userNames)
  }

}
