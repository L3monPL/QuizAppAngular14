import { Component, OnInit } from '@angular/core';
import { QuizMapServiceService } from 'src/app/services/quiz-map-service.service';

@Component({
  selector: 'app-information-about-quiz-map',
  templateUrl: './information-about-quiz-map.component.html',
  styleUrls: ['./information-about-quiz-map.component.scss']
})
export class InformationAboutQuizMapComponent implements OnInit {

  lessonsPanel = false
  lastId?: number


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

    if (this.lastId == id) {
      this.lessonsPanel =! this.lessonsPanel
      console.log(this.lastId, id)
    }
    if(this.lastId !== id){ //JAK KLIKAMY NA INNA MAPE TO RESET lastId = null (w servisie)
      this.lessonsPanel = true
    }
    console.log('wykonuje gdy kilkamy na inny div' + this.lastId, id)
    this.lastId = id

    // if (this.lessonsPanel == false) {
    //   this.lessonsPanel = true
    // }
    // else if (this.lessonsPanel == true) {
    //   this.lessonsPanel = false
    // }
    // this.lessonsPanel = true
  }

}
