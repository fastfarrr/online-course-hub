import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  teachers: any[] = [];
  students: any[] = [];
  courses: any[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.error = '';

    this.userService.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load teachers';
        this.loading = false;
      }
    });

    this.userService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
      },
      error: () => {
        this.error = 'Failed to load students';
      }
    });

    this.userService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: () => {
        this.error = 'Failed to load courses';
      }
    });
  }

  deleteTeacher(id: number) {
  if (confirm('Are you sure you want to delete this teacher?')) {
    this.userService.deleteTeacher(id).subscribe({
      next: () => this.loadAll(),
      error: () => alert('Failed to delete teacher')
    });
  }
}

deleteStudent(id: number) {
  if (confirm('Are you sure you want to delete this student?')) {
    this.userService.deleteStudent(id).subscribe({
      next: () => this.loadAll(),
      error: () => alert('Failed to delete student')
    });
  }
}

deleteCourse(id: number) {
  if (confirm('Are you sure you want to delete this course?')) {
    this.userService.deleteCourse(id).subscribe({
      next: () => this.loadAll(),
      error: () => alert('Failed to delete course')
    });
  }
}



editCourse(id: number) {
  this.router.navigate(['/course-edit', id]);  // Uses CourseEditComponent
}

editTeacher(id: number): void {
  this.router.navigate(['/admin-edit-teacher', id]);
}

approveUser(userId: number | undefined, type: 'student' | 'teacher') {
  if (!userId) {
    console.error('Invalid user ID');
    return;
  }

  this.userService.approveUser(userId, true).subscribe({
    next: (response) => {
      if (type === 'teacher') {
        const teacher = this.teachers.find(t => t.user_id === userId);
        if (teacher) teacher.is_staff = true;
      } else if (type === 'student') {
        const student = this.students.find(s => s.user_id === userId);
        if (student) student.is_staff = true;
      }
    },
    error: (err) => {
      console.error('Approval failed:', err);
    }
  });
}







}
