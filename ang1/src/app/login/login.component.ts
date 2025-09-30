// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { UserService } from '../user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(
//     private http: HttpClient,
//     public userService: UserService,
//     private router: Router
//   ) {}

//   login(data: any) {
//     console.log(data);
  
//     this.http.post<LoginResponse>('http://127.0.0.1:8000/login/', data).subscribe(
//       (response) => {
//         console.log('Login successful', response);
//         const token = response.token;
//         const userId = response.user_id;
//         const username = response.username;
//         const user_type = response.usertype;
//         const is_superuser=response.is_superuser
  
//         if (token) {
//           this.userService.login(token, userId, user_type, username,is_superuser); // just call this
//           alert("Login Success!");
          
//         } else {
//           console.error('Token not received', response);
//         }
//       },
//       (error) => {
//         alert("Login failed! Try signing up if you don't have an account.");
//         console.error('Login failed', error);
//       }
//     );
//   }
// }

// export interface LoginResponse {
//   token: string;
//   user_id: number;
//   username:string;
//   usertype:string;
//   is_superuser: boolean;



// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    public userService: UserService,
    private router: Router
  ) {}

  login(data: any) {
    this.http.post<LoginResponse>('http://127.0.0.1:8000/login/', data).subscribe(
      (response) => {
        const token = response.token;
        const userId = response.user_id;
        const username = response.username;
        const user_type = response.usertype;
        const is_superuser = response.is_superuser;
        const is_staff = response.is_staff;

        // Block login if not superuser and not staff (i.e. not approved)
        if (!is_superuser && !is_staff) {
          alert("Your account is not approved by admin yet.");
          return;
        }

        if (token) {
          this.userService.login(token, userId, user_type, username, is_superuser, is_staff);
          alert("Login Success!");
        } else {
          console.error('Token not received', response);
        }
      },
      (error) => {
        alert("Login failed! Try signing up if you don't have an account.");
        console.error('Login failed', error);
      }
    );
  }
}

export interface LoginResponse {
  token: string;
  user_id: number;
  username: string;
  usertype: string;
  is_superuser: boolean;
  is_staff: boolean;
}
