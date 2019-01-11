import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ImageService } from '../image/image.service';
import { HttpHeaders } from '@angular/common/http';
import { UserData } from '../admin-panel/UserData.model';
declare var $ : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';

  constructor(private router: Router, 
    private imageService: ImageService, private userService: UserService) {
  }
    
  ngOnInit() {
    $('.carousel').carousel();
$('#myCarousel').on('slide',function(){
  $('.blocky').fadeOut(300);
})
$('#myCarousel').on('slid',function(){
  $('.blocky').fadeIn(600).animate({marginLeft:"+=12%"},200).animate({marginLeft:"-=15%"},300).animate({marginLeft:"+=4%"},600);
})
  }

 
    
    

}
