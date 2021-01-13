import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { MemberService } from 'src/services/member.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isLoggedIn: boolean = true;
  user: any;
  email: string = localStorage.getItem('email');



  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private MemberSrvice: MemberService
  ) {
  }

  ngOnInit(): void {
   this.authService.fireIsLoggedIn.subscribe(res => {
    const  email = localStorage.getItem("email");
    console.log(email);
    this.MemberSrvice.getMemberByEmail(email).then(resp => {
       console.log(resp)
          this.user = resp;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.isLoggedIn = true;
        });


    });
    if(this.email != null)
    { 
    this.MemberSrvice.getMemberByEmail(this.email).then(resp => {
     
         this.user = resp;
         localStorage.setItem('user', JSON.stringify(this.user));
         this.isLoggedIn = true;
       });

    }
   
  }
  // tslint:disable-next-line:typedef
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');

  }


}
