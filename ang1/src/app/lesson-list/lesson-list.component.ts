// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { UserService } from '../user.service';

// // @Component({
// //   selector: 'app-lesson-list',
// //   templateUrl: './lesson-list.component.html',
// //   styleUrls: ['./lesson-list.component.css']
// // })
// // export class LessonListComponent implements OnInit {

// //   courseId!: number;
// //   lessons: any[] = [];

// //   constructor(private route: ActivatedRoute, private userService: UserService) {}

// //   ngOnInit(): void {
// //     this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
// //     this.loadLessons();
// //   }

// //   loadLessons(): void {
// //     this.userService.getLessonsByCourseId(this.courseId).subscribe({
// //       next: (lessons) => {
// //         console.log('Lessons:', lessons);
// //         this.lessons = lessons;
// //       },
// //       error: (err) => {
// //         console.error('Error loading lessons', err);
// //       }
// //     });
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-lesson-list',
//   templateUrl: './lesson-list.component.html',
//   styleUrls: ['./lesson-list.component.css']
// })
// export class LessonListComponent implements OnInit {

//   courseId!: number;
//   lessons: any[] = [];
//   isLoading: boolean = false; // Flag for loading state
//   errorMessage: string = '';  // Error message for handling API errors

//   constructor(private route: ActivatedRoute, private userService: UserService) {}

//   ngOnInit(): void {
//     this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
//     this.loadLessons();
//   }

//   loadLessons(): void {
//     this.isLoading = true; // Start loading
//     this.userService.getLessonsByCourseId(this.courseId).subscribe({
//       next: (lessons) => {
//         this.isLoading = false; // Stop loading
//         this.lessons = lessons;
//       },
//       error: (err) => {
//         this.isLoading = false; // Stop loading
//         this.errorMessage = 'Error loading lessons: ' + err.message; // Handle error
//         console.error('Error loading lessons', err);
//       }
//     });
//   }

//   markAsCompleted(lessonId: number): void {
//     const studentId = this.userService.getStudentData()?.id;
//     const payload = {
//       student: studentId,
//       lesson: lessonId
//     };
  
//     this.userService.markLessonAsCompleted(payload).subscribe({
//       next: () => {
//         const lesson = this.lessons.find(l => l.id === lessonId);
//         if (lesson) {
//           lesson.completed = true; // ✅ update the status locally
//         }
//       },
//       error: (err) => {
//         console.error('Error marking lesson as completed:', err);
//         alert('Something went wrong.');
//       }
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  courseId!: number;
  lessons: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  studentId!: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const student = this.userService.getStudentData();
    if (student) {
      this.studentId = student.id;
      this.loadLessons();
    } else {
      this.errorMessage = 'Student data not found.';
    }
  }

  loadLessons(): void {
    this.isLoading = true;
    this.userService.getLessonsByCourseId(this.courseId).subscribe({
      next: (lessons) => {
        this.isLoading = false;
        this.lessons = lessons.map(lesson => ({
          ...lesson,
          completed: false  // Optional: Set based on real completion data if available
        }));
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Error loading lessons: ' + err.message;
        console.error('Error loading lessons', err);
      }
    });
  }

  markAsCompleted(lessonId: number): void {
    const payload = {
      student: this.studentId,
      lesson: lessonId
    };

    this.userService.markLessonAsCompleted(payload).subscribe({
      next: () => {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.completed = true;
          alert("marked as completed")
        }
      },
      error: (err) => {
        console.error('Error marking lesson as completed:', err);
        alert('already marked it as completed');
      }
    });
  }
}
