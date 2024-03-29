import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { MemberService } from 'src/services/member.service';
import {Member} from '../../../../models/member.model';
import {MatDialog} from "@angular/material/dialog";
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  isAdmin = false ;
  displayedColumns: string[] = ['id', 'cin', 'nom', 'diplome' ,'email','dateNaissance', 'dateInscription', 'cv', 'type', 'etablisssement' ,'actions'];
  dataSource;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
  ) {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
    
  }

 
  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = new MatTableDataSource(data);
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ROLE_ADMIN';
    });
  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}