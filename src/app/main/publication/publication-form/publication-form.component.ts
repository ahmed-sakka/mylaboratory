import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { Publication } from 'src/models/publication.model';
import { MemberService } from 'src/services/member.service';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  currentItemId: string;
  item: Publication;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private memberService: MemberService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Publication): void {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, ),
      date: new FormControl(item?.date, ),
      source: new FormControl(item?.source, []),
      lien: new FormControl(item?.lien, ),
    });
  }

  onSubmit(): void {
    const objectToSubmit: Publication = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    //this.publicationService.savePublication(objectToSubmit).then(() => this.router.navigate(['./publications']));
    const logged_in_user = JSON.parse(localStorage.getItem('user')) as Member;
    const logged_in_user_id = (logged_in_user as unknown as Member).id;
    this.publicationService.savePublication(objectToSubmit).then((resp) =>this.memberService.affecterPublication(Number(resp.id), Number(logged_in_user_id )).then(resp=>  this.router.navigate(['./publications'])));
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
}