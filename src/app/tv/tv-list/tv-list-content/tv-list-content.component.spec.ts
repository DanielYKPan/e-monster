import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvListContentComponent } from './tv-list-content.component';

describe('TvListContentComponent', () => {
  let component: TvListContentComponent;
  let fixture: ComponentFixture<TvListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
