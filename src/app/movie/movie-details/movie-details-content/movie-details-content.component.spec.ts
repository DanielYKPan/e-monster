import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsContentComponent } from './movie-details-content.component';

describe('MovieDetailsContentComponent', () => {
  let component: MovieDetailsContentComponent;
  let fixture: ComponentFixture<MovieDetailsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
