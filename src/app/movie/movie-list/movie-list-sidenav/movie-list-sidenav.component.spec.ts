import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListSidenavComponent } from './movie-list-sidenav.component';

describe('MovieListSidenavComponent', () => {
  let component: MovieListSidenavComponent;
  let fixture: ComponentFixture<MovieListSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
