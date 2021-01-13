import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Member } from './../../../../models/member.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-partiception',
  templateUrl: './event-partiception.component.html',
  styleUrls: ['./event-partiception.component.scss']
})
export class EventParticeptionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome' , 'email', 'dateNaissance', 'dateInscription', 'cv', 'type', 'actions'];
  dataSource: Member[] = [];
  constructor(private memberService: MemberService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {

      this.memberService.getEventParticipent(this.activeRouter.snapshot.params.id).then(data => {
        this.dataSource = data;



    });
    }

}
