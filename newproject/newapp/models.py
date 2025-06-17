from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_type=models.CharField(max_length=10)

class Student(models.Model):
    student_id=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.CharField(max_length=255)
    phone_number=models.CharField(max_length=15) 
    guardian=models.CharField(max_length=30)

class Teacher(models.Model):
    teacher_id=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.CharField(max_length=255)
    phone_number=models.CharField(max_length=255)
    salary=models.IntegerField()
    department = models.CharField(max_length=255)
    experience=models.IntegerField()



class Course(models.Model):
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# Lesson Model
class Lesson(models.Model):
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    lesson_number = models.PositiveIntegerField(default=1)
    title = models.CharField(max_length=255)
    content = models.TextField()
    video_url = models.URLField(blank=True, null=True)
    pdf_file = models.FileField(upload_to='lesson_pdfs/', null=True, blank=True)

    class Meta:
        unique_together = ('course', 'lesson_number')
        ordering = ['lesson_number']
    


# Enrollment Model to manage student-course relationships
class Enrollment(models.Model):
    student = models.ForeignKey(Student,on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    lessons_completed = models.IntegerField(default=0)  # Track number of completed lessons
    total_lessons = models.IntegerField(default=0) 

    class Meta:
        unique_together = ('student', 'course')  # prevent duplicate enrollments

    def __str__(self):
        return f"{self.student} enrolled in {self.course}"

    def save(self, *args, **kwargs):
        if self.course_id:
            try:
                self.total_lessons = self.course.lessons.count()
            except AttributeError:
                self.total_lessons = self.course.lesson_set.count()
        super().save(*args, **kwargs)

    def get_progress(self):
        if self.total_lessons > 0:
            return (self.lessons_completed / self.total_lessons) * 100
        return 0  # If no lessons, progress is 0



class LessonCompletion(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'lesson')  # prevent duplicate completions

    def __str__(self):
        return f"{self.student} completed {self.lesson}"