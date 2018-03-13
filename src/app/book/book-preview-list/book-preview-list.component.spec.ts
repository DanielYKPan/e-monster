import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPreviewListComponent } from './book-preview-list.component';

describe('BookPreviewListComponent', () => {
  let component: BookPreviewListComponent;
  let fixture: ComponentFixture<BookPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPreviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
