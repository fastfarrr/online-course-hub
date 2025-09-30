import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseId: number | null = null;
  courseData: any = {
    title: '',
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    // ✅ Retrieve course ID from route param
    const idParam = this.route.snapshot.paramMap.get('id');
    this.courseId = idParam ? +idParam : null;

    console.log('Course ID from URL:', this.courseId);

    if (this.courseId) {
      this.loadCourseData(this.courseId);
    } else {
      console.warn('No course selected for editing');
      // Optionally redirect
      this.router.navigate(['/show-my-courses']);
    }
  }

  loadCourseData(id: number): void {
    this.userservice.getCourseById(id).subscribe({
      next: (data) => {
        this.courseData = data;
      },
      error: (err) => console.error('Error loading course', err),
    });
  }

  updateCourse(): void {
    if (!this.courseId) return;
  
    this.userservice.updateCourse(this.courseId, this.courseData).subscribe({
      next: () => {
        alert('Course updated successfully!');
        this.router.navigate(['/show-my-courses']); // 👈 Navigate after success
      },
      error: (err) => console.error('Error updating course', err),
    });
  }
  
}
