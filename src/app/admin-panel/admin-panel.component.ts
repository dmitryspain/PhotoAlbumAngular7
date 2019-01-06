import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ClientProfile } from './ClientProfile.model';
import { UserData } from './UserData.model';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
 // userName: string;
  users: Array<UserData>;
  
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

    this.http
    .get(this.rootUrl + '/api/GetAllUsers', {headers: header})
    .toPromise()
    .then((x: Array<UserData>) => {
      debugger;
      this.users = x; 
      console.log('users = ' + this.users)
    })
    .catch((x: Response) => {
      console.log(x.status);
    });
    console.log('users = ' + this.users)
  }

}
