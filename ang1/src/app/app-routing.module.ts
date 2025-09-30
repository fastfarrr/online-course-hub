import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  {path:'login',component:LoginComponent },
  {path:'studentregister',component:StudentRegisterComponent},
  {path:'teacherregister',component:TeacherregisterComponent},
  {path: 'student-home',component: StudentHomeComponent},
  {path:'teacher-home',component:TeacherHomeComponent},
  {path:'create-course', component: CreateCourseComponent},
  {path:'show-my-courses', component: ShowMyCoursesComponent},
  {path:'course-edit/:id', component: CourseEditComponent},
  {path:'create-lesson/:courseId',component:CreateLessonComponent},
  {path:'course-lessons/:courseId',component:CourseLessonComponent},
  {path: 'edit-lesson/:id', component: EditLessonComponent},
  {path:'edit-profile/:id',component:EditProfileComponent},
  {path:'enroll-subject', component: EnrollSubjectComponent },
  {path:'enrolled-courses', component: EnrolledCoursesComponent },
  {path:'lessons/:courseId', component: LessonListComponent },
  { path:'enrolled-students/:courseId', component: TeacherEnrolledStudentsComponent },
  {path:'admin-home', component: AdminHomeComponent },
  { path: 'admin-edit-student/:id', component: AdminEditStudentComponent },
  { path: 'admin-edit-teacher/:id', component: AdminEditTeacherComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
