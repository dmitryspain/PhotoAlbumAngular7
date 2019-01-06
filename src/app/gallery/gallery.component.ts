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

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.file;
      console.log('croped!');
  }


  constructor(private imageService: ImageService, 
    private http: HttpClient, 
    private route : ActivatedRoute,    
    private userService: UserService) {
   }

  ngOnInit() {
    this.getPhotos();
    //this.getAllUsers();
  }

  handleFileInput(file: FileList)
  {
    this.fileToUpload = file.item(0);
    // show image preview
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
        console.log('done');
        Caption.value = null;
        Image.Value = null;
      }
    )
  }

  SetAvatar(Image)
  {
    debugger;
    //var blob = new Blob([Image], {type: 'image/png'});
    var file = new File([this.croppedImage], 'imageFileName.png');
    this.imageService.setAvatar(file).subscribe(
      data =>{
        console.log('done');
        // Caption.value = null;
        // Image.Value = null;
      }
    )
  }

  
  // getPhoto() {
  //   const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
  //   this.http.get(this.rootUrl + '/api/GetPhoto', {headers: header}).subscribe(response => {
  //     debugger;
  //     this.image = response;
  //     this.imageSrc = 'data:image/jpeg;base64,' + this.image;
  //   });
  // }

  getPhotos() {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    
    this.route.params.subscribe(params => {
      this.userFromRoute = params['id']; // (+) converts string 'id' to a number
   });

   this.http
    .get(this.rootUrl + '/api/GetProfileData/' + this.userFromRoute, {headers: header})
    .toPromise()
    .then((x: ClientProfile) => {
      //debugger;
      //this.users = x; 
      this.imageEntities = x.Photos;
      this.description = x.Description;
      this.avatar = x.Avatar;
      this.noavatar = this.avatar == null;
      //this.imageEntities = x.json() as ;
      console.log('users = ' + this.users)
      })
      // .catch((x: Response) => {
      //   console.log(x.status);
      // });
    // this.http
    //   .get(this.rootUrl + '/api/GetAllPhotos/' + this.userFromRoute, {headers: header})
    //   .toPromise()
    //   .then((x: Array<Image>) => {
    //     this.imageEntities = x; 
    //   })
    //   .catch((x: Response) => {
    //     console.log(x.status);
    //   });
  }

  // getAllUsers() : Observable<any>
  // {
  //   const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

  //   // this.http
  //   // .get(this.rootUrl + '/api/GetAllUsers', {headers: header})
  //   // .toPromise()
  //   // .then((x: Array<UserData>) => {
  //   //   debugger;
  //   //   // this.users = x;
  //   //   this.users = x
  //   //   console.log('users = ' + this.users)
  //   // })
  //   // .catch((x: Response) => {
  //   //   console.log(x.status);
  //   // });
  //   // console.log('users = ' + this.users)
  //     // return this.http.get("/api/number/").map((json: Object): number => {
  //     // return (json["number"] as number);
       
  //     // });
  // }





}
