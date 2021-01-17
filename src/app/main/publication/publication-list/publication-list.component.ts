import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Publication } from 'src/models/publication.model';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy, AfterViewInit {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  isAuthorized = false ;

  displayedColumns =  ['id', 'titre', 'type', 'date' , 'source', 'lien', 'actions'] ;
  dataSource;

  constructor(
    private publicationService: PublicationService,
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
    this.publicationService.getAllPublications().then(data => {
      this.dataSource = data;
      const role = localStorage.getItem('role');
      this.isAuthorized = role === 'ROLE_ADMIN' || role === 'ROLE_USER';
      if (this.isAuthorized) {
      }
      
    });
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

  ngAfterViewInit(): void
  {
    this.publicationService.getAllPublications().then(data => {
      this.dataSource = new MatTableDataSource(data);
      if (this.sort) // check it is defined.
      {
          this.dataSource.sort = this.sort;
      }
    });
  }

}