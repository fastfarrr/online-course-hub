import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-course-navbar',
  templateUrl: './course-navbar.component.html',
  styleUrls: ['./course-navbar.component.css']
})
export class CourseNavbarComponent implements OnInit {
    selectedCourseId: number | null = null;

  ngOnInit(): void {
    this.selectedCourseId = this.courseService.getSelectedCourseId();
  }
      private tokenkey = 'authToken';
      public id = 0;
      private loggedin = false;
      public username: string = '';
      public user_type: string = '';
      private studentId: number = 0;
    
      logout() {
      this.loggedin = false;
      this.id = 0;
      this.username = '';
      this.user_type = '';
      
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      localStorage.removeItem("is_superuser");
      localStorage.removeItem("is_staff");
    
      this.router.navigate(['/login']);  // Optionally redirect to login
    
    }
    
     constructor(private courseService: UserService,private router: Router){}

}
