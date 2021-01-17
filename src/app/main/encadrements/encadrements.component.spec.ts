import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrementsComponent } from './encadrements.component';

describe('EncadrementsComponent', () => {
  let component: EncadrementsComponent;
  let fixture: ComponentFixture<EncadrementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncadrementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncadrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
