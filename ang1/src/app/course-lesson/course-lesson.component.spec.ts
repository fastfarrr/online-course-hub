import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonComponent } from './course-lesson.component';

describe('CourseLessonComponent', () => {
  let component: CourseLessonComponent;
  let fixture: ComponentFixture<CourseLessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseLessonComponent]
    });
    fixture = TestBed.createComponent(CourseLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
