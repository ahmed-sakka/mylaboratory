import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/models/event.model';
import { Member } from 'src/models/member.model';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  currentItemId: string;
  item: Event;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private memberService: MemberService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Event): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
    });
  }

  onSubmit(): void {
    const objectToSubmit: Event = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    //this.eventService.saveEvent(objectToSubmit).then(() => this.router.navigate(['./events']));
    const logged_in_user = JSON.parse(localStorage.getItem('user')) as Member;
    const logged_in_user_id = (logged_in_user as unknown as Member).id;
    this.eventService.saveEvent(objectToSubmit).then((resp) => this.memberService.affecterEvent(Number(resp.id), Number(logged_in_user_id)).then(resp => this.router.navigate(['./events'])));
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
}