import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMapsPageComponent } from './quiz-maps-page.component';

describe('QuizMapsPageComponent', () => {
  let component: QuizMapsPageComponent;
  let fixture: ComponentFixture<QuizMapsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMapsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMapsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
