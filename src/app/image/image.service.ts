import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../shared/image.model';
import { ClientProfile } from '../admin-panel/ClientProfile.model';

@Injectable()
export class ImageService {
  header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
  readonly rootUrl = 'http://localhost:50796';
  imageEntities: Array<Image>;
  
  constructor(private userService: UserService, private http: HttpClient) { 
    
  }

  isUserHavePhoto(userName: string, photoId: number) : Promise<boolean>
  {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

    let endPoint = this.rootUrl + '/api/IsUserHavePhoto/' + userName + '/' + photoId;
    var data = this.http
    .get(endPoint, {headers: header})
    .toPromise()
    .then((x: Promise<boolean>) => {
      return x;
    })

    return data
  }

  postFile(description: string, fileToUpload: File)
  {
    const endPoint = 'http://localhost:50796/api/UploadPhoto';
    const formData: FormData = new FormData();
    let name = localStorage.getItem('userName');
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageDescription', description);
    formData.append('UserName', name);

    return this.http.post(endPoint, formData, {headers: this.header});
  }

  setAvatar(fileToUpload: File)
  {
    debugger;
    let name = localStorage.getItem('userName');
    const endPoint = 'http://localhost:50796/api/SetAvatar/' + name;
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);

    return this.http.post(endPoint, formData, {headers: this.header});
  }

  RemovePhoto(Id: number):any
  {
    debugger;
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    const endPoint = 'http://localhost:50796/api/RemovePhoto/' + Id.toString();
    return this.http.get(endPoint, {headers: header});
  }

}

