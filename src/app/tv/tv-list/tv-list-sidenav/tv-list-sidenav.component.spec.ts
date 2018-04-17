import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvListSidenavComponent } from './tv-list-sidenav.component';

describe('TvListSidenavComponent', () => {
  let component: TvListSidenavComponent;
  let fixture: ComponentFixture<TvListSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvListSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvListSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
