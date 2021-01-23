import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public fullUser;
  public ens;
  encadre = false;
  isAuthorized = false;

  constructor(private memberService: MemberService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.ens = JSON.parse(localStorage.getItem('user'));

    this.activatedRouter.params.subscribe(params =>
      this.memberService.getFullMember(params.id).then(
        data => {
          this.fullUser = data;
          this.encadre = this.fullUser.encadrant === undefined || this.fullUser.encadrant === null;
        })

    );

    const logged_in_user = JSON.parse(localStorage.getItem('user')) as Member;
    const logged_in_user_id = (logged_in_user as unknown as Member).id;
    
    if (logged_in_user_id == this.activatedRouter.snapshot.params.id) this.isAuthorized = true;
  }
  encadrer() {

    this.memberService.encadrer(this.fullUser.id, this.ens.id).then(res => {
      this.encadre = false;

    });
  }
}
