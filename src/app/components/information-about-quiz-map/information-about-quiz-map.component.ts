import { Component, OnInit } from '@angular/core';
import { QuizMapServiceService } from 'src/app/services/quiz-map-service.service';

@Component({
  selector: 'app-information-about-quiz-map',
  templateUrl: './information-about-quiz-map.component.html',
  styleUrls: ['./information-about-quiz-map.component.scss']
})
export class InformationAboutQuizMapComponent implements OnInit {

  lessonsPanel = false
  // lastId?: number


  constructor(
    public quizMapService: QuizMapServiceService
  ) { }

  ngOnInit(): void {
    // this.quizMapService.showLessonsFromQuizMap = 0
    this.lessonsPanel =! this.lessonsPanel
  }

  showLessonPanel(id:number){
    this.quizMapService.showLessonsFromQuizMap = id
    console.log(this.quizMapService.showLessonsFromQuizMap)

    this.lessonsPanel =! this.lessonsPanel
    this.lessonsPanel =! this.lessonsPanel

    if (this.quizMapService.lastId == id) {
      this.lessonsPanel =! this.lessonsPanel
      console.log(this.quizMapService.lastId, id)
    }
    if(this.quizMapService.lastId !== id){ 
      this.lessonsPanel = true
    }
    console.log(this.quizMapService.lastId, id)
    this.quizMapService.lastId = id
  }

}
