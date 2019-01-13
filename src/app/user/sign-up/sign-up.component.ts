import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user : User;
  angForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isSucceded = false;
  constructor(private userService: UserService,
    private fb: FormBuilder, private router: Router) 
  {
    this.createForm();
  }

  createForm() {
    // this.angForm = this.fb.group({
    //    name: ['', Validators.required , Validators.minLength(6)],
    //    email: ['', Validators.required, Validators.pattern(this.emailPattern)] //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]
    // });

   


  }

  ngOnInit() {
    this.resetForm();
    
    this.angForm = this.fb.group({
      name: ['', Validators.required , Validators.minLength(6)],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
   });
  }

  resetForm(form? : FormGroup)
  {
    if(form != null)
    form.reset();

    this.user = {
      UserName: '',
      Password: '',
      Email: '',
    }
  }

  OnSubmit(form : FormGroup)
  {
    debugger;
    this.user.Email = this.angForm.get('email').value;
    this.user.UserName = this.angForm.get('name').value;
    this.user.Password = this.angForm.get('password').value;
    this.userService.registerUser(this.user)
    .toPromise().then((data:any)=>{
    }).then(()=>{
      this.userService.userAuthentication(this.user.UserName, this.user.Password).subscribe(( data : any) =>
      {
        localStorage.setItem('userName', this.user.UserName);
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('userRoles', data.role);
        this.router.navigate(['/home']);
      })
      
    });
  }

}
