import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  constructor(private userservice:UserService){}
  user:any;
  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    if (id) {
      this.userservice.getteacherdata(+id).subscribe(
        (data) => {
          this.user = data;
          console.log('Student data:', data);
        },
        (error) => {
          console.error('Error fetching student data', error);
        }
      );
    }
    
  }

}
