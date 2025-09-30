import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enroll-subject',
  templateUrl: './enroll-subject.component.html',
  styleUrls: ['./enroll-subject.component.css']
})
export class EnrollSubjectComponent implements OnInit {
  courses: any[] = [];
  studentId: number = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.studentId = this.userService.getStudentData();
    // console.log('Loaded student ID:', this.studentId);

    if (!this.studentId) {
      alert('Student ID not found. Please go back to Student Home page.');
      this.router.navigate(['/student-home']);
      return;
    }

    this.userService.getAllCourses().subscribe(
      (data: any) => {
        this.courses = data;
        console.log('Courses loaded:', this.courses);
      },
      error => {
        console.error('Failed to load courses:', error);
      }
    );
  }

  enroll(courseId: number) {
    const studentId = this.userService.getStudentData()?.id; // Make sure this is the student ID (1)
  
    if (!studentId) {
      alert('Student ID not found.');
      return;
    }
  
    this.userService.enrollInCourse(studentId, courseId).subscribe(
      (response) => {
        console.log('Enrollment successful:', response);
        alert('Enrollment successful!');
      },
      (error) => {
        console.error('Enrollment failed:', error);
        alert('Enrollment failed. Please try again.');
      }
    );
  }
}
