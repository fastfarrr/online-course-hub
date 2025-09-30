import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpRequest,HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenkey = 'authToken';
  public id = 0;
  private loggedin = false;
  public username: string = '';
  public user_type: string = '';
  private studentId: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  // Signup (Register Student/Teacher)
  public Studentregister(data:any) {
    console.log(data)
    return this.http.post('http://127.0.0.1:8000/studentregister/',data);
  }

  public teacherregister(data:any) {
    console.log(data)
    return this.http.post('http://127.0.0.1:8000/teacherregister/',data);
  }
  getstudentdata(id: number) {
    return this.http.get(`http://127.0.0.1:8000/student-home/${id}/`);
  }



  updateStudent(id: number, studentData: any) {
    return this.http.put(`http://127.0.0.1:8000/update-student/${id}/`, studentData, {
      headers: new HttpHeaders({
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      })
    });
  }
  

  getteacherdata(id: number) {
    return this.http.get(`http://127.0.0.1:8000/teacher-home/${id}/`);
  }

  createCourse(courseData: any) {
    this.http.post('http://127.0.0.1:8000/create-course/', courseData)
      .subscribe(
        response => {
          console.log('Course created successfully:', response);
          alert('Course created!');
          this.router.navigate(['/show-my-courses']);
        },
        error => {
          console.error('Error creating course:', error);
          alert('Failed to create course.');
        }
      );
  }
  getTeacherCourses() {
    const teacherId = localStorage.getItem('user_id');
    return this.http.get(`http://127.0.0.1:8000/my-courses/`, {
      headers: new HttpHeaders().set('Authorization', `Token ${localStorage.getItem('authToken')}`)
    });
  }
  
  getCourseById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/course/${id}/`);
  }

  updateCourse(id: number, courseData: any) {
    return this.http.put(`http://127.0.0.1:8000/course/${id}/`, courseData);
  }

  deleteCourse(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/delete-course/${id}/`);
  }
 
  
  createLesson(lessonData: FormData) {
    return this.http.post('http://127.0.0.1:8000/create-lesson/', lessonData, {
      headers: new HttpHeaders({
        Authorization: `Token ${localStorage.getItem('authToken')}`
      })
    });
  }

  getLessonsByCourse(courseId: number) {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Token ${authToken}`
    });

    return this.http.get(`http://127.0.0.1:8000/lessons-by-course/${courseId}/`, { headers });
  }

  deleteLesson(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/delete-lesson/${id}/`);
  }
  

// Get lesson by ID
getLessonById(lessonId: number) {
  return this.http.get(`http://127.0.0.1:8000/lesson-detail/${lessonId}/`, {
    headers: new HttpHeaders({
      Authorization: `Token ${localStorage.getItem('authToken')}`
    })
  });
}

updateLesson(lessonId: number, lessonData: FormData) {
  return this.http.put(`http://127.0.0.1:8000/update-lesson/${lessonId}/`, lessonData, {
    headers: new HttpHeaders({
      Authorization: `Token ${localStorage.getItem('authToken')}`
    })
  });
}

getAllCourses() {
  return this.http.get('http://127.0.0.1:8000/all-courses/');
}

enrollInCourse(studentId: number, courseId: number) {
  return this.http.post('http://127.0.0.1:8000/enroll/', {
    student: studentId,
    course: courseId
  });
}


private studentData: any;

setStudentData(data: any): void {
  this.studentData = data;
}

getStudentData(): any {
  return this.studentData;
}

getEnrolledCourses(studentId: number) {
  return this.http.get<any[]>(`http://127.0.0.1:8000/enrolled-courses/${studentId}/`);
}

getLessonsByCourseId(courseId: number) {
  return this.http.get<any[]>(`http://127.0.0.1:8000/course-lessons/${courseId}/`);
}


markLessonAsCompleted(data: any) {
  return this.http.post('http://127.0.0.1:8000/lesson-complete/', data);
}

getProgress(studentId: number, courseId: number) {
  return this.http.get(`http://127.0.0.1:8000/progress/${studentId}/${courseId}/`);
}

getEnrolledStudents(courseId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
  return this.http.get(`http://localhost:8000/enrolled-students/${courseId}/`, { headers });
}

getTeachers() {
  return this.http.get<any[]>(`http://localhost:8000/view-teachers/`);
}

getStudents() {
  return this.http.get<any[]>(`http://localhost:8000/view-students/`);
}

getCourses() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Token ${token}` };
  return this.http.get<any[]>('http://localhost:8000/view-courses/', { headers });
}
deleteTeacher(id: number) {
  return this.http.delete(`http://localhost:8000/delete-teachers/${id}/`);
}

deleteStudent(id: number) {
  return this.http.delete(`http://localhost:8000/delete-students/${id}/`);
}

getStudentById(id: number) {
  return this.http.get(`http://localhost:8000/edit-student/${id}/`);
}

updateStudentByAdmin(id: number, studentData: any) {
  return this.http.put(`http://localhost:8000/edit-student/${id}/`, studentData);
}

approveUser(userId: number, approve: boolean) {
  const token = localStorage.getItem('authToken') || '';
  const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

  return this.http.put(`http://localhost:8000/approve-user/${userId}/`, { approve }, { headers });
}



login(
  token: string,
  UserId: number,
  user_type: string,
  username: string,
  is_superuser: boolean,
  is_staff: boolean
): void {
  this.loggedin = true;
  this.id = UserId;
  this.username = username;
  this.user_type = user_type;

  localStorage.setItem("user", "true");
  localStorage.setItem('authToken', token);
  localStorage.setItem("user_id", UserId.toString());
  localStorage.setItem("user_type", user_type);
  localStorage.setItem("is_superuser", is_superuser.toString());
  localStorage.setItem("is_staff", is_staff.toString());

  if (is_superuser) {
    this.router.navigate(['/admin-home']);
  } else if (user_type === 'student') {
    this.router.navigate(['/student-home']);
  } else if (user_type === 'teacher') {
    this.router.navigate(['/teacher-home']);
  } else {
    this.router.navigate(['/login']);
  }
}





  

  


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('authToken');
  

    if (req.url.includes('/studentregister') || req.url.includes('/teacherregister') || req.url.includes('/login')) {
      return next.handle(req);
    }
  
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`)
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }

logout() {
  this.loggedin = false;
  this.id = 0;
  this.username = '';
  this.user_type = '';
  
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_type");
  localStorage.removeItem("is_superuser");
  localStorage.removeItem("is_staff");

  this.router.navigate(['/login']);  // Optionally redirect to login
}


  public userRole: string = '';

  setUserRole(role: string) {
    this.userRole = role;
    localStorage.setItem('user_type', role);
  }

  getUserRole(): string {
    return this.userRole || localStorage.getItem('user_type') || '';
  }

    private selectedCourseId: number | null = null;

  setSelectedCourseId(id: number) {
    this.selectedCourseId = id;
  }

  getSelectedCourseId(): number | null {
    return this.selectedCourseId;
  }


}
