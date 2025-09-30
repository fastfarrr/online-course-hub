import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNavbarComponent } from './course-navbar.component';

describe('CourseNavbarComponent', () => {
  let component: CourseNavbarComponent;
  let fixture: ComponentFixture<CourseNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseNavbarComponent]
    });
    fixture = TestBed.createComponent(CourseNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
