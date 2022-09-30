import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsForQuizComponent } from './lessons-for-quiz.component';

describe('LessonsForQuizComponent', () => {
  let component: LessonsForQuizComponent;
  let fixture: ComponentFixture<LessonsForQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsForQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsForQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
