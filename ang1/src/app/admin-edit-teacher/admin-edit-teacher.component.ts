// admin-edit-teacher.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-teacher',
  templateUrl: './admin-edit-teacher.component.html',
  styleUrls: ['./admin-edit-teacher.component.css']
})
export class AdminEditTeacherComponent implements OnInit {
  teacher: any = {};
  teacherId!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Teacher ID from URL:', this.teacherId);
    this.http.get(`http://localhost:8000/edit-teacher/${this.teacherId}/`)
      .subscribe({
        next: (data: any) => this.teacher = data,
        error: (err) => console.error('Error fetching teacher data', err)
      });
  }

  updateTeacher(): void {
    this.http.put(`http://localhost:8000/edit-teacher/${this.teacherId}/`, this.teacher)
      .subscribe({
        next: () => {
          alert('Teacher profile updated successfully!');
          this.router.navigate(['/admin-home']);
        },
        error: (err) => console.error('Error updating teacher profile', err)
      });
  }
}
