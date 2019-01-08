import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user : User;
  angForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService,
    private fb: FormBuilder, private notificationService: NotificationService) 
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
    
    let rofl = this.angForm.status;
    this.userService.registerUser(this.user)
    .subscribe((data:any)=>{
      if(data.Succeeded == true)
      {
        this.resetForm(form);
        this.notificationService.show({
          content: 'Your data has been saved. Time for tea!',
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'success', icon: true },
          closable: true
      });
      }
      // else this.toastr.error(data.Errors[0]);
    });
  }

}
