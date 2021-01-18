import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../../../../@root/components/confirm-dialog/confirm-dialog.component';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
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

  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome', 'email', 'dateNaissance', 'dateInscription', 'cv', 'type', 'actions'];
  dataSource: Member[] = [];
  myControl = new FormControl();
  options: Member[] = [];
  filteredOptions: Observable<Member[]>;
  pubId: number;
  isAdmin = false;
  isAuthorized = false;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  constructor(private memberService: MemberService, private activeRouter: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pubId = this.activeRouter.snapshot.params.id;
    
    this.fetchData();

    this.memberService.getAllMembers().then(data => {
      this.options = data;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Member[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.cin.toLowerCase().indexOf(filterValue) === 0);
  }
  affecter(): void {
    const memberId = this.myControl.value;
    this.memberService.affecterPublication(this.pubId, memberId).then(reponse => {
      const member = this.options.filter(option => option.id === memberId);
      this.fetchData();
      this.myControl.patchValue('');
    });
  }
  fetchData(): void {
    this.memberService.getPublicationmember(this.activeRouter.snapshot.params.id).then(data => {
      this.dataSource = data;

      const logged_in_user = JSON.parse(localStorage.getItem('user')) as Member;
      const logged_in_user_id = (logged_in_user as unknown as Member).id;

      for (var member of this.dataSource) {
        if (member.id == logged_in_user_id) this.isAuthorized = true;
      }

      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ROLE_ADMIN';
      this.isAuthorized = this.isAuthorized || this.isAdmin;
    });

  }
  // tslint:disable-next-line:no-unused-expression
  onRemoveAffectation(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.deleteAffecterPublication(this.pubId, id).then(() => this.fetchData());
      }
    });
  }
}
