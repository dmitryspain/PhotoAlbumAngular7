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
  canBeDeleted=false;
  likes: string[];
  userFromRoute: string;
  likesCount:number;
  constructor(private imageService: ImageService, private route: ActivatedRoute,
    private http: HttpClient, private router: Router) { }


    
  ngOnInit() {
    let idFromRoute;
    this.route.params.subscribe(params => {
      idFromRoute = +params['id']; // (+) converts string 'id' to a number
   });

    this.getImage(idFromRoute);
      // this.route.queryParams
    // .subscribe(params => {
    //   // debugger;
    //   // this.userFromRoute = params.user;
    // });
  }

  async removePhoto(Id: number){
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

  likePhoto(){
    this.imageService.likePhoto(this.image.Id).subscribe((data : Image)=>{
      this.likesCount = data.Likes.length;
    });
    
  }

  getImage(Id: number) {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    
  //   let idFromRoute;
    
  //   this.route.params.subscribe(params => {
  //     idFromRoute = +params['id']; // (+) converts string 'id' to a number
  //  });

   this.http
    .get(this.rootUrl + '/api/GetPhoto/' + Id, {headers: header})
    .toPromise()
    .then((x: Image) => {

      if(x == null)
        this.router.navigate(['/forbidden']);
      else
        this.image = x;
        this.likesCount = this.image.Likes.length;
        var user = localStorage.getItem('userName');
        this.imageService.isUserHavePhoto(user, this.image.Id).then(data=>{
          this.canBeDeleted = data;
        }) 
      })
  }
}
