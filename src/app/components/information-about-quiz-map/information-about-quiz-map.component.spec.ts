import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAboutQuizMapComponent } from './information-about-quiz-map.component';

describe('InformationAboutQuizMapComponent', () => {
  let component: InformationAboutQuizMapComponent;
  let fixture: ComponentFixture<InformationAboutQuizMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationAboutQuizMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationAboutQuizMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
