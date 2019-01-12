import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image/image.service';
import { Observable } from 'rxjs';
import { Image } from '../shared/image.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { User } from '../shared/user.model';
import { ClientProfile } from '../admin-panel/ClientProfile.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from '../shared/user.service';
import { UserData } from '../admin-panel/UserData.model';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  title = "Gallery";
  readonly rootUrl = 'http://localhost:50796';
  userFromRoute: string;
  imageEntities: Array<Image>;
  imageUrl : string = "/assets/img/default.jpg"; 
  fileToUpload : File = null;
  token : string;
  users: Array<UserData>
  userNames:string[];
  avatar: string;
  description:string;
  data:any;
  noavatar = true;
  imageChangedEvent: any = '';
  croppedImage: Blob;
  isPhotoRemovedRecently = false;
  canBeDeleted=false;
  base64avatar: string;

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.file;
      this.base64avatar = event.base64;
  }


  constructor(private imageService: ImageService, 
    private http: HttpClient, 
    private route : ActivatedRoute,    
    private userService: UserService) {
   }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.isPhotoRemovedRecently = params.isPhotoRemovedRecently;
      });

    
    this.getPhotos();
  }

  handleFileInput(file: FileList)
  {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    
  }

  OnSubmit(Caption,Image)
  {
    this.imageService.postFile(Caption.value, this.fileToUpload).subscribe(
      data =>{
        window.location.reload();
      }
    )
  }

  SetAvatar(Image)
  {
    debugger;
    var file = new File([this.croppedImage], 'imageFileName.png');
    this.imageService.setAvatar(file).subscribe(
      data =>{
        // debugger;
        this.avatar = this.base64avatar.split(',')[1];
      }
    )
  }

  getPhotos() {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    
    this.route.params.subscribe(params => {
      this.userFromRoute = params['id']; // (+) converts string 'id' to a number
   });

   this.http
    .get(this.rootUrl + '/api/ClientProfiles/' + this.userFromRoute, {headers: header})
    .toPromise()
    .then((x: ClientProfile) => {
      this.imageEntities = x.Photos;
      this.description = x.Description;
      this.avatar = x.Avatar;
      this.noavatar = this.avatar == null;
    })
      
  }






}
