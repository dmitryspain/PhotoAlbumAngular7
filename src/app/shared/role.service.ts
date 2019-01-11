import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly rootUrl = 'http://localhost:50796';
  header  = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('userToken'));

  constructor(private http: HttpClient,private router: Router) 
  { 

  }

  getAllRoles(){
    let endPoint = this.rootUrl + '/api/Roles';
    return this.http.get(endPoint, {headers: this.header});
  }

}
