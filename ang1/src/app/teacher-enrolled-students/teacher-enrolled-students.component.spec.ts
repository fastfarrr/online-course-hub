import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEnrolledStudentsComponent } from './teacher-enrolled-students.component';

describe('TeacherEnrolledStudentsComponent', () => {
  let component: TeacherEnrolledStudentsComponent;
  let fixture: ComponentFixture<TeacherEnrolledStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherEnrolledStudentsComponent]
    });
    fixture = TestBed.createComponent(TeacherEnrolledStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
