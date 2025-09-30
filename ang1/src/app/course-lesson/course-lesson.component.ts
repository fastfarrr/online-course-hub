import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';  // Using UserService for fetching lessons

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.css']
})
export class CourseLessonComponent implements OnInit {
  courseId!: number;
  lessons: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public router:Router
  ) {}

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId') || '0', 10);
    this.loadLessons();
  }

  loadLessons(): void {
    this.userService.getLessonsByCourse(this.courseId).subscribe({
      next: (res: any) => {
        console.log('Lessons fetched:', res);
        this.lessons = res;
      },
      error: (err) => {
        console.error('Error loading lessons:', err);
        this.errorMessage = 'Error loading lessons. Please try again later.';
      }
    });
  }

  // Handle lesson deletion
  deleteLesson(lessonId: number): void {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.userService.deleteLesson(lessonId).subscribe({
        next: () => {
          this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
          alert('Lesson deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting lesson:', err);
          alert('There was an error deleting the lesson');
        }
      });
    }
  }

  editLesson(lessonId: number): void {
    this.router.navigate(['/edit-lesson', lessonId]);
  }

  
}
