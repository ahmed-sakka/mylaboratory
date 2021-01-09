import { User } from './../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User ;
  mode: number;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private ngZone: NgZone,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    const token = this.authService.loadToken();
    if (token) {
      this.router.navigateByUrl('/');
  }

    this.loginForm = this.fb.group({
      userName: [this.user?.userName, Validators.required],
    password: [this.user?.password, Validators.required]

   });
  }




  // tslint:disable-next-line:typedef
   login(){
    const userObject: User = {...this.user , ...this.loginForm.value};
    console.log(userObject);
    this.authService.login(userObject)
        .subscribe(resp => {
          const jwtToken = resp.headers.get('authorization');
          this.authService.saveToken(jwtToken);
         
        this.router.navigateByUrl('/');
        },
        err => {
        console.log(err)
        this.mode = 1;
        });

    }

}
