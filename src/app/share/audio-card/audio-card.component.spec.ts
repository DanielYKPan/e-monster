import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCardComponent } from './audio-card.component';

describe('ListCardComponent', () => {
  let component: AudioCardComponent;
  let fixture: ComponentFixture<AudioCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
