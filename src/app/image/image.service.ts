import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../shared/image.model';

@Injectable()
export class ImageService {
  readonly rootUrl = 'http://localhost:50796';
  imageEntities: Array<Image>;
  
  constructor(private userService: UserService, private http: HttpClient) { }

  getPhotos(): Array<Image>{
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

    this.http
      .get(this.rootUrl + '/api/GetPhotos', {headers: header})
      .toPromise()
      .then((x: Array<Image>) => {
        this.imageEntities = x; 
      })
      .catch((x: Response) => {
        console.log(x.status);
      });

    return this.imageEntities;
  }

  postFile(description: string, fileToUpload: File)
  {
    const endPoint = 'http://localhost:50796/api/UploadPhoto';
    const formData: FormData = new FormData();
    let name = localStorage.getItem('userName');
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageDescription', description);
    formData.append('UserName', name);

    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    return this.http.post(endPoint, formData, {headers: header});
  }

  setAvatar(fileToUpload: File)
  {
    debugger;
    let name = localStorage.getItem('userName');
    const endPoint = 'http://localhost:50796/api/SetAvatar/' + name;
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);

    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    return this.http.post(endPoint, formData, {headers: header});
  }
}

