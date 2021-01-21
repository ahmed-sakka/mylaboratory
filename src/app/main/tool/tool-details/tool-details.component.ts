import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Member } from 'src/models/member.model';
import { Tool } from 'src/models/tool.model';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.scss']
})
export class ToolDetailsComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  item: Tool;
  affectedMembers: Member[] = [];
  isAdmin = false;
  isAuthorized = false;

  constructor(
    private toolService: ToolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private memberService: MemberService,
  ) {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;

        this.memberService.getOutilMembers(this.activatedRoute.snapshot.params.id).then(data => {
          this.affectedMembers = data;

          const logged_in_user = JSON.parse(localStorage.getItem('user')) as Member;
          const logged_in_user_id = (logged_in_user as unknown as Member).id;

          for (var member of this.affectedMembers) {
            if (member.id == logged_in_user_id) this.isAuthorized = true;
          }

          const role = localStorage.getItem('role');
          this.isAdmin = role === 'ROLE_ADMIN';
          this.isAuthorized = this.isAuthorized || this.isAdmin;


        });
      });
    }
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
        this.toolService.removeToolById(id).then(() => this.router.navigate(['./tools']));
      }
    });
  }

}