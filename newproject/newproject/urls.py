"""
URL configuration for newproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from newapp import views
from newapp.views import *
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('studentregister/', Studentregister.as_view(), name='studentregister'),
    path('teacherregister/', TeacherRegister.as_view(), name='teacherregister'),
    path('login/',views.LoginView.as_view(),name='logins'),
    path('student-home/<int:id>/', StudentHomeView.as_view(), name='student-home'),
    path('teacher-home/<int:id>/',TeacherHomeView.as_view(),name='teacher-home'),
    path('create-course/', CreateCourseView.as_view(), name='create-course'),
    path('my-courses/', ShowMyCoursesView.as_view(), name='show-my-courses'),
    path('course/<int:pk>/', CourseDetailUpdateView.as_view(), name='course-detail-update'),
    path('delete-course/<int:pk>/', CourseDeleteView.as_view(), name='delete-course'),
    path('create-lesson/', LessonCreateAPIView.as_view(), name='create-lesson'),
    path('lessons-by-course/<int:course_id>/', LessonsByCourseAPIView.as_view(), name='lessons-by-course'),
    path('delete-lesson/<int:id>/', DeleteLessonView.as_view(), name='delete-lesson'),
    path('update-lesson/<int:pk>/', LessonUpdateAPIView.as_view(), name='update-lesson'),
    path('lesson-detail/<int:pk>/', LessonDetailAPIView.as_view(), name='lesson-detail'),
    path('update-student/<int:id>/', StudentProfileUpdateView.as_view(), name='update-student'),
    path('all-courses/', ListAllCoursesView.as_view(), name='all-courses'),
    path('enroll/', EnrollView.as_view(), name='enroll'),
    path('enrolled-courses/<int:student_id>/', EnrolledCoursesView.as_view(), name='enrolled-courses'),
    path('course-lessons/<int:course_id>/', CourseLessonsView.as_view(), name='course-lessons'),
    path('lesson-complete/', MarkLessonCompletedView.as_view(), name='mark-lesson-completed'),
    path('progress/<int:student_id>/<int:course_id>/', CourseProgressView.as_view(), name='course-progress'),
    path('enrolled-students/<int:course_id>/', TeacherEnrolledStudentsView.as_view(), name='teacher-enrolled-students'),
    path('view-teachers/', AdminViewTeachers.as_view(), name='view-teachers'),
    path('view-students/', AdminViewStudents.as_view(), name='view-students'),
    path('view-courses/', AdminViewCourses.as_view(), name='view-courses'),
    path('delete-students/<int:student_id>/', AdminDeleteStudentView.as_view(), name='delete-student'),
    path('delete-teachers/<int:teacher_id>/', AdminDeleteTeacherView.as_view(), name='delete-teacher'),
    path('edit-teacher/<int:id>/', TeacherProfileUpdateView.as_view(), name='edit-teacher'),
    path('edit-student/<int:id>/', AdminEditStudentView.as_view(),name='edit-student'),
    path('approve-user/<int:user_id>/', ApproveUserView.as_view(), name='approve-user'),
    







    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)