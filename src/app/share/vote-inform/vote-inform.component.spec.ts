import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteInformComponent } from './vote-inform.component';

describe('VoteInformComponent', () => {
  let component: VoteInformComponent;
  let fixture: ComponentFixture<VoteInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
