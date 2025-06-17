from rest_framework import serializers
from .models import User,Teacher,Student,Course,Lesson,Enrollment,LessonCompletion



class Userserializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True, required=False)
    phone_number = serializers.CharField(write_only=True, required=False)
    guardian = serializers.CharField(write_only=True, required=False)
    salary = serializers.IntegerField(write_only=True, required=False)
    department = serializers.CharField(write_only=True, required=False)
    experience = serializers.IntegerField(write_only=True, required=False)
    class Meta:
        model = User
        fields = '__all__'
        

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            user_type=self.validated_data['user_type'],
        )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        if user.user_type == 'student':
            #  Take the extra student fields properly
            address = self.validated_data.get('address', '')
            phone_number = self.validated_data.get('phone_number', '')
            guardian = self.validated_data.get('guardian', '')

            Student.objects.create(
                student_id=user,
                address=address,
                phone_number=phone_number,
                guardian=guardian
            )
        elif user.user_type== "teacher":
            address = self.validated_data.get('address', '')
            phone_number = self.validated_data.get('phone_number', '')
            salary = self.validated_data.get('salary', 0)  # You can assign default value
            department = self.validated_data.get('department', '')
            experience = self.validated_data.get('experience', 0)
            Teacher.objects.create(
                teacher_id=user,
                address=address,
                phone_number=phone_number,
                salary=salary,
                department=department,
                experience=experience)
        return user

class Studentserializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='student_id.id', read_only=True)
    first_name = serializers.CharField(source='student_id.first_name')
    email = serializers.EmailField(source='student_id.email')
    username = serializers.CharField(source='student_id.username', read_only=True)
    last_name = serializers.CharField(source='student_id.last_name', read_only=True)
    is_staff = serializers.BooleanField(source='student_id.is_staff', read_only=True)
    

    class Meta:
        model = Student
        fields = ['id', 'student_id','user_id', 'first_name', 'email', 'address', 'phone_number', 'guardian','last_name','username',"is_staff"]
        

class Teacherserializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='teacher_id.id', read_only=True)
    first_name = serializers.CharField(source='teacher_id.first_name')
    email = serializers.EmailField(source='teacher_id.email')
    is_staff = serializers.BooleanField(source='teacher_id.is_staff', read_only=True)
    class Meta:
        model = Teacher
        fields = ['id','user_id','teacher_id', 'first_name', 'email', 'address','phone_number','salary','department','experience',"is_staff"]

# serializers.py

# class Courseserializer(serializers.ModelSerializer):
#     teacher_name = serializers.CharField(source='teacher.user.first_name', read_only=True)

#     class Meta:
#         model = Course
#         fields = ['id', 'title', 'description', 'teacher', 'teacher_name']

class Courseserializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'teacher', 'teacher_name','created_at']

    def get_teacher_name(self, obj):
        return obj.teacher.teacher_id.first_name 


class Lessonserializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')

        # Build full URL for pdf_file
        if instance.pdf_file and request:
            representation['pdf_file'] = request.build_absolute_uri(instance.pdf_file.url)
        return representation

    def validate_video_url(self, value):
        if value and not value.startswith('http'):
            raise serializers.ValidationError("Invalid video URL.")
        return value


class Enrollmentserializer(serializers.ModelSerializer):
    class Meta:
        model=Enrollment
        fields="__all__"

class LessonCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model=LessonCompletion
        fields="__all__"
        read_only_fields = ['completed_at']







