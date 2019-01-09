import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Image } from 'src/app/shared/image.model';
import { GalleryComponent } from 'src/app/gallery/gallery.component';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
  image: Image;
  canBeDeleted = false;
  // canDelete = false;
  userFromRoute: string;
  constructor(private imageService: ImageService, private route: ActivatedRoute,
    private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.getImage();
    // this.route.queryParams
    // .subscribe(params => {
    //   // debugger;
    //   // this.userFromRoute = params.user;
    // });
    this.canBeDeleted = this.canDelete(this.image.Id);
    console.log('can = ' + this.canBeDeleted);

  }

  canDelete(Id: number) : boolean
  {
    debugger;

    var user = localStorage.getItem('userName');
    debugger;
    return this.imageService.isUserHavePhoto(user, Id); 

    //this.imageEntities.find(x=>x.Id == Id) != null;
  }




  removePhoto(Id: number){
    debugger;
    // this.imageService.RemovePhoto(Id);
    // debugger;

    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    let userName = localStorage.getItem('userName');
    return this.http
    .delete(this.rootUrl + '/api/RemovePhoto/' + Id, {headers: header})
    .toPromise()
    .then((statusCode: number) => {
      if(statusCode == 200)
        this.router.navigate(['/gallery/' + userName], { queryParams : {isPhotoRemovedRecently: true}});
      else
        console.log('Status code = ' + statusCode);
    })
  }

  getImage() {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    
    let idFromRoute;
    
    this.route.params.subscribe(params => {
      idFromRoute = +params['id']; // (+) converts string 'id' to a number
   });

   this.http
    .get(this.rootUrl + '/api/GetPhoto/' + idFromRoute, {headers: header})
    .toPromise()
    .then((x: Image) => {

      if(x == null)
        this.router.navigate(['/forbidden']);
      else
        this.image = x;
        var user = localStorage.getItem('userName');
        this.imageService.isUserHavePhoto(user, this.image.Id).then(data=>{
          this.canBeDeleted = data;
        }) 
      })
      
  }

}
