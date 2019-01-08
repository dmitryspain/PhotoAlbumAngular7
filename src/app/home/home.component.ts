import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ImageService } from '../image/image.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
  readonly notifier : NotificationService;
  constructor(
    private router: Router, 
    private imageService: ImageService)
    { 
    }

  ngOnInit() {
    this.asdasdasd();
  }
  
  asdasdasd(){
  
  }
    

}
