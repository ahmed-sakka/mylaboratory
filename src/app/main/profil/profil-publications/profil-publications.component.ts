import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Publication } from 'src/models/publication.model';
import { PublicationService } from 'src/services/publication.service';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-profil-publications',
  templateUrl: './profil-publications.component.html',
  styleUrls: ['./profil-publications.component.scss']
})
export class ProfilPublicationsComponent implements OnInit, OnDestroy, AfterViewInit {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  isUser = false;
  isAdmin = false;
  isAuthorized = false;

  displayedColumns = ['id', 'titre', 'type', 'date', 'source', 'lien', 'actions'];
  dataSource;
  profilId;
  fullUser;

  constructor(
    private memberService: MemberService,
    private publicationService: PublicationService,
    private dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
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
    this.profilId = this.activatedRouter.snapshot.params.id;

    this.memberService.getFullMember(this.profilId).then(
      data => {
        this.fullUser = data;
        this.dataSource = new MatTableDataSource(this.fullUser.publications);
        if (this.sort) // check it is defined.
        {
          this.dataSource.sort = this.sort;
        }

        const role = localStorage.getItem('role');
        this.isAdmin = role === 'ROLE_ADMIN';
        this.isUser = role === 'ROLE_USER';
        this.isAuthorized = role === 'ROLE_ADMIN' || role === 'ROLE_USER';
      })

  }

  onRemoveItem(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.publicationService.removePublicationById(id).then(() => this.fetchDataSource());
      }
    });
  }

  // Sort
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.fetchDataSource();

  }

}