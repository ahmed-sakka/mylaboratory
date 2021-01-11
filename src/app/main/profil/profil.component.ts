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
  constructor(private mumberService: MemberService , private activayeRouter: ActivatedRoute) { }

  ngOnInit(): void {
     this.activayeRouter.params.subscribe(params =>
      this.mumberService.getFullMember(params.id).then(
      data => {this.fullUser = data;

               console.log(this.fullUser);
      })

     );
  }

}
