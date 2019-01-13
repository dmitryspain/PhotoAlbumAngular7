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
  allRoles: string[];
  userName=localStorage.getItem('userName');
  constructor(private userService: UserService,
    private http: HttpClient, private roleService: RoleService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  manageRoles(userName: string)
  {
    var allRoles: string[];
    var possibleRoles: any;
    var userRoles: string[] ;

    userRoles = this.users.find(x=>x.UserName == userName).Roles;
    this.roleService.getAllRoles().toPromise().then((data: string[])=>{
      allRoles = data;
      userRoles = this.users.find(x=>x.UserName == userName).Roles;

      possibleRoles = allRoles.filter(function(obj) {
        return !userRoles.some(function(obj2) {
            return obj['Name'] == obj2['Name'];
          });
      });

      this.allRoles = allRoles;
      this.possibleRoles = possibleRoles;
      this.userRoles = userRoles;
      this.currentUser = userName;
    });

  }
  
  removeFromRole(userName: string, roleName: string)
  {
    this.userService.deleteFromRole(userName, roleName).toPromise().then((data)=>{
      window.location.reload();
    });


  }

  addToRole(userName: string, roleName: string)
  {
    this.userService.addToRole(userName, roleName).toPromise().then(()=>{
      window.location.reload();
    });
  }
  
  deleteConfirm(userName: string) {
    if(confirm("Are you sure to delete " + userName)) {
      this.userService.removeUser(userName).subscribe(()=>{
        this.users = this.users.filter(item => item.UserName !== userName);
      })
    }
  }

  getAllUsers()
  {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

    this.userService.getAllUsers().subscribe(
      (data : UserData[]=[]) => {
        // debugger;
        for(var i = 0; i < data.length; ++i)
          this.users.push(data[i]);
        });
  }

}
