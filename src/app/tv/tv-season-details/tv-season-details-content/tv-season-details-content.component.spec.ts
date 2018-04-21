import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeasonDetailsContentComponent } from './tv-season-details-content.component';

describe('TvSeasonDetailsContentComponent', () => {
  let component: TvSeasonDetailsContentComponent;
  let fixture: ComponentFixture<TvSeasonDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvSeasonDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSeasonDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
