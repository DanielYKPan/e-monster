import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCastDialogComponent } from './movie-cast-dialog.component';

describe('MovieCastDialogComponent', () => {
  let component: MovieCastDialogComponent;
  let fixture: ComponentFixture<MovieCastDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCastDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCastDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
