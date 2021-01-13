import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationMemberComponent } from './publication-member.component';

describe('PublicationMemberComponent', () => {
  let component: PublicationMemberComponent;
  let fixture: ComponentFixture<PublicationMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
