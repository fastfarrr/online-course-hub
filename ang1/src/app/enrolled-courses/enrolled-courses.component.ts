import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.css']
})
export class EnrolledCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  studentId: number = 0;

  constructor(private userService:UserService ,public router:Router) {}

  ngOnInit(): void {
    const student = this.userService.getStudentData();
    if (student) {
      this.studentId = student.id;
      this.userService.getEnrolledCourses(this.studentId).subscribe({
        next: (data) => {
          this.enrolledCourses = data;
      
          // For each course, fetch and assign progress
          this.enrolledCourses.forEach(course => {
            this.userService.getProgress(this.studentId, course.id).subscribe({
              next: (progressData:any) => {
                course.progress = progressData.progress;
              },
              error: () => {
                course.progress = 0;  // fallback if request fails
              }
            });
          });
        },
        error: (err) => {
          console.error('Failed to load enrolled courses', err);
        },
      });
      
    }
  }
  

viewLessons(courseId: number) {
  this.router.navigate(['/lessons', courseId]);
  }

}
