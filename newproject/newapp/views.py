from django.shortcuts import render
from .models import User, Teacher, Student, Course, Lesson, Enrollment,LessonCompletion
from .serializers import Userserializer,Teacherserializer,Studentserializer,Courseserializer,Lessonserializer,Enrollmentserializer,LessonCompletionSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound
from rest_framework import generics
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser




# Create your views here.


class Studentregister(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = Userserializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'registered'
            data['username'] = account.username
            data['email'] = account.email
            token, create = Token.objects.get_or_create(user=account)
            data['token'] = token.key
        else:
            data = serializer.errors
        return Response(data)

    
class TeacherRegister(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = Userserializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            account.save()
            data['response'] = 'registered'
            data['username'] = account.username
            data['email'] = account.email
            token, create = Token.objects.get_or_create(user=account)
            data['token'] = token.key
            return Response(data)
        else:
            data = serializer.errors
            data['response'] = 'error'
        return Response(data)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Create or fetch token
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'usertype': user.user_type,
                'username': user.first_name,
                'is_superuser': user.is_superuser,
                'is_staff': user.is_staff
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)

        

class StudentHomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            student = Student.objects.get(student_id=id)
            serializer = Studentserializer(student)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)
        
User = get_user_model()

class StudentProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        try:
            student = Student.objects.get(student_id=id)
            user = student.student_id  # related User object

            # Update User fields
            user.first_name = request.data.get('first_name', user.first_name)
            user.last_name = request.data.get('last_name', user.last_name)
            user.email = request.data.get('email', user.email)
            user.username = request.data.get('username', user.username)
            user.save()

            # Update Student fields
            student.address = request.data.get('address', student.address)
            student.phone_number = request.data.get('phone_number', student.phone_number)
            student.guardian = request.data.get('guardian', student.guardian)
            student.save()

            return Response({'message': 'Student profile updated successfully.'}, status=status.HTTP_200_OK)
        
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)


class TeacherHomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            teacher = Teacher.objects.get(teacher_id=id)
            serializer = Teacherserializer(teacher)
            return Response(serializer.data)
        except teacher.DoesNotExist:
            return Response({"error": "teacher not found"}, status=404)
        
class CreateCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            teacher = Teacher.objects.get(teacher_id=request.user.id)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher profile not found.'}, status=404)

        data = request.data.copy()
        data['teacher'] = teacher.id  # Assign teacher ID to the course
        serializer = Courseserializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

class ShowMyCoursesView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    serializer_class = Courseserializer  # Use the CourseSerializer to return the data

    def get_queryset(self):
        # Fetch courses for the logged-in teacher
        teacher = self.request.user.teacher_set.first() # Get the teacher associated with the logged-in user
        return Course.objects.filter(teacher=teacher)  # Return only courses belonging to the teacher
        

class CourseDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = Courseserializer

