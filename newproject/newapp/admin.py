from django.contrib import admin

from .models import Student,Teacher,Lesson

admin.site.register(Student)

admin.site.register(Teacher)

admin.site.register(Lesson)

from .models import LessonCompletion

@admin.register(LessonCompletion)
class LessonCompletionAdmin(admin.ModelAdmin):
    list_display = ('student', 'lesson', 'completed_at')  



# Register your models here.
