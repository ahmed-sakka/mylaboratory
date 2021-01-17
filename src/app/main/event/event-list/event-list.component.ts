import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Event } from 'src/models/event.model';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
  ) {
  }
  /** Subject that emits when the component has been destroyed. */
  // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'lieu', 'date', 'actions'];
  dataSource;
  isUser = false;
  isAdmin = false;
  isAuthorized = false;

  // Sort
  @ViewChild(MatSort) sort: MatSort;

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  fetchDataSource(): void {
    this.eventService.getAllEvents().then(data => {
      this.dataSource = data;
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ROLE_ADMIN'; 
      this.isUser = role === 'ROLE_USER';
      this.isAuthorized = role === 'ROLE_ADMIN' || role === 'ROLE_USER'; 

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
        this.eventService.removeEventById(id).then(() => this.fetchDataSource());
      }
    });
  }

  ngAfterViewInit(): void
  {
    this.eventService.getAllEvents().then(data => {
      this.dataSource = new MatTableDataSource(data);
      if (this.sort) // check it is defined.
      {
          this.dataSource.sort = this.sort;
      }
    });
  }
}
