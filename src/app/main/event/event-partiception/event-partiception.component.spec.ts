import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticeptionComponent } from './event-partiception.component';

describe('EventParticeptionComponent', () => {
  let component: EventParticeptionComponent;
  let fixture: ComponentFixture<EventParticeptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventParticeptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventParticeptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
