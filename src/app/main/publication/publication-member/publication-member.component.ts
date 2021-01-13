import { ActivatedRoute } from '@angular/router';
import { Member } from './../../../../models/member.model';
import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-publication-member',
  templateUrl: './publication-member.component.html',
  styleUrls: ['./publication-member.component.scss']
})
export class PublicationMemberComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome' , 'email', 'dateNaissance', 'dateInscription', 'cv', 'type', 'actions'];
  dataSource: Member[] = [];
  constructor(private memberService: MemberService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {

      this.memberService.getPublicationmember(this.activeRouter.snapshot.params.id).then(data => {
        this.dataSource = data;



    });
    }

}
