import { Component, OnInit } from '@angular/core';
import { QuizMapServiceService } from 'src/app/services/quiz-map-service.service';

@Component({
  selector: 'app-information-about-quiz-map',
  templateUrl: './information-about-quiz-map.component.html',
  styleUrls: ['./information-about-quiz-map.component.scss']
})
export class InformationAboutQuizMapComponent implements OnInit {

  lessonsPanel = false

  constructor(
    public quizMapService: QuizMapServiceService
  ) { }

  ngOnInit(): void {
  }

  showLessonPanel(){
    if (this.lessonsPanel == false) {
      this.lessonsPanel = true
    }
    else if (this.lessonsPanel == true) {
      this.lessonsPanel = false
    }
    // this.lessonsPanel = true
  }

}
