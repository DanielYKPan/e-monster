import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeasonDetailsComponent } from './tv-season-details.component';

describe('TvSeasonDetailsComponent', () => {
  let component: TvSeasonDetailsComponent;
  let fixture: ComponentFixture<TvSeasonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvSeasonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSeasonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
