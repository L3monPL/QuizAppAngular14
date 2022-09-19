import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMapListComponent } from './quiz-map-list.component';

describe('QuizMapListComponent', () => {
  let component: QuizMapListComponent;
  let fixture: ComponentFixture<QuizMapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMapListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
