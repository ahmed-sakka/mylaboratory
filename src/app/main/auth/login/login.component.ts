import { User } from './../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      username: [this.user?.username, Validators.required],
    password: [this.user?.password, Validators.required]

   });
  }




  // tslint:disable-next-line:typedef
   login(){
    const userObject: User = {...this.user , ...this.loginForm.value};
    console.log(userObject);
    this.authService.login(userObject)
        .subscribe(resp => {
          console.log(resp);
          this.authService.saveToken((resp as any).accessToken);
          localStorage.setItem("email", (resp as any).user.email);
          console.log(resp);
          localStorage.setItem("role", (resp as any).user.roles[0].name);

          this.authService.fireIsLoggedIn.emit();
          this.router.navigateByUrl('/');
        },
        err => {
        console.log(err);
        this.mode = 1;
        });

    }

}
