import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-my-courses',
  templateUrl: './show-my-courses.component.html',
  styleUrls: ['./show-my-courses.component.css']
})
export class ShowMyCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();  // Centralized loader
  }

  loadCourses(): void {
    this.userService.getTeacherCourses().subscribe({
      next: (response: any) => {
        this.courses = response;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  editCourse(course: any): void {
    if (!course || !course.id) {
      console.error('Invalid course data:', course);
      return;
    }

    console.log('Navigating to edit course:', course.id);
    this.router.navigate(['/course-edit', course.id]);
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.userService.deleteCourse(id).subscribe({
        next: () => {
          alert('Course deleted successfully!');
          this.loadCourses(); // Refresh after deletion
        },
        error: (err) => console.error('Error deleting course:', err)
      });
    }
  }

  createLesson(courseId: number): void {
    if (courseId) {
      console.log('Saving courseId to localStorage:', courseId); // Debugging line
      // Save selected course ID to localStorage (if needed elsewhere)
      localStorage.setItem('selected_course_id', courseId.toString());
      // Pass courseId as a parameter in the route
      this.userService.setSelectedCourseId(courseId);
      this.router.navigate(['/create-lesson', courseId]);
    } else {
      console.error('Invalid course ID:', courseId);
    }
  }

  viewLessons(courseId: number): void {
    // this.userService.setSelectedCourseId(courseId);
    this.router.navigate(['/course-lessons', courseId]);
  }
  
  selectCourse(courseId: number) {
  this.userService.setSelectedCourseId(courseId);
}
}