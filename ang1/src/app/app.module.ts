import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserService } from './user.service';
import { StudentRegisterComponent } from './studentregister/studentregister.component';
import { TeacherregisterComponent } from './teacherregister/teacherregister.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { ShowMyCoursesComponent } from './show-my-courses/show-my-courses.component';
import { HomeComponent } from './home/home.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EnrollSubjectComponent } from './enroll-subject/enroll-subject.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { TeacherEnrolledStudentsComponent } from './teacher-enrolled-students/teacher-enrolled-students.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminEditStudentComponent } from './admin-edit-student/admin-edit-student.component';
import { AdminEditTeacherComponent } from './admin-edit-teacher/admin-edit-teacher.component';
import { StudentNavbarComponent } from './navbars/student-navbar/student-navbar.component';
import { TeacherNavbarComponent } from './navbars/teacher-navbar/teacher-navbar.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import { CourseNavbarComponent } from './navbars/course-navbar/course-navbar.component';
import { LessoneditNavbarComponent } from './navbars/lessonedit-navbar/lessonedit-navbar.component';
import { HomeNavbarComponent } from './navbars/home-navbar/home-navbar.component';
import { LogoutNavbarComponent } from './navbars/logout-navbar/logout-navbar.component';
import { LoginNavbarComponent } from './navbars/login-navbar/login-navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentRegisterComponent,
    TeacherregisterComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    CreateCourseComponent,
    ShowMyCoursesComponent,
    HomeComponent,
    CourseEditComponent,
    CreateLessonComponent,
    CourseLessonComponent,
    EditLessonComponent,
    EditProfileComponent,
    EnrollSubjectComponent,
    EnrolledCoursesComponent,
    LessonListComponent,
    TeacherEnrolledStudentsComponent,
    AdminHomeComponent,
    AdminEditStudentComponent,
    AdminEditTeacherComponent,
    StudentNavbarComponent,
    TeacherNavbarComponent,
    AdminNavbarComponent,
    CourseNavbarComponent,
    LessoneditNavbarComponent,
    HomeNavbarComponent,
    LogoutNavbarComponent,
    LoginNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:UserService,multi:true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
