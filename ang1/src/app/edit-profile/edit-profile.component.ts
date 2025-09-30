import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    address: '',
    phone_number: '',
    guardian: ''
  };
  userId!: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    
    this.userService.getstudentdata(this.userId).subscribe(
      (data:any) => {
        console.log('Raw data received from backend:', data);  // <-- Add this
    
        // Now assign values
        this.user.first_name = data.first_name || '';
        this.user.last_name = data.last_name || '';
        this.user.username = data.username || '';
        this.user.email = data.email || '';
        this.user.address = data.address || '';
        this.user.phone_number = data.phone_number || '';
        this.user.guardian = data.guardian || '';
      },
      (error) => {
        console.error('Error fetching student data for edit', error);
      }
    );
  }

  onSubmit(): void {
    this.userService.updateStudent(this.userId, this.user).subscribe(
      (response) => {
        console.log('Student data updated successfully', response);
        alert("Student data updated successfully")

        this.router.navigate(['/student-home']);
      },
      (error) => {
        console.error('Error updating student data', error);
      }
    );
  }
}
