import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrailerDialogComponent } from './movie-trailer-dialog.component';

describe('MovieTrailerDialogComponent', () => {
  let component: MovieTrailerDialogComponent;
  let fixture: ComponentFixture<MovieTrailerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieTrailerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTrailerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
