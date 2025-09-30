// import { Component, OnInit } from '@angular/core';
// import { UserService } from './user.service';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'ang1';
//   showMainNavbar: boolean = true;

//   constructor(private userservice: UserService, private router: Router) {}
//   user:any;

//   ngOnInit() {
//     this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe((event: any) => {
//         // Hide the main navbar on student/teacher/admin home pages
//         const hiddenRoutes = ['/student-home', '/teacher-home', '/admin-home','/enrolled-courses','/enroll-subject','/edit-profile/','/show-my-courses','/create-course','/create-lesson/','/course-edit/','/course-lessons/','/edit-lesson/','/admin-edit-teacher/','/admin-edit-student/',];
// this.showMainNavbar = !hiddenRoutes.some(route => event.url.startsWith(route));      });
//   }



//   logout() {
//     this.userservice.logout();
//     this.router.navigate(['/login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang1';
  showMainNavbar: boolean = true;
  currentRoute: string = '';

  constructor(private userservice: UserService, private router: Router) {}
  user: any;

ngOnInit() {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      this.currentRoute = navEndEvent.url;

      const hiddenRoutes = [
        '/student-home',
        '/teacher-home',
        '/admin-home',
        '/enrolled-courses',
        '/enroll-subject',
        '/edit-profile',
        '/show-my-courses',
        '/create-course',
        '/create-lesson',
        '/course-edit',
        '/course-lessons',
        '/edit-lesson',
        '/admin-edit-teacher',
        '/admin-edit-student',
        '/enrolled-students',
        // '/login',
        '/lessons/'
      ];

      this.showMainNavbar = !hiddenRoutes.some(route =>
        navEndEvent.url.startsWith(route)
      );
    });
}

  logout() {
    this.userservice.logout();
    this.router.navigate(['/login']);
  }
}
