import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailsComponent } from './tv-details.component';

describe('TvDetailsComponent', () => {
  let component: TvDetailsComponent;
  let fixture: ComponentFixture<TvDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