class CourseDeleteView(APIView):
    def delete(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        course.delete()
        return Response({"message": "Course deleted successfully"}, status=status.HTTP_204_NO_CONTENT)





class LessonCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        try:
            teacher = Teacher.objects.get(teacher_id=request.user.id)
        except Teacher.DoesNotExist:
            return Response({'error': 'Only teachers can create lessons.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = Lessonserializer(data=request.data)
        if serializer.is_valid():
            lesson = serializer.save(teacher=teacher)

            # ✅ Update total_lessons for enrollments of this course
            enrollments = Enrollment.objects.filter(course=lesson.course)
            total_lessons = Lesson.objects.filter(course=lesson.course).count()
            for enrollment in enrollments:
                enrollment.total_lessons = total_lessons
                enrollment.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)



class LessonsByCourseAPIView(APIView):
    def get(self, request, course_id):
        lessons = Lesson.objects.filter(course_id=course_id)  # Assuming course_id is a ForeignKey in Lesson model
        if lessons.exists():
            serializer = Lessonserializer(lessons, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No lessons found for this course."}, status=status.HTTP_404_NOT_FOUND)




class DeleteLessonView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        try:
            lesson = Lesson.objects.get(pk=id)
        except Lesson.DoesNotExist:
            return Response({"error": "Lesson not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            teacher = Teacher.objects.get(teacher_id=request.user)
        except Teacher.DoesNotExist:
            return Response({"error": "You are not authorized to delete this lesson."}, status=status.HTTP_403_FORBIDDEN)

        if lesson.teacher != teacher:
            return Response({"error": "You can only delete lessons you created."}, status=status.HTTP_403_FORBIDDEN)

        # ✅ Get course before deleting the lesson
        course = lesson.course

        # ✅ Delete lesson
        lesson.delete()

        # ✅ Recalculate and update total lessons
        new_total = Lesson.objects.filter(course=course).count()
        enrollments = Enrollment.objects.filter(course=course)
        
        for enrollment in enrollments:
            enrollment.total_lessons = new_total
            # ✅ Ensure lessons_completed is not greater than new total
            if enrollment.lessons_completed > new_total:
                enrollment.lessons_completed = new_total
            enrollment.save()

        # ✅ Debug prints
        print(f"Lesson deleted from course: {course.id}")
        print(f"New lesson count: {new_total}")
        print(f"Enrollments updated: {enrollments.count()}")

        return Response({"message": "Lesson deleted and enrollment records updated."}, status=status.HTTP_204_NO_CONTENT)



class LessonUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        try:
            lesson = Lesson.objects.get(pk=pk)
        except Lesson.DoesNotExist:
            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = Lessonserializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonDetailAPIView(RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = Lessonserializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

class ListAllCoursesView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]  # Or AllowAny if public
    queryset = Course.objects.all()
    serializer_class = Courseserializer



class EnrollView(APIView):
    def post(self, request):
        student_id = request.data.get("student")
        course_id = request.data.get("course")

        if not student_id or not course_id:
            return Response({"error": "Missing student or course ID."}, status=status.HTTP_400_BAD_REQUEST)

        # Optional: check if student exists
        try:
            student = Student.objects.get(id=student_id)
            course = Course.objects.get(id=course_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            return Response({"error": "Course not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create enrollment
        enrollment = Enrollment.objects.create(student=student, course=course)
        return Response({"message": "Enrollment successful."}, status=status.HTTP_201_CREATED)


class EnrolledCoursesView(APIView):
    def get(self, request, student_id):
        enrollments = Enrollment.objects.filter(student_id=student_id)
        courses = [enrollment.course for enrollment in enrollments]
        serializer = Courseserializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CourseLessonsView(generics.ListAPIView):
    serializer_class = Lessonserializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        # This will raise 404 if the course doesn't exist
        course = get_object_or_404(Course, id=course_id)
        return Lesson.objects.filter(course=course) 
    
class MarkLessonCompletedView(APIView):
    def post(self, request):
        student_id = request.data.get("student")
        lesson_id = request.data.get("lesson")

        # Validate student and lesson
        student = get_object_or_404(Student, id=student_id)
        lesson = get_object_or_404(Lesson, id=lesson_id)

        # Check if already marked
        if LessonCompletion.objects.filter(student=student, lesson=lesson).exists():
            return Response({"detail": "Lesson already marked as completed."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the completion entry
        completion = LessonCompletion.objects.create(student=student, lesson=lesson)

        # Update the lessons_completed field in Enrollment
        try:
            enrollment = Enrollment.objects.get(student=student, course=lesson.course)
            enrollment.lessons_completed += 1
            enrollment.save()
        except Enrollment.DoesNotExist:
            return Response({"error": "Enrollment not found."}, status=status.HTTP_404_NOT_FOUND)

        # Return the updated lesson completion status
        serializer = LessonCompletionSerializer(completion)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CourseProgressView(APIView):
    def get(self, request, student_id, course_id):
        print("== DEBUG: CourseProgressView ==")
        print(f"Received student_id: {student_id}, course_id: {course_id}")
        
        enrollment = Enrollment.objects.filter(student_id=student_id, course_id=course_id).first()
        if not enrollment:
            print("Enrollment not found!")
            return Response({'error': 'Enrollment not found'}, status=status.HTTP_404_NOT_FOUND)

        progress = enrollment.get_progress()
        print(f"Progress calculated: {progress}")
        return Response({'progress': progress}, status=status.HTTP_200_OK)


class TeacherEnrolledStudentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        enrollments = Enrollment.objects.filter(course_id=course_id)
        students = [enrollment.student for enrollment in enrollments]
        serializer = Studentserializer(students, many=True)
        return Response(serializer.data)

class AdminViewTeachers(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        teachers = Teacher.objects.all()
        serializer = Teacherserializer(teachers, many=True)
        return Response(serializer.data)

class AdminViewStudents(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = Student.objects.all()
        serializer = Studentserializer(student, many=True)
        return Response(serializer.data)
    
class AdminViewCourses(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        courses = Course.objects.all()
        serializer = Courseserializer(courses, many=True)
        return Response(serializer.data)
    


class AdminDeleteStudentView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, student_id):
        try:
            student = Student.objects.get(id=student_id)
            user = student.student_id  # linked User object
            student.delete()
            user.delete()
            return Response({'message': 'Student and associated user deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)


class AdminDeleteTeacherView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, teacher_id):
        try:
            teacher = Teacher.objects.get(id=teacher_id)
            user = teacher.teacher_id  # linked User object
            teacher.delete()
            user.delete()
            return Response({'message': 'Teacher and associated user deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found.'}, status=status.HTTP_404_NOT_FOUND)

class TeacherProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    
    def get(self, request, id):
        try:
            teacher = Teacher.objects.get(id=id)
            user = teacher.teacher_id

            data = {
                'id': teacher.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'address': teacher.address,
                'phone_number': teacher.phone_number,
                'salary': teacher.salary,
                'department': teacher.department,
                'experience': teacher.experience,
            }

            return Response(data, status=status.HTTP_200_OK)

        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            teacher = Teacher.objects.get(id=id)
            user = teacher.teacher_id

            user.first_name = request.data.get('first_name', user.first_name)
            user.last_name = request.data.get('last_name', user.last_name)
            user.email = request.data.get('email', user.email)
            user.username = request.data.get('username', user.username)
            user.save()

            teacher.address = request.data.get('address', teacher.address)
            teacher.phone_number = request.data.get('phone_number', teacher.phone_number)
            teacher.salary = request.data.get('salary', teacher.salary)
            teacher.department = request.data.get('department', teacher.department)
            teacher.experience = request.data.get('experience', teacher.experience)
            teacher.save()

            return Response({'message': 'Teacher profile updated successfully.'}, status=status.HTTP_200_OK)

        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)


class AdminEditStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            student = Student.objects.get(id=id)
            user = student.student_id  

            data = {
                'id': student.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'address': student.address,
                'phone_number': student.phone_number,
                'guardian': student.guardian,
            }

            return Response(data, status=status.HTTP_200_OK)

        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            student = Student.objects.get(id=id)
            user = student.student_id  # related User object

            # Update User fields
            user.first_name = request.data.get('first_name', user.first_name)
            user.last_name = request.data.get('last_name', user.last_name)
            user.email = request.data.get('email', user.email)
            user.username = request.data.get('username', user.username)
            user.save()

            # Update Student fields
            student.address = request.data.get('address', student.address)
            student.phone_number = request.data.get('phone_number', student.phone_number)
            student.guardian = request.data.get('guardian', student.guardian)
            student.save()

            return Response({'message': 'Student profile updated successfully.'}, status=status.HTTP_200_OK)

        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)


class ApproveUserView(APIView):
    def put(self, request, user_id):
        user = get_object_or_404(User, id=user_id)

        approve = request.data.get('approve', True)
        user.is_staff = approve
        user.save()

        return Response({
            'message': f'User {"approved" if approve else "disapproved"} successfully.',
            'user_id': user.id,
            'is_staff': user.is_staff
        }, status=status.HTTP_200_OK)