import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { PublicationService } from 'src/services/publication.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  membersCount;
  publicationsCount;
  toolsCount;

  constructor(
    private memberService: MemberService,
    private publicationService: PublicationService,
    private toolService: ToolService,
  ) { }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.membersCount = data.length;
    });
    this.publicationService.getAllPublications().then(data => {
      this.publicationsCount = data.length;
    });
    this.toolService.getAllTools().then(data => {
      this.toolsCount = data.length;
    });
  }

}
