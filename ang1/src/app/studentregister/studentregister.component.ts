import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './studentregister.component.html'
})
export class StudentRegisterComponent {
  constructor(private userservice: UserService, private router: Router) {}

  Studentregister(data:any) {
    console.log(data);
    data.user_type = 'student';  // Force user_type as 'student'
    this.userservice.Studentregister(data).subscribe(
      (res:any) => {
        console.log(res)
        if (res["response"]=="registered") {
          alert('Student registered successfully!')
          this.router.navigate(['/login'])
        } 
        else {
          alert('Student already exists!')
        }
      },
      (error) => {
        console.error(error);
        alert('Error while registering student');
      }
    );
  }


}
