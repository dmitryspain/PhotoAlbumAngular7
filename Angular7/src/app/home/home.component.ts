import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ImageService } from '../image/image.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from '@angular/http';
import { Image } from '../shared/image.model';
import { catchError } from 'rxjs/operators';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
  
  constructor(
    private router: Router, 
    private imageService: ImageService, 
    private http: HttpClient) 
    { 
      
    }

  ngOnInit() {
    // $(document).ready(function($) {
 
    //   $('#myCarousel').carousel({
    //           interval: 100
    //   });
     
    //   //Handles the carousel thumbnails
    //   $('[id^=carousel-selector-]').click(function () {
    //     console.log('PRESSED');
    //   var id_selector = $(this).attr("id");
    //   try {
    //       var id = /-(\d+)$/.exec(id_selector)[1];
    //       console.log(id_selector, id);
    //       $('#myCarousel').carousel(parseInt(id));
    //   } catch (e) {
    //       console.log('Regex failed!', e);
    //   }
    //  });
    //   // When the carousel slides, auto update the text
    //   $('#myCarousel').on('slid.bs.carousel', function (e) {
    //            var id = $('.item.active').data('slide-number');
    //           $('#carousel-text').html($('#slide-content-'+id).html());
    //   });
    //  });
  }


  // getPhoto() {
  //   const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
  //   this.http.get(this.rootUrl + '/api/GetPhoto', {headers: header}).subscribe(response => {
  //     debugger;
  //     this.image = response;
  //     this.imageSrc = 'data:image/jpeg;base64,' + this.image;
  //   });
  // }

}
