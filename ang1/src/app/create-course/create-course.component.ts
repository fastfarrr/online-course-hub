import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  courseData = {
    title: '',
    description: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createCourse(this.courseData);
  }

}
