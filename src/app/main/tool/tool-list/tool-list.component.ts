import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Tool } from 'src/models/tool.model';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'date' ,'source','actions'];
  dataSource: Tool[] = [];

  constructor(
    private toolService: ToolService,
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
    this.toolService.getAllTools().then(data => {
      this.dataSource = data;
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
        this.toolService.removeToolById(id).then(() => this.fetchDataSource());
      }
    });
  }

}