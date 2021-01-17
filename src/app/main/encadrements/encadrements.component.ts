import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/models/member.model';
import { MemberService } from 'src/services/member.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-encadrements',
  templateUrl: './encadrements.component.html',
  styleUrls: ['./encadrements.component.scss']
})
export class EncadrementsComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome' , 'email', 'dateNaissance', 'dateInscription', 'cv',  'actions'];
  dataSource: Member[] = [];

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
  ) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  fetchDataSource(): void {
    const user = JSON.parse(localStorage.getItem('user')) as Member;
    const id = (user as unknown as Member).id;
    this.memberService.getAllEncadrements(id).then(data => {
      this.dataSource = data;
      console.log(data[0]);
      });
  }
}
