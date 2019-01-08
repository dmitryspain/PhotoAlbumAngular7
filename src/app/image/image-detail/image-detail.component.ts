import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Image } from 'src/app/shared/image.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
  image: Image;
  constructor(private imageService: ImageService, private route: ActivatedRoute,
    private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getImage();
  }

  removePhoto(Id: number){
    debugger;
    // this.imageService.RemovePhoto(Id);
    // debugger;
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    const endPoint = this.rootUrl + '/api/GetPhoto/1';
    return this.http
    .delete(this.rootUrl + '/api/RemovePhoto/' + Id, {headers: header})
    .toPromise()
    .then((statusCode: number) => {
      if(statusCode == 200)
        this.router.navigate(['/home']);
      else
        console.log('Status code = ' + statusCode);
    })
  }

  getImage() {
    // debugger;
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    
    let idFromRoute;
    
    this.route.params.subscribe(params => {
      idFromRoute = +params['id']; // (+) converts string 'id' to a number
   });

  //var image = this.imageService.getImage(idFromRoute);
   this.http
    .get(this.rootUrl + '/api/GetPhoto/' + idFromRoute, {headers: header})
    .toPromise()
    .then((x: Image) => {

      if(x == null)
        this.router.navigate(['/forbidden']);
      else
        this.image = x;
      })
      
  }

}
