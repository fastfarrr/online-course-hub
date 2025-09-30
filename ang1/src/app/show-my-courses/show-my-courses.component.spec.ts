import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyCoursesComponent } from './show-my-courses.component';

describe('ShowMyCoursesComponent', () => {
  let component: ShowMyCoursesComponent;
  let fixture: ComponentFixture<ShowMyCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMyCoursesComponent]
    });
    fixture = TestBed.createComponent(ShowMyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
