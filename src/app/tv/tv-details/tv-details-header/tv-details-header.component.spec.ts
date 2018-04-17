import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailsHeaderComponent } from './tv-details-header.component';

describe('TvDetailsHeaderComponent', () => {
  let component: TvDetailsHeaderComponent;
  let fixture: ComponentFixture<TvDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
