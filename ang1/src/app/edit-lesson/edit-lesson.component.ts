import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  lessonId!: number;
  courseId!: number;
  lessonData: any = {
    lesson_number: '',
    title: '',
    content: '',
    video_url: '',
    pdf_file: null
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lessonId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchLessonData();
  }

  fetchLessonData(): void {
    const url = `http://127.0.0.1:8000/lesson-detail/${this.lessonId}/`;
    const headers = new HttpHeaders({
      Authorization: `Token ${localStorage.getItem('authToken')}`
    });

    this.http.get<any>(url, { headers }).subscribe(
      data => {
        this.lessonData = data;
        this.courseId = data.course;  // Storing course ID for navigation
      },
      error => {
        console.error('Error fetching lesson:', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.lessonData.pdf_file = event.target.files[0];
    }
  }

  onSubmit(): void {
    const url = `http://127.0.0.1:8000/update-lesson/${this.lessonId}/`;
    const formData = new FormData();

    formData.append('lesson_number', this.lessonData.lesson_number);
    formData.append('title', this.lessonData.title);
    formData.append('content', this.lessonData.content);
    formData.append('video_url', this.lessonData.video_url || '');
    formData.append('course', this.courseId.toString());  // Course ID is required

    if (this.lessonData.pdf_file) {
      formData.append('pdf_file', this.lessonData.pdf_file);
    }

    const headers = new HttpHeaders({
      Authorization: `Token ${localStorage.getItem('authToken')}`
    });

    this.http.put(url, formData, { headers }).subscribe(
      response => {
        console.log('Lesson updated successfully:', response);
        this.router.navigate(['/course-lessons', this.courseId]);  // Navigate using courseId
      },
      error => {
        console.error('Error updating lesson:', error);
      }
    );
  }
}
