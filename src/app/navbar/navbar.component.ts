import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string;
  
  constructor(private userService: UserService) { 
     this.userName = localStorage.getItem('userName');
    }

  ngOnInit() {
  }

  Logout(){
    this.userService.Logout();
  }

}
