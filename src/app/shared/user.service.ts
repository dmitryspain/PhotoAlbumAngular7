import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { debug } from 'util';
import { Router } from '@angular/router';
import { UserData } from '../admin-panel/UserData.model';


@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:50796';
  header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

  constructor(private http: HttpClient,private router: Router) 
  { 

  }

  registerUser(user: User)
  {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email
    }
    return this.http.post(this.rootUrl + '/api/Account/Register/', body);
  }

  userAuthentication(userName, password)
  {
    var data = "username="+userName+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.http.post(this.rootUrl + '/Token', data, {headers: reqHeader});
  }

  deleteFromRole(userName: string, roleName: string)
  {
    // debugger;
    let endpoint = this.rootUrl + '/api/Admins/' + userName + '/' + roleName;
    return this.http.delete(endpoint, {headers: this.header});
  }

  addToRole(userName: string, roleName: string)
  {
    // debugger;
    let endpoint = this.rootUrl + '/api/Admins/' + userName + '/' + roleName;
    return this.http.put(endpoint, {}, {headers: this.header});
  }

  removeUser(userName: string)
  {
    let endpoint = this.rootUrl + '/api/Admins/' + userName;
    return this.http.delete(endpoint, {headers: this.header});
  }

  changeDescription(description: string)
  {
    let userName = localStorage.getItem('userName');
    let endpoint = this.rootUrl + '/api/ClientProfiles/ChangeDescription/' + userName;
    const formData: FormData = new FormData();
    formData.append('Description', description);
    return this.http.put(endpoint, formData, {headers: this.header});
  }



  getAllUsers(){
  
    // let data: Array<User>;
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    // var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + '/api/Users', { headers: header });
    // this.http
    // .get(this.rootUrl + '/api/GetAllUsers', {headers: header})
    // .toPromise()
    // .then((x: Array<User>) => {
    //   debugger;
    //   data = x; 
    //   console.log('users = ' + data)

    //   })
    //   .catch((x: Response) => {
    //     console.log(x.status);
    //   });

    //   return data;
 
  }



  getAllPhotos() :any
  {
    const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    var data = this.http.get(this.rootUrl + '/api/GetAllPhotos', {headers: header});
    console.log(data);
    return data;
  }

  getImage():any{
    // const header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
    // let data = this.http.get(this.rootUrl + '/api/GetPhoto', {headers: header}).subscribe(response => {
    //   let image = response;
    //   let imageSrc = 'data:image/jpeg;base64,' + image;
    //   console.log('image = ' + image);
    //   console.log('imageSrc = ' + imageSrc);
    // });
    // return data;
  }

  getAllRoles()
  {
    debugger;
    var reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.get(this.rootUrl + '/api/Roles', {headers: reqHeader});
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    if(userRoles == null) return false;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  Logout()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
  }


}
