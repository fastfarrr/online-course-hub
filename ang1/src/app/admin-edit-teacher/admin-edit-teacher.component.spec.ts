import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTeacherComponent } from './admin-edit-teacher.component';

describe('AdminEditTeacherComponent', () => {
  let component: AdminEditTeacherComponent;
  let fixture: ComponentFixture<AdminEditTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditTeacherComponent]
    });
    fixture = TestBed.createComponent(AdminEditTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
