import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { MemberService } from 'src/services/member.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isLoggedIn: boolean;
  user: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private MemberSrvice: MemberService
  ) {
  }

  ngOnInit(): void {
    this.authService.SaveCurentUser().subscribe(data => {

      this.MemberSrvice.getMemberByEmail(data._embedded.appUsers[0].userName).then(resp => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(this.user));

        this.isLoggedIn = true;


      });

    });
  }
  // tslint:disable-next-line:typedef
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }


}
