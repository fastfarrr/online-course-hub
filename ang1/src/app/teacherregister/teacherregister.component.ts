import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-teacherregister',
  templateUrl: './teacherregister.component.html',
  styleUrls: ['./teacherregister.component.css']
})
export class TeacherregisterComponent {
  constructor(private userservice: UserService, private router: Router) {}

  registerTeacher(data: any) {
    console.log(data);
    data.user_type = 'teacher';  // Force user_type as 'teacher'
    
    this.userservice.teacherregister(data).subscribe(
      (res: any) => {
        console.log(res)
        if (res && res['response'] === 'registered') {
          alert('Teacher registered successfully!');
          this.router.navigate(['/login']); // Or wherever you want
        } else {
          alert('Teacher already exists!');
        }
      },
      (error) => {
        console.error('Error during registration:',error);
        alert('Error while registering teacher');
      }
    );
  }
  }


