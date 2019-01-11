import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ClientProfile } from './ClientProfile.model';
import { UserData } from './UserData.model';
import { Http, Response } from "@angular/http";
import { ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { RoleService } from '../shared/role.service';
import { Role } from '../shared/role.model';
declare var $:any;

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
  possibleRoles: string[];
  userRoles: string[];
  currentUser: string;
  constructor(private userService: UserService,
    private http: HttpClient, private roleService: RoleService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  manageRoles(userName: string)
  {
    // debugger;
    var allRoles: string[];
    var possibleRoles: any;
    var userRoles: string[] ;

    userRoles = this.users.find(x=>x.UserName == userName).Roles;
    // data.foreach(d=>users.push(d))
    this.roleService.getAllRoles().toPromise().then((data: string[])=>{
      //  debugger;
      allRoles = data;
      userRoles = this.users.find(x=>x.UserName == userName).Roles;

      possibleRoles = allRoles.filter(function(obj) {
        return !userRoles.some(function(obj2) {
            return obj['Name'] == obj2['Name'];
          });
      });

      this.possibleRoles = possibleRoles;
      this.userRoles = userRoles;
      this.currentUser = userName;
    });

  }
  
  removeFromRole(userName: string, roleName: string)
  {
    debugger;
    this.userService.deleteFromRole(userName, roleName).subscribe((data)=>{
      console.log(data);
      window.location.reload();
    });
  }

  addToRole(userName: string, roleName: string)
  {

    this.userService.addToRole(userName, roleName).subscribe((data)=>{
      console.log(data);
      window.location.reload();
    })
  }







  getAllUsers()
  {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

    this.userService.getAllUsers().subscribe(
      (data : UserData[]=[]) => {
        for(var i = 0; i < data.length; ++i)
          this.users.push(data[i]);
        });
  }

}
