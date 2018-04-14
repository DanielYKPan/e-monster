import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListContentComponent } from './movie-list-content.component';

describe('MovieListContentComponent', () => {
  let component: MovieListContentComponent;
  let fixture: ComponentFixture<MovieListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
