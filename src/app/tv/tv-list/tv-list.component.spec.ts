import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvListComponent } from './tv-list.component';

describe('TvListComponent', () => {
  let component: TvListComponent;
  let fixture: ComponentFixture<TvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
