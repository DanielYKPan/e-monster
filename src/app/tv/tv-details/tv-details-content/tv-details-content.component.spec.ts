import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailsContentComponent } from './tv-details-content.component';

describe('TvDetailsContentComponent', () => {
  let component: TvDetailsContentComponent;
  let fixture: ComponentFixture<TvDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
