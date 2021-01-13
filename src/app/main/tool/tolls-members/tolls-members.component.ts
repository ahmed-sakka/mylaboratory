import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Member } from './../../../../models/member.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tolls-members',
  templateUrl: './tolls-members.component.html',
  styleUrls: ['./tolls-members.component.scss']
})
export class TollsMembersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome' , 'email', 'dateNaissance', 'dateInscription', 'cv', 'type', 'actions'];
  dataSource: Member[] = [];
  constructor(private memberService: MemberService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {

      this.memberService.getOutilMembers(this.activeRouter.snapshot.params.id).then(data => {
        console.log(data);
        this.dataSource = data;



    });
    }

}
