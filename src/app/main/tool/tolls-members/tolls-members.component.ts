import { ConfirmDialogComponent } from './../../../../@root/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Member } from './../../../../models/member.model';
import { Component, OnInit } from '@angular/core';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tolls-members',
  templateUrl: './tolls-members.component.html',
  styleUrls: ['./tolls-members.component.scss']
})
export class TollsMembersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome' , 'email', 'dateNaissance', 'dateInscription', 'cv', 'type', 'actions'];
  dataSource: Member[] = [];
   myControl = new FormControl();
  options: Member[] = [];
  filteredOptions: Observable<Member[]>;
  outilId: number ;
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();
  constructor(private memberService: MemberService, private activeRouter: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.outilId = this.activeRouter.snapshot.params.id;
    this.memberService.getOutilMembers(this.outilId).then(data => {
        console.log(data);
        this.dataSource = data;



    });
    this.memberService.getAllMembers().then(data => {
      this.options = data ;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    }
    private _filter(value: string): Member[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.cin.toLowerCase().indexOf(filterValue) === 0);
    }

    affecter(): void{
      const memberId = this.myControl.value ;
      this.memberService.affecterOutil(this.outilId , memberId ).then(reponse => {
      const member = this.options.filter(option => option.id === memberId);
      this.dataSource.push(member[0]);
      this.myControl.patchValue('');
      window.location.reload();
      });

    }
    fetchData(): void {
      this.memberService.getEventParticipent(this.activeRouter.snapshot.params.id).then(data => {
        this.dataSource = data;



    }); }
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
                this.memberService.deleteAffecterEvent(this.outilId, id).then(() => this.fetchData());
              }
            });
          }


}
