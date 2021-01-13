import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {Member} from '../../../../models/member.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  item: Member;
  form: FormGroup;
  selectedValue = 'etudiant';
  isStudent = false;
  isEns = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        if (item.type === 'etudiant'){
          this.isStudent = true ;
          this.initFormEtudiant(item);
        }else{
          this.isEns = true ;
          this.initFormEns(item);
        }
      });
    } 
  }

  private initFormEtudiant(item: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      dateNaissance: new FormControl(item?.dateNaissance, [Validators.required]),
      cv: new FormControl(item?.cv, []),
      email: new FormControl(item?.email, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      diplome: new FormControl(item?.diplome, [Validators.required]),
      dateInscription: new FormControl(item?.dateInscription, [Validators.required]),

    });
  }
  private initFormEns(item: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      dateNaissance: new FormControl(item?.dateNaissance, [Validators.required]),
      cv: new FormControl(item?.cv, []),
      email: new FormControl(item?.email, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      grade: new FormControl(item?.grade, [Validators.required]),
      etablissement: new FormControl(item?.etablissement, [Validators.required]),

    });
  }

  onSubmit(): void { 
    const objectToSubmit: Member = {...this.item, ...this.form.value};
    if(this.selectedValue === 'etudiant') {
    this.memberService.saveMemberEtudiant(objectToSubmit).then(() => this.router.navigate(['./members']));
    }
    else {
    this.memberService.saveMemberEns(objectToSubmit).then(() => this.router.navigate(['./members']));
    }
  }
  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
  choisir(): void{
    console.log(this.selectedValue);
    if (this.selectedValue === 'etudiant') {
      this.isStudent = true;
      this.initFormEtudiant(null);
    }
    if(this.selectedValue === 'ens'){
      this.isEns = true;
      this.initFormEns(null);
    }
  }
  
}