import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Event } from 'src/models/event.model';
import { Member } from 'src/models/member.model';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  currentItemId: string;
  item: Event;
  affectedMembers: Member[] = [];
  isAdmin = false;
  isAuthorized = false;

  constructor(
    private eventService: EventService,
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
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        
        this.memberService.getEventParticipent(this.activatedRoute.snapshot.params.id).then(data => {
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
        this.eventService.removeEventById(id).then(() => this.router.navigate(['./events']));
      }
    });
  }

}