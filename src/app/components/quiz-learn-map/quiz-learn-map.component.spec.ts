import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLearnMapComponent } from './quiz-learn-map.component';

describe('QuizLearnMapComponent', () => {
  let component: QuizLearnMapComponent;
  let fixture: ComponentFixture<QuizLearnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizLearnMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizLearnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
