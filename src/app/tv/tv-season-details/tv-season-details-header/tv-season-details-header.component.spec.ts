import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeasonDetailsHeaderComponent } from './tv-season-details-header.component';

describe('TvSeasonDetailsHeaderComponent', () => {
  let component: TvSeasonDetailsHeaderComponent;
  let fixture: ComponentFixture<TvSeasonDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvSeasonDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSeasonDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
