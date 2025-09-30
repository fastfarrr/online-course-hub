import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-edit-student',
  templateUrl: './admin-edit-student.component.html',
  styleUrls: ['./admin-edit-student.component.css']
})
export class AdminEditStudentComponent implements OnInit {
  studentId!: number;
  student: any = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    address: '',
    phone_number: '',
    guardian: ''
  };

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getStudentById(this.studentId).subscribe(
      (data: any) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );
  }

  updateStudent(): void {
    this.userService.updateStudentByAdmin(this.studentId, this.student).subscribe(
      (res) => {
        alert('Student updated successfully!');
        this.router.navigate(['/admin-home']);
      },
      (error) => {
        console.error('Error updating student', error);
      }
    );
  }
}
