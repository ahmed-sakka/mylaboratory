import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from 'src/models/tool.model';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {

  currentItemId: string;
  item: Tool;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toolService: ToolService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Tool): void {
    this.form = new FormGroup({
      date: new FormControl(item?.date, [Validators.required] ),
      source: new FormControl(item?.source, [Validators.required]),
    });
  }

  onSubmit(): void {
    const objectToSubmit: Tool = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.toolService.saveTool(objectToSubmit).then(() => this.router.navigate(['./tools']));
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
}