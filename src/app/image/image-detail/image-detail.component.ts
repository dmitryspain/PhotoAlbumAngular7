import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Image } from 'src/app/shared/image.model';
import { GalleryComponent } from 'src/app/gallery/gallery.component';
import { Like } from 'src/app/shared/like.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  readonly rootUrl = 'http://localhost:50796';
  image: Image;
  canBeDeleted=false;
  likes: Like[];
  userFromRoute: string;
  likesCount:number;
  isLiked = false;

  constructor(private imageService: ImageService, private route: ActivatedRoute,
    private http: HttpClient, private router: Router) { }


    
  ngOnInit() {
    let idFromRoute;
    this.route.params.subscribe(params => {
      idFromRoute = +params['id']; 
    });

    this.getImage(idFromRoute);
  }

  removePhoto(Id: number){
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    let userName = localStorage.getItem('userName');
    return this.http
    .delete(this.rootUrl + '/api/ClientProfiles/RemovePhoto/' + Id, {headers: header})
    .subscribe(() => {
      this.router.navigate(['/gallery/' + userName], { queryParams : {isPhotoRemovedRecently: true}});
    })
  }

  likePhoto(){
    this.imageService.likePhoto(this.image.Id).subscribe(()=>{
      this.likesCount = this.isLiked ? this.likesCount - 1 : this.likesCount + 1;
      this.isLiked = !this.isLiked;
    });
    
  }

  getImage(Id: number) {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    this.http
    .get(this.rootUrl + '/api/ClientProfiles/GetPhoto/' + Id, {headers: header})
    .toPromise()
    .then((x: Image) => {

      if(x == null)
        this.router.navigate(['/forbidden']);
      else
        this.image = x;

        var userName = localStorage.getItem('userName');
        this.likes = this.image.Likes;
        this.likesCount = this.likes.length;
        this.isLiked = this.likes.some(x => x.UserName == userName);

        this.imageService.isUserHavePhoto(userName, this.image.Id).then(data=>{
          this.canBeDeleted = data;
        }) 
      })
  }
}
