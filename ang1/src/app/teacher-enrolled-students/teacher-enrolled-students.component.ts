import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-teacher-enrolled-students',
  templateUrl: './teacher-enrolled-students.component.html'
})
export class TeacherEnrolledStudentsComponent implements OnInit {
  enrolledStudents: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.userService.getEnrolledStudents(courseId).subscribe(
      (students) => (this.enrolledStudents = students),
      (error) => console.error(error)
    );
  }
}
