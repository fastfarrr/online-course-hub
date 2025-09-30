import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit{

  
  constructor(private userService: UserService,private router: Router) {} // inject UserService
  user:any;
  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    if (id) {
      this.userService.getstudentdata(+id).subscribe(
        (data:any) => {
          this.user = data;
          console.log('Student data:', data);
          this.userService.setStudentData(data);
        },
        (error) => {
          console.error('Error fetching student data', error);
        }
      );
    }
  }

  goToEditProfile(): void {
    this.router.navigate(['/edit-profile', this.user.student_id]);  // Assuming 'student_id' is the ID for the student
  }

  
goToEnrollPage() {
  this.router.navigate(['/enroll-subject']);
}

goToEnrolledCourses() {
  this.router.navigate(['/enrolled-courses']);
}

  }



