import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isLoggedIn: boolean;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.userClaims$.subscribe(user => {
      this.user = !!user ? user : null;
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.doLogout().finally(() => {
      this.router.navigate(['/login']);
    });
  }
}
