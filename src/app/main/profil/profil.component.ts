import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public fullUser ;
  public ens;
  constructor(private memberService: MemberService , private activayeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.ens = JSON.parse(localStorage.getItem('user'));

    this.activayeRouter.params.subscribe(params =>
      this.memberService.getFullMember(params.id).then(
      data => { 
        this.fullUser = data;
      
      })

     );
  }
encadrer()
{
  this.memberService.encadrer(this.fullUser.id,this.ens.id);

}
}
