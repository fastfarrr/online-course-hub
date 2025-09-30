import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  lessonData: any = {
    lesson_number: '',
    title: '',
    content: '',
    video_url: ''
  };
  pdfFile: File | null = null;
  courseId: number = 0;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the courseId from route parameters
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      if (courseId) {
        this.courseId = parseInt(courseId, 10);
        console.log('Course ID from route:', this.courseId); // Debugging line
      } else {
        alert('No course selected.');
        this.router.navigate(['/show-my-courses']);
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.pdfFile = file;
    }
  }

  onSubmit(): void {
    if (!this.courseId) {
      alert('Invalid course ID.');
      return;
    }

    const formData = new FormData();
    formData.append('course', this.courseId.toString());
    formData.append('lesson_number', this.lessonData.lesson_number);
    formData.append('title', this.lessonData.title);
    formData.append('content', this.lessonData.content);
    formData.append('video_url', this.lessonData.video_url);
    if (this.pdfFile) {
      formData.append('pdf_file', this.pdfFile);
    }

    this.userService.createLesson(formData).subscribe({
      next: (response) => {
        console.log('Lesson created successfully:', response);
        alert('Lesson created successfully!');
        this.router.navigate(['/show-my-courses']);
      },
      error: (error) => {
        console.error('Error creating lesson:', error);
        if (error.error) {
          console.error('Response from server:', error.error);
        }
        alert('Failed to create lesson. Please check your inputs.');
      }
    });
  }
}
