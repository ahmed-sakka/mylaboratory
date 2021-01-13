import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TollsMembersComponent } from './tolls-members.component';

describe('TollsMembersComponent', () => {
  let component: TollsMembersComponent;
  let fixture: ComponentFixture<TollsMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TollsMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TollsMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
